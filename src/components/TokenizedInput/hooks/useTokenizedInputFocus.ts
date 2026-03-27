import * as React from 'react';

import type {
    Token,
    TokenField,
    TokenFocus,
    TokenValueBase,
    TokenizedInputData,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
} from '../types';

type UseTokenizedInputFocusOptions<T extends TokenValueBase> = Pick<
    TokenizedInputData<T>,
    'fields' | 'autoFocus'
> & {
    inputInfo: TokenizedInputInfo<T>;
};

const getInitialFocus = <T extends TokenValueBase>(
    tokens: Token<T>[],
    fields: TokenField<T>[],
    autoFocus?: boolean,
) => {
    if (!autoFocus) {
        return undefined;
    }

    const newTokenIdx = tokens.findIndex((t) => t.kind === 'new');

    return {idx: newTokenIdx === -1 ? tokens.length : newTokenIdx, key: fields[0].key, offset: -1};
};

export const useTokenizedInputFocus = <T extends TokenValueBase>({
    fields,
    inputInfo,
    autoFocus,
}: UseTokenizedInputFocusOptions<T>): TokenizedInputFocusInfo<T> => {
    const {tokens} = inputInfo.state;
    const {onApplyChanges} = inputInfo.callbacks;

    const [isAutoFocused, setIsAutoFocused] = React.useState(!autoFocus);

    React.useEffect(() => {
        setIsAutoFocused(true);
    }, []);

    const [focus, setFocus] = React.useState<TokenFocus<T> | undefined>(
        getInitialFocus(tokens, fields, autoFocus),
    );

    const onFocus = React.useCallback(
        (newFocus: TokenFocus<T>) => {
            const {idx, key, offset, ignoreChecks} = newFocus;

            const isNewToken =
                (idx === tokens.length && tokens[idx - 1]?.kind === 'new') ||
                (idx === tokens.length + 1 && tokens.at(-1)?.kind !== 'new');

            // new token is being finalized and not all fields are empty
            if (isNewToken) {
                const hasNonEmptyFields =
                    Object.values(tokens.find((t) => t.kind === 'new')?.value ?? {}).some(
                        Boolean,
                    ) || ignoreChecks;

                if (hasNonEmptyFields) {
                    onApplyChanges();
                    setFocus({
                        idx,
                        key: fields[0].key,
                        offset,
                    });
                }
                return;
            }

            // handle focus past the end of the list
            if (idx - tokens.length > 0) {
                setFocus({
                    idx: tokens.length,
                    key: fields[0].key,
                    offset,
                });
                return;
            }

            setFocus((cur) => {
                // !cur — initial focus; ignoreChecks — skip boundary checks
                if (!cur || ignoreChecks) {
                    return newFocus;
                }
                // existing (non-new) tokens: no checks needed
                if (tokens[cur.idx] && tokens[cur.idx].kind !== 'new') {
                    return newFocus;
                }

                // new tokens
                const curKeyIndex = fields.findIndex((f) => f.key === cur.key);
                const keyIndex = fields.findIndex((f) => f.key === key);
                const curValuesNonEmptyCondition = fields
                    .slice(0, keyIndex)
                    .some((f) => !tokens[cur.idx]?.value?.[f.key]);
                const allValuesNonEmptyCondition = fields.some(
                    (f) => !tokens[cur.idx]?.value?.[f.key],
                );

                const curEmptyFieldCondition =
                    idx === cur.idx && curKeyIndex < keyIndex && curValuesNonEmptyCondition;
                const nextEmptyFieldCondition =
                    idx > cur.idx &&
                    curKeyIndex === fields.length - 1 &&
                    !allValuesNonEmptyCondition;

                // empty fields
                if (curEmptyFieldCondition || nextEmptyFieldCondition) {
                    return {...cur, offset};
                }

                return newFocus;
            });
        },
        [fields, onApplyChanges, tokens],
    );

    const onBlur = React.useCallback(() => {
        setFocus(undefined);
    }, []);

    const getFocusRules = React.useCallback(
        (value: TokenFocus<T>) => {
            const {idx, key, offset} = value;

            const keyIndex = fields.findIndex((f) => f.key === key);
            const noOffset = offset === undefined;

            const prevField: TokenFocus<T> = {
                key: noOffset || offset === 0 ? fields[keyIndex - 1]?.key : key,
                idx,
                offset: 0,
            };
            const nextField: TokenFocus<T> = {
                key: noOffset || offset === -1 ? fields[keyIndex + 1]?.key : key,
                idx,
                offset: -1,
            };

            if (!prevField.key) {
                prevField.key = prevField.idx === 0 ? key : (fields.at(-1)?.key ?? key);
                prevField.idx = prevField.idx === 0 ? 0 : prevField.idx - 1;
            }

            if (!nextField.key) {
                nextField.key = fields[0].key;
                nextField.idx++;
            }

            const prevToken: TokenFocus<T> = {
                key: fields[0].key,
                idx: idx === 0 || key !== fields[0].key ? idx : idx - 1,
                offset: 0,
            };

            const nextToken: TokenFocus<T> = {
                key: fields.at(-1)?.key ?? key,
                idx: key === fields.at(-1)?.key ? idx + 1 : idx,
                offset: -1,
            };

            if (nextToken.idx === tokens.length || tokens[nextToken.idx]?.kind === 'new') {
                nextToken.key = fields[0].key;
            }

            return {
                nextField,
                prevField,
                nextToken,
                prevToken,
            };
        },
        [fields, tokens],
    );

    return React.useMemo(
        () => ({
            state: {focus, autoFocus: isAutoFocused ? false : autoFocus},
            callbacks: {
                onFocus,
                onBlur,
                getFocusRules,
            },
        }),
        [autoFocus, focus, getFocusRules, isAutoFocused, onBlur, onFocus],
    );
};
