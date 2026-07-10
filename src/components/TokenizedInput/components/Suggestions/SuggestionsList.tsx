import * as React from 'react';

import {List} from '@gravity-ui/uikit';

import {b} from '../../constants';
import i18n from '../../i18n';
import type {
    TokenValueBase,
    TokenizedInputSize,
    TokenizedSuggestions,
    TokenizedSuggestionsItem,
} from '../../types';

export type SuggestionsListProps = {
    selected: number;
    isLoading: boolean;
    suggestions: TokenizedSuggestions<TokenValueBase>;
    fullWidth?: boolean;
    size?: TokenizedInputSize;
    onApplySuggestion: (v: TokenizedSuggestionsItem<TokenValueBase>) => void;
};

export function SuggestionsList({
    selected,
    isLoading,
    suggestions,
    fullWidth,
    size = 'm',
    onApplySuggestion,
}: SuggestionsListProps) {
    const {items, options, currentWord} = suggestions;
    const showEmptyState = options?.showEmptyState !== false;
    const isEmpty = !isLoading && items.length === 0;
    const currentText = currentWord?.value ?? '';

    const EmptyPlaceholder = React.useMemo(() => {
        if (isLoading || !showEmptyState) {
            return null;
        }

        return (
            <p className={b('suggestions-list-item', {default: true})}>
                {i18n('suggestions.items_not_found', {text: currentText})}
            </p>
        );
    }, [currentText, isLoading, showEmptyState]);

    if (isEmpty && !showEmptyState) {
        return null;
    }

    return (
        <div
            className={b('suggestions-list-wrapper', {
                empty: isEmpty && showEmptyState,
                loading: isLoading,
                'full-width': fullWidth,
                size,
            })}
        >
            <List
                items={items}
                renderItem={(s) => <div className={b('suggestions-list-item')}>{s.label}</div>}
                activeItemIndex={selected}
                filterable={false}
                loading={isLoading}
                emptyPlaceholder={EmptyPlaceholder}
                onItemClick={onApplySuggestion}
                virtualized={false}
            />
        </div>
    );
}
