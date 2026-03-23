import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useTokenizedInput} from '../../../context';
import type {Token, TokenValueBase} from '../../../types';

export const useKeyDownHandler = () => {
    const {focusInfo, inputInfo, options} = useTokenizedInput();

    const {fields, tokens} = inputInfo.state;
    const {onRemoveToken, onChangeToken, onUndo, onRedo, onApplyChanges} = inputInfo.callbacks;
    const {focus} = focusInfo.state;
    const {getFocusRules, onFocus, onBlur} = focusInfo.callbacks;
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

    // move to next field at end of word
    // move to previous field at start of word
    const moveToNeighborField = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const input = e.target as HTMLInputElement;
            const focusRules = getFocusRules({
                ...focus,
                offset: undefined,
            });

            const token = tokens[focus.idx];
            const isReadOnlyField = token?.options?.readOnlyFields?.includes(focus.key);

            if (
                token &&
                (input.selectionStart === input.value.length || isReadOnlyField) &&
                checkKey(e, KeyCode.ArrowRight)
            ) {
                e.preventDefault();
                onFocus({
                    ...focusRules.nextField,
                    offset: 0,
                });

                return true;
            }

            if (
                (focusRules.prevField.key !== focus.key ||
                    focusRules.prevField.idx !== focus.idx) &&
                (input.selectionStart === 0 || isReadOnlyField) &&
                checkKey(e, KeyCode.ArrowLeft)
            ) {
                e.preventDefault();
                onFocus({
                    ...focusRules.prevField,
                    offset: -1,
                });

                return true;
            }

            return false;
        },
        [checkKey, focus, getFocusRules, onFocus, tokens],
    );

    const tabJumping = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const focusRules = getFocusRules({
                ...focus,
                offset: undefined,
            });

            if (checkKey(e, KeyCode.Tab)) {
                if (
                    e.shiftKey &&
                    ((focus.idx === 0 && fields[0].key !== focus.key) || focus.idx > 0)
                ) {
                    e.preventDefault();
                    onFocus(focusRules.prevField);

                    return true;
                }

                if (!e.shiftKey && tokens[focus.idx]?.value) {
                    e.preventDefault();
                    onFocus(focusRules.nextField);

                    return true;
                }
            }

            return false;
        },
        [checkKey, fields, focus, getFocusRules, onFocus, tokens],
    );

    // move to next/previous field
    const jumpToNeighborField = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const input = e.target as HTMLInputElement;
            const focusRules = getFocusRules({
                ...focus,
                offset: getCursorOffset(input),
            });

            if (checkKey(e, KeyCode.ArrowRight)) {
                e.preventDefault();
                onFocus(focusRules.nextField);

                return true;
            }
            if (checkKey(e, KeyCode.ArrowLeft)) {
                e.preventDefault();
                onFocus(focusRules.prevField);

                return true;
            }

            return false;
        },
        [checkKey, focus, getCursorOffset, getFocusRules, onFocus],
    );

    // move to next/previous token
    const jumpToNeighborToken = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const input = e.target as HTMLInputElement;
            const focusRules = getFocusRules({
                ...focus,
                offset: getCursorOffset(input),
            });

            if (checkKey(e, KeyCode.ArrowRight)) {
                e.preventDefault();
                onFocus(focusRules.nextToken);

                return true;
            }
            if (checkKey(e, KeyCode.ArrowLeft)) {
                e.preventDefault();
                onFocus(focusRules.prevToken);

                return true;
            }

            return false;
        },
        [checkKey, focus, getCursorOffset, getFocusRules, onFocus],
    );

    const navigationHandler = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!e.shiftKey) {
                if (e.metaKey || e.ctrlKey) {
                    return jumpToNeighborToken(e);
                }
                if (e.altKey) {
                    return jumpToNeighborField(e);
                }
                if (!checkKey(e, KeyCode.Tab)) {
                    return moveToNeighborField(e);
                }
            }
            return tabJumping(e);
        },
        [checkKey, jumpToNeighborField, jumpToNeighborToken, moveToNeighborField, tabJumping],
    );

    const deleteHandler = React.useCallback(
        (e: React.KeyboardEvent) => {
            const input = e.target as HTMLInputElement;

            if (!focus || !input) {
                return false;
            }

            if (checkKey(e, KeyCode.Backspace)) {
                if (e.ctrlKey || e.metaKey) {
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

                    if (
                        (focus.key === key && focus.idx === idx) ||
                        tokens[idx].options?.readOnlyFields?.includes(key)
                    ) {
                        return false;
                    }

                    e.preventDefault();
                    if (idx === focus.idx) {
                        onChangeToken(idx, {
                            [key]: tokens[idx].value[key].slice(0, -1),
                        });
                    }

                    onFocus({...prevField, offset: -1});

                    return true;
                }
            }

            return false;
        },
        [checkKey, fields, focus, getFocusRules, onChangeToken, onFocus, onRemoveToken, tokens],
    );

    const blurHandler = React.useCallback(
        (e: React.KeyboardEvent) => {
            const handler = () => {
                const input = e.target as HTMLInputElement;
                input.blur();
                onBlur();
            };

            if (checkKey(e, KeyCode.Enter)) {
                e.preventDefault();
                onApplyChanges();

                if (e.ctrlKey || e.metaKey) {
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
        [checkKey, focus, getCursorOffset, getFocusRules, onApplyChanges, onBlur, onFocus],
    );

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
                isNew: true,
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

    const undoRedo = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const focusLastToken = (newTokens: Token<TokenValueBase>[]) => {
                const idx = newTokens.findIndex((t) => t.isNew);

                onFocus({
                    idx: idx === -1 ? newTokens.length : idx,
                    key: fields[0].key,
                    ignoreChecks: true,
                });
            };

            if (
                (e.metaKey && e.shiftKey && e.code === 'KeyZ') ||
                (e.ctrlKey && e.code === 'KeyY')
            ) {
                e.preventDefault();
                const newTokens = onRedo();
                focusLastToken(newTokens);

                return true;
            }
            if ((e.metaKey || e.ctrlKey) && e.code === 'KeyZ') {
                e.preventDefault();
                const newTokens = onUndo();
                focusLastToken(newTokens);

                return true;
            }

            return false;
        },
        [fields, focus, onFocus, onRedo, onUndo],
    );

    const externalKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            const input = e.target as HTMLInputElement;

            if (!focus || !input) {
                return false;
            }

            const token = tokens[focus.idx] ?? {
                id: `tokenNew${tokens.length}`,
                isNew: true,
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
