import * as React from 'react';

import type {TokenValueBase, TokenizedSuggestions, TokenizedSuggestionsItem} from '../../../types';
import {SuggestionsNavigationOptions} from '../types';

import {useSuggestionsNavigation} from './useSuggestionsNavigation';

type UseSelectSuggestionOptions<T extends TokenValueBase> = {
    suggestions: TokenizedSuggestions<T>;
    inputElement: HTMLInputElement | null;
    onApplySuggestion: (suggestion: TokenizedSuggestionsItem<T>) => void;
    onKeyDown?: (v: SuggestionsNavigationOptions<T>) => boolean;
};

const getPreselected = <T extends TokenValueBase>(items: TokenizedSuggestionsItem<T>[]) => {
    const idx = items.findIndex((v) => v.preselected);

    return Math.max(idx, 0);
};

export const useSelectSuggestion = <T extends TokenValueBase>({
    suggestions,
    inputElement,
    onApplySuggestion,
    onKeyDown,
}: UseSelectSuggestionOptions<T>) => {
    const {items, currentWord} = suggestions;

    const [selected, setSelected] = React.useState(getPreselected(items));

    React.useEffect(() => {
        setSelected(getPreselected(items));
    }, [items]);

    const handleSelectNext = React.useCallback(() => {
        setSelected((prev) => {
            if (prev === items.length - 1) {
                return 0;
            }
            return prev + 1;
        });
    }, [items]);

    const handleSelectPrev = React.useCallback(() => {
        setSelected((prev) => {
            if (prev === 0) {
                return items.length - 1;
            }
            return prev - 1;
        });
    }, [items]);

    useSuggestionsNavigation({
        inputElement,
        currentWord,
        onKeyDown,
        onSelectNext: handleSelectNext,
        onSelectPrev: handleSelectPrev,
        onApply: onApplySuggestion,
        suggestion: items[selected],
    });

    return {
        selected,
        handleSelectNext,
        handleSelectPrev,
    };
};
