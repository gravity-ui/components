import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useFocusContext} from '../../../context';
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
    const focusInfo = useFocusContext<T>();
    const {focus} = focusInfo.state;

    React.useEffect(() => {
        // We use a native DOM event listener here instead of React's synthetic onKeyDown
        // to ensure we intercept navigation keys (ArrowUp, ArrowDown, Enter) *before*
        // the main Wrapper's synthetic onKeyDown handler processes them.
        // This allows suggestions navigation to take precedence over token navigation
        // when the suggestions popup is open.
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
