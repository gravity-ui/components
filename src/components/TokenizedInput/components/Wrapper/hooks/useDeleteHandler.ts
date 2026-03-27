import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useFocusContext, useInputContext} from '../../../context';
import type {TokenValueBase} from '../../../types';

import type {ShortcutMap} from './useShortcuts';

type UseDeleteHandlerOptions = {
    shortcuts: ShortcutMap;
    checkKey: (e: React.KeyboardEvent, key: string) => boolean;
};

export const useDeleteHandler = <T extends TokenValueBase>({
    shortcuts,
    checkKey,
}: UseDeleteHandlerOptions) => {
    const focusInfo = useFocusContext<T>();
    const inputInfo = useInputContext<T>();

    const {focus} = focusInfo.state;
    const {getFocusRules, onFocus} = focusInfo.callbacks;
    const {fields, tokens} = inputInfo.state;
    const {onRemoveToken, onChangeToken} = inputInfo.callbacks;

    return React.useCallback(
        (e: React.KeyboardEvent) => {
            const input = e.target as HTMLInputElement;

            if (!focus || !input) {
                return false;
            }

            if (checkKey(e, KeyCode.Backspace)) {
                if (shortcuts.isTokenModifier(e)) {
                    e.preventDefault();

                    let idx = focus.idx;

                    if (!tokens[idx]) {
                        idx--;
                    }

                    if (idx < 0 || tokens[idx].options?.notRemovable) {
                        return false;
                    }

                    e.preventDefault();
                    onRemoveToken(idx);
                    onFocus({
                        idx,
                        key: fields[0].key,
                    });

                    return true;
                }
                if (input.selectionStart === 0 && input.selectionEnd === 0) {
                    const {prevField} = getFocusRules({
                        ...focus,
                        offset: 0,
                    });

                    const {idx, key} = prevField;
                    const prevToken = tokens[idx];

                    if (
                        (focus.key === key && focus.idx === idx) ||
                        !prevToken ||
                        prevToken.options?.readOnlyFields?.includes(key)
                    ) {
                        return false;
                    }

                    e.preventDefault();
                    if (idx === focus.idx) {
                        onChangeToken(idx, {
                            [key]: tokens[idx].value[key].slice(0, -1),
                        } as Partial<T>);
                    }

                    onFocus({...prevField, offset: -1});

                    return true;
                }
            }

            return false;
        },
        [
            checkKey,
            fields,
            focus,
            getFocusRules,
            onChangeToken,
            onFocus,
            onRemoveToken,
            shortcuts,
            tokens,
        ],
    );
};
