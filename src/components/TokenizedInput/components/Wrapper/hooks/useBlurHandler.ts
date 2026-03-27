import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useFocusContext, useInputContext} from '../../../context';
import type {TokenValueBase} from '../../../types';

import type {ShortcutMap} from './useShortcuts';

type UseBlurHandlerOptions = {
    shortcuts: ShortcutMap;
    checkKey: (e: React.KeyboardEvent, key: string) => boolean;
    getCursorOffset: (input: HTMLInputElement) => number | undefined;
};

export const useBlurHandler = <T extends TokenValueBase>({
    shortcuts,
    checkKey,
    getCursorOffset,
}: UseBlurHandlerOptions) => {
    const focusInfo = useFocusContext<T>();
    const inputInfo = useInputContext<T>();

    const {focus} = focusInfo.state;
    const {getFocusRules, onFocus, onBlur} = focusInfo.callbacks;
    const {onApplyChanges} = inputInfo.callbacks;

    return React.useCallback(
        (e: React.KeyboardEvent) => {
            const handler = () => {
                const input = e.target as HTMLInputElement;
                input.blur();
                onBlur();
            };

            if (checkKey(e, KeyCode.Enter)) {
                e.preventDefault();
                onApplyChanges();

                if (shortcuts.isApplyModifier(e)) {
                    handler();

                    return true;
                } else {
                    if (!focus) {
                        return false;
                    }

                    const input = e.target as HTMLInputElement;
                    const focusRules = getFocusRules({
                        ...focus,
                        offset: getCursorOffset(input),
                    });

                    onFocus(focusRules.nextToken);

                    return true;
                }
            }
            if (checkKey(e, KeyCode.Escape)) {
                e.preventDefault();
                handler();

                return true;
            }

            return false;
        },
        [
            checkKey,
            focus,
            getCursorOffset,
            getFocusRules,
            onApplyChanges,
            onBlur,
            onFocus,
            shortcuts,
        ],
    );
};
