import * as React from 'react';

import {useFocusContext, useInputContext} from '../../../context';
import type {Token, TokenValueBase} from '../../../types';

import type {ShortcutMap} from './useShortcuts';

type UseUndoRedoHandlerOptions = {
    shortcuts: ShortcutMap;
};

export const useUndoRedoHandler = <T extends TokenValueBase>({
    shortcuts,
}: UseUndoRedoHandlerOptions) => {
    const focusInfo = useFocusContext<T>();
    const inputInfo = useInputContext<T>();

    const {focus} = focusInfo.state;
    const {onFocus} = focusInfo.callbacks;
    const {fields} = inputInfo.state;
    const {onUndo, onRedo} = inputInfo.callbacks;

    return React.useCallback(
        (e: React.KeyboardEvent) => {
            if (!focus) {
                return false;
            }

            const focusLastToken = (newTokens: Token<T>[]) => {
                const idx = newTokens.findIndex((t) => t.kind === 'new');

                onFocus({
                    idx: idx === -1 ? newTokens.length : idx,
                    key: fields[0].key,
                    ignoreChecks: true,
                });
            };

            if (shortcuts.isRedo(e)) {
                e.preventDefault();
                const newTokens = onRedo();
                focusLastToken(newTokens);

                return true;
            }
            if (shortcuts.isUndo(e)) {
                e.preventDefault();
                const newTokens = onUndo();
                focusLastToken(newTokens);

                return true;
            }

            return false;
        },
        [fields, focus, onFocus, onRedo, onUndo, shortcuts],
    );
};
