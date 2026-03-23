import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useTokenizedInput} from '../../../context';
import type {TokenValueBase} from '../../../types';
import type {SuggestionsNavigationOptions} from '../types';

type UseSuggestionsNavigationOptions<T extends TokenValueBase> = Omit<
    SuggestionsNavigationOptions<T>,
    'event' | 'value' | 'focus'
> & {
    inputElement: HTMLInputElement | null;
    onKeyDown?: (v: SuggestionsNavigationOptions<T>) => boolean;
};

export const useSuggestionsNavigation = <T extends TokenValueBase>({
    inputElement,
    onKeyDown,
    onSelectNext,
    onSelectPrev,
    onApply,
    suggestion,
    currentWord,
}: UseSuggestionsNavigationOptions<T>) => {
    const {focusInfo} = useTokenizedInput<T>();
    const {focus} = focusInfo.state;

    React.useEffect(() => {
        const handleNavigation = (e: KeyboardEvent) => {
            const preventOtherKeys =
                onKeyDown?.({
                    event: e,
                    suggestion,
                    value: inputElement?.value || '',
                    focus,
                    onApply,
                    onSelectNext,
                    onSelectPrev,
                    currentWord,
                }) ?? false;

            if (preventOtherKeys) {
                return;
            }

            const next = (e.ctrlKey && e.code === 'KeyN') || e.key === KeyCode.ArrowDown;
            const prev = (e.ctrlKey && e.code === 'KeyP') || e.key === KeyCode.ArrowUp;
            const select = suggestion && !e.metaKey && !e.ctrlKey && e.key === KeyCode.Enter;

            switch (true) {
                case next: {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectNext();
                    break;
                }
                case prev: {
                    e.stopPropagation();
                    e.preventDefault();
                    onSelectPrev();
                    break;
                }
                case select: {
                    e.preventDefault();
                    e.stopPropagation();
                    onApply(suggestion);
                    break;
                }
                default: {
                    break;
                }
            }
        };

        inputElement?.addEventListener('keydown', handleNavigation);

        return () => {
            inputElement?.removeEventListener('keydown', handleNavigation);
        };
    }, [
        onSelectNext,
        onSelectPrev,
        onApply,
        suggestion,
        onKeyDown,
        currentWord,
        focus,
        inputElement,
    ]);
};
