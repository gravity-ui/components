import * as React from 'react';

import {useFocusContext, useInputContext, useOptionsContext} from '../../../context';
import type {TokenValueBase} from '../../../types';

import {useBlurHandler} from './useBlurHandler';
import {useDeleteHandler} from './useDeleteHandler';
import {useNavigationHandler} from './useNavigationHandler';
import {useShortcuts} from './useShortcuts';
import {useUndoRedoHandler} from './useUndoRedoHandler';

export const useKeyDownHandler = <T extends TokenValueBase>() => {
    const shortcuts = useShortcuts();
    const focusInfo = useFocusContext<T>();
    const inputInfo = useInputContext<T>();
    const options = useOptionsContext<T>();

    const {fields, tokens} = inputInfo.state;
    const {onChangeToken, onApplyChanges} = inputInfo.callbacks;
    const {focus} = focusInfo.state;
    const {onFocus} = focusInfo.callbacks;
    const {onKeyDown} = options;

    const getCursorOffset = React.useCallback((input: HTMLInputElement) => {
        if (!input.value || input.readOnly) {
            return undefined;
        }
        return input.selectionStart === input.value.length ? -1 : (input.selectionStart ?? 0);
    }, []);

    const reservedKeys = React.useMemo(() => {
        return fields.flatMap(
            ({key, specialKeysActions}) =>
                specialKeysActions?.map((action) => ({
                    ...action,
                    fieldKey: key,
                })) ?? [],
        );
    }, [fields]);

    const checkKey = React.useCallback(
        (e: React.KeyboardEvent, key: string) => {
            if (
                e.key === key &&
                !reservedKeys.some((reserved) => {
                    let isReservedKey = false;
                    if (typeof reserved.key === 'string') {
                        isReservedKey = reserved.key === e.key;
                    } else {
                        isReservedKey = reserved.key(e);
                    }

                    return isReservedKey && focus?.key === reserved.fieldKey;
                })
            ) {
                return true;
            }
            return false;
        },
        [focus, reservedKeys],
    );

    const navigationHandler = useNavigationHandler({
        shortcuts,
        checkKey,
        getCursorOffset,
    });

    const deleteHandler = useDeleteHandler({
        shortcuts,
        checkKey,
    });

    const blurHandler = useBlurHandler({
        shortcuts,
        checkKey,
        getCursorOffset,
    });

    const undoRedo = useUndoRedoHandler({
        shortcuts,
    });

    const specialKeysActionsHandler = React.useCallback(
        (e: React.KeyboardEvent) => {
            const input = e.target as HTMLInputElement;

            if (!focus || !input) {
                return false;
            }

            const field = fields.find(({key}) => key === focus?.key);
            const action = field?.specialKeysActions?.find(({key}) => {
                if (typeof key === 'string') {
                    return key === e.key;
                }
                return key(e);
            })?.action;

            if (!action) {
                return false;
            }

            const token = tokens[focus.idx] ?? {
                id: `tokenNew${tokens.length}`,
                kind: 'new',
                value: {},
            };

            action({
                token,
                offset: input.selectionStart ?? 0,
                focus,
                onFocus,
                onChange: onChangeToken,
                onApply: onApplyChanges,
                event: e,
            });

            return true;
        },
        [fields, focus, onApplyChanges, onChangeToken, onFocus, tokens],
    );

    const externalKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            const input = e.target as HTMLInputElement;

            if (!focus || !input) {
                return false;
            }

            const token = tokens[focus.idx] ?? {
                id: `tokenNew${tokens.length}`,
                kind: 'new',
                value: {},
            };

            return (
                onKeyDown?.({
                    token,
                    offset: input.selectionStart ?? 0,
                    focus,
                    onFocus,
                    onChange: onChangeToken,
                    onApply: onApplyChanges,
                    event: e,
                }) ?? false
            );
        },
        [focus, onApplyChanges, onChangeToken, onFocus, onKeyDown, tokens],
    );

    return React.useCallback(
        (e: React.KeyboardEvent) => {
            switch (true) {
                case externalKeyDown(e): {
                    break;
                }
                case specialKeysActionsHandler(e): {
                    break;
                }
                case navigationHandler(e): {
                    break;
                }
                case deleteHandler(e): {
                    break;
                }
                case blurHandler(e): {
                    break;
                }
                case undoRedo(e): {
                    break;
                }
            }
        },
        [
            blurHandler,
            deleteHandler,
            externalKeyDown,
            navigationHandler,
            specialKeysActionsHandler,
            undoRedo,
        ],
    );
};
