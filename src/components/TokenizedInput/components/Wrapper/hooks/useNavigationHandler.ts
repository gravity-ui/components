import * as React from 'react';

import {KeyCode} from '../../../constants';
import {useFocusContext, useInputContext} from '../../../context';
import type {TokenValueBase} from '../../../types';

import type {ShortcutMap} from './useShortcuts';

type UseNavigationHandlerOptions = {
    shortcuts: ShortcutMap;
    checkKey: (e: React.KeyboardEvent, key: string) => boolean;
    getCursorOffset: (input: HTMLInputElement) => number | undefined;
};

export const useNavigationHandler = <T extends TokenValueBase>({
    shortcuts,
    checkKey,
    getCursorOffset,
}: UseNavigationHandlerOptions) => {
    const focusInfo = useFocusContext<T>();
    const inputInfo = useInputContext<T>();

    const {focus} = focusInfo.state;
    const {getFocusRules, onFocus} = focusInfo.callbacks;
    const {fields, tokens} = inputInfo.state;

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

    return React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!e.shiftKey) {
                if (shortcuts.isTokenModifier(e)) {
                    return jumpToNeighborToken(e);
                }
                if (shortcuts.isFieldModifier(e)) {
                    return jumpToNeighborField(e);
                }
                if (!checkKey(e, KeyCode.Tab)) {
                    return moveToNeighborField(e);
                }
            }
            return tabJumping(e);
        },
        [
            checkKey,
            jumpToNeighborField,
            jumpToNeighborToken,
            moveToNeighborField,
            shortcuts,
            tabJumping,
        ],
    );
};
