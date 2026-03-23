import * as React from 'react';

import {getUniqId} from '@gravity-ui/uikit';
import isEqual from 'lodash/isEqual';

import type {Token, TokenValueBase, TokenizedInputData, TokenizedInputInfo} from '../types';
import {UndoRedoManager} from '../undoredo-manager';
import {
    defaultTransformTokens,
    defaultValidateToken,
    getDefaultTokenValue,
    getValuesFromTokens,
    removeEmptyTokens,
} from '../utils';

type UseTokenizedInputInfoOptions<T extends TokenValueBase> = Omit<
    TokenizedInputData<T>,
    'onSuggest' | 'onKeyDown' | 'debounceDelay' | 'autoFocus'
>;

export const useTokenizedInputInfo = <T extends TokenValueBase>({
    defaultTokens = [],
    isEditable = true,
    isClearable = true,
    transformTokens = defaultTransformTokens,
    validateToken = defaultValidateToken,
    formatToken,
    tokens: externalTokens,
    fields,
    placeholder,
    className,
    onChange,
}: UseTokenizedInputInfoOptions<T>): TokenizedInputInfo<T> => {
    const validateTokens = React.useCallback(
        (t: Token<T>[]): Token<T>[] =>
            t.map((token) => ({
                ...token,
                errors: validateToken ? validateToken(token.value) : undefined,
            })),
        [validateToken],
    );

    const [tokens, setTokens] = React.useState(validateTokens(transformTokens(externalTokens)));

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const tokensRef = React.useRef(tokens);
    const undoRedoManager = React.useRef(
        new UndoRedoManager(validateTokens(transformTokens(externalTokens))),
    );

    React.useEffect(() => {
        if (!isEqual(getValuesFromTokens(tokens.filter((t) => !t.isNew)), externalTokens)) {
            const newTokens = validateTokens(transformTokens(externalTokens));

            tokensRef.current = newTokens;
            setTokens(newTokens);
            undoRedoManager.current.init(newTokens);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [externalTokens]);

    const onChangeTokens = React.useCallback(
        (newTokens: Token<T>[], forceRewriteHistory = false) => {
            tokensRef.current = newTokens;
            setTokens(newTokens);
            undoRedoManager.current.update(newTokens, forceRewriteHistory);

            return newTokens;
        },
        [],
    );

    const onChangeToken = React.useCallback(
        (idx: number, newValue: Partial<T>) => {
            const prevTokens = tokensRef.current;

            if (idx >= prevTokens.length) {
                const newTokens = [
                    ...prevTokens,
                    {
                        id: `tokenId${getUniqId()}`,
                        isNew: true,
                        value: {
                            ...getDefaultTokenValue(fields),
                            ...newValue,
                        },
                    },
                ];

                return onChangeTokens(newTokens);
            } else {
                const newTokens = prevTokens
                    .map((t, i) =>
                        i === idx
                            ? {
                                  ...t,
                                  value: {...t.value, ...newValue},
                                  errors: undefined,
                              }
                            : {...t},
                    )
                    .filter((t) => Object.values(t.value).some((v) => v.trim()));

                return onChangeTokens(newTokens);
            }
        },
        [fields, onChangeTokens],
    );

    const onApplyChanges = React.useCallback(
        (currentTokens = false) => {
            const transformedTokens = tokensRef.current.map((t) => {
                const {value, options} = transformTokens([t.value])[0];

                return {...t, value, options};
            });
            const newTokens = removeEmptyTokens(transformedTokens)
                .map((t) => {
                    // apply changes only to existing tokens (not the in-progress new token)
                    if (currentTokens && t.isNew) {
                        return undefined;
                    }
                    const formattedValue = formatToken?.(t.value) ?? t.value;

                    return {
                        ...t,
                        isNew: false,
                        value: formattedValue,
                        errors: validateToken ? validateToken(formattedValue) : undefined,
                    };
                })
                .filter(Boolean) as Token<T>[];

            onChange(getValuesFromTokens(newTokens));
            onChangeTokens(newTokens, true);
        },
        [formatToken, onChange, onChangeTokens, transformTokens, validateToken],
    );

    const onRemoveToken = React.useCallback(
        (idx: number) => {
            const newTokens = tokensRef.current.filter((_, i) => i !== idx);
            onChange(getValuesFromTokens(newTokens));
            return onChangeTokens(newTokens);
        },
        [onChange, onChangeTokens],
    );

    const onClearInput = React.useCallback(() => {
        const newTokens = transformTokens(defaultTokens);
        onChange(defaultTokens);
        return onChangeTokens(newTokens);
    }, [defaultTokens, onChange, onChangeTokens, transformTokens]);

    const onUndo = React.useCallback(() => {
        const newTokens = undoRedoManager.current.undo();

        tokensRef.current = newTokens;
        setTokens(newTokens);
        onChange(getValuesFromTokens(removeEmptyTokens(newTokens.filter((t) => !t.isNew))));

        return newTokens;
    }, [onChange]);

    const onRedo = React.useCallback(() => {
        const newTokens = undoRedoManager.current.redo();

        tokensRef.current = newTokens;
        setTokens(newTokens);
        onChange(getValuesFromTokens(removeEmptyTokens(newTokens.filter((t) => !t.isNew))));

        return newTokens;
    }, [onChange]);

    const shouldRenderClearButton = React.useMemo(
        () => isClearable && externalTokens.length !== defaultTokens.length && isEditable,
        [isClearable, externalTokens.length, defaultTokens.length, isEditable],
    );

    return React.useMemo(
        () => ({
            state: {
                tokens,
                wrapperRef,
                defaultTokens,
                fields,
                isEditable,
                isClearable: shouldRenderClearButton,
                placeholder: isEditable ? placeholder : undefined,
                className,
            },
            callbacks: {
                onApplyChanges,
                onChangeToken,
                onChangeTokens,
                onRemoveToken,
                onClearInput,
                onUndo,
                onRedo,
            },
        }),
        [
            tokens,
            defaultTokens,
            fields,
            isEditable,
            shouldRenderClearButton,
            placeholder,
            className,
            onApplyChanges,
            onChangeToken,
            onChangeTokens,
            onRemoveToken,
            onClearInput,
            onUndo,
            onRedo,
        ],
    );
};
