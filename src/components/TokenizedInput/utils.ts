import {getUniqId} from '@gravity-ui/uikit';

import {Token, TokenField, TokenFieldKeyAction, TokenValueBase} from './types';

export {fuzzySearch} from './components/Suggestions';

export const getDefaultTokenValue = <T extends TokenValueBase>(fields: TokenField<T>[]): T => {
    return fields.reduce<T>((acc, cur) => ({...acc, [cur.key]: ''}), {} as T);
};

export const getValuesFromTokens = <T extends TokenValueBase>(tokens: Token<T>[]): T[] => {
    return tokens.map(({id: _id, value}) => value);
};

export const removeEmptyTokens = <T extends TokenValueBase>(tokens: Token<T>[]): Token<T>[] => {
    return tokens.filter((token) => {
        return !Object.values(token.value).every((v) => v.trim() === '');
    });
};

export const removeNewTokens = <T extends TokenValueBase>(tokens: Token<T>[]): Token<T>[] => {
    return tokens.filter((token) => {
        return !token.isNew;
    });
};

export const defaultValidateToken = <T extends TokenValueBase>(token: T) => {
    const errors = Object.entries(token).reduce<Partial<Record<keyof T, string>>>(
        (map, [key, value]) => {
            if (value.trim()) {
                return map;
            }
            return {...map, [key]: 'Empty value'};
        },
        {},
    );

    if (Object.keys(errors).length === 0) {
        return undefined;
    }

    return errors;
};

export const defaultTransformTokens = <T extends TokenValueBase>(tokens: T[]): Token<T>[] => {
    return tokens.map((value) => {
        return {
            id: `tokenId${getUniqId()}`,
            isNew: false,
            value,
        };
    });
};

const findPairBySymbol = (symbol: string, pairs: Record<string, string>) => {
    const pair = Object.entries(pairs).find(([o, c]) => o === symbol || c === symbol);

    return pair ?? [];
};

const findUnclosedPairs = (value: string, pairs: Record<string, string>) => {
    const stack: string[] = [];
    const symbols = value.split('');

    for (const symbol of symbols) {
        const pair = findPairBySymbol(symbol, pairs);

        if (!pair.length) {
            continue;
        }

        if (stack.at(-1) === pair[0]) {
            stack.pop();
        } else {
            stack.push(symbol);
        }
    }

    return stack;
};

export const autoClosingPairsAction = <T extends TokenValueBase>(
    fieldKey: keyof T,
    pairs: Record<string, string> = {
        "'": "'",
        '"': '"',
        '{': '}',
        '(': ')',
        '[': ']',
    },
): TokenFieldKeyAction<T> => ({
    key: (e) => Boolean(findPairBySymbol(e.key, pairs).length),
    action: ({token, offset, onFocus, focus, onChange, event}) => {
        const value = token.value.value ?? '';

        const [openSymbol, closeSymbol] = findPairBySymbol(event.key, pairs);

        if (!openSymbol || !closeSymbol) {
            return;
        }

        const input = event.target as HTMLInputElement;

        const startOffset = input.selectionStart || offset;
        const endOffset = input.selectionEnd || offset;

        // check for unclosed pair
        if (event.key === closeSymbol) {
            const unclosedPairs = findUnclosedPairs(value.slice(0, offset), pairs);

            // if there is unclosed pair and the next symbol is not closeSymbol
            // then forcing default event
            if (
                unclosedPairs.length &&
                unclosedPairs.at(-1) === closeSymbol &&
                value[endOffset] !== closeSymbol
            ) {
                return;
            }
        }

        // if the next symbol is closeSymbol
        // prevent it from being doubled
        if (event.key === closeSymbol && value[endOffset] === closeSymbol) {
            event.preventDefault();
            onFocus({...focus, offset: offset + 1});

            return;
        }

        const nextSymbolIsWordSymbol =
            Boolean(value[endOffset]) && /\w+/g.test(value[endOffset]) && startOffset === endOffset;

        if (event.key !== openSymbol || nextSymbolIsWordSymbol) {
            return;
        }

        event.preventDefault();

        onFocus({...focus, offset: endOffset + 1});
        onChange(focus.idx, {
            [fieldKey]:
                value.slice(0, startOffset) +
                `${openSymbol}${value.slice(startOffset, endOffset)}${closeSymbol}` +
                value.slice(endOffset),
        } as Partial<T>);
    },
});
