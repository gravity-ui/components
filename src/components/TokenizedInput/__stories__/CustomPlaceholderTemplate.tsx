import * as React from 'react';

import {StoryFn} from '@storybook/react';

import {TokenPlaceholderGeneratorFn, tokenizedInputUtils} from '..';
import {TokenizedInput} from '../TokenizedInput';
import {
    TokenField,
    TokenizedInputData,
    TokenizedSuggestionContext,
    TokenizedSuggestions,
    TokenizedSuggestionsItem,
} from '../types';

import {TokenizedComponentType} from './types';

type TokenValue = {key: string; operator: string; value: string};

const fields: TokenField<TokenValue>[] = [
    {
        key: 'key',
        specialKeysActions: [
            {
                key: (e) => e.key === '!' || e.key === '=',
                action: ({token, focus, onFocus, onChange, event}) => {
                    event.preventDefault();

                    if (!token.value.key) {
                        return;
                    }

                    onFocus({
                        ...focus,
                        key: 'operator',
                        offset: -1,
                        ignoreChecks: true,
                    });
                    onChange(focus.idx, {...token.value, operator: event.key});
                },
            },
            {
                key: (e) => e.key === ' ' && e.shiftKey,
                action: ({token, focus, onFocus, onChange, event}) => {
                    event.preventDefault();

                    if (!token.value.key) {
                        return;
                    }

                    onFocus({
                        ...focus,
                        key: 'value',
                        offset: -1,
                        ignoreChecks: true,
                    });
                    onChange(focus.idx, {...token.value, operator: '='});
                },
            },
        ],
    },
    {
        key: 'operator',
        specialKeysActions: [
            {
                key: (e) => {
                    if (e.key.length > 1 || e.key === ' ') {
                        return false;
                    }
                    return e.key !== '=' && e.key !== '!' && e.key !== '~';
                },
                action: ({token, focus, onFocus, onChange, event}) => {
                    event.preventDefault();

                    if (!token.value.operator) {
                        return;
                    }

                    onFocus({
                        ...focus,
                        key: 'value',
                        offset: -1,
                        ignoreChecks: true,
                    });
                    onChange(focus.idx, {
                        ...token.value,
                        operator: token.value.operator ?? '=',
                        value: event.key,
                    });
                },
            },
        ],
    },
    {
        key: 'value',
        specialKeysActions: [
            tokenizedInputUtils.autoClosingPairsAction('value', {
                '{': '}',
                '"': '"',
                "'": "'",
                '(': ')',
            }),
        ],
    },
];

const onSuggest = (
    ctx: TokenizedSuggestionContext<TokenValue>,
): TokenizedSuggestions<TokenValue> => {
    switch (ctx.key) {
        case 'key': {
            return {
                items: [
                    ...['message'].map((item) => {
                        return {
                            label: item,
                            search: item,
                            value: {key: item},
                            focus: {
                                idx: ctx.idx,
                                key: 'operator',
                                offset: -1,
                                ignoreChecks: true,
                            },
                            sort: 1,
                        };
                    }),
                ] as TokenizedSuggestionsItem<TokenValue>[],
            };
        }
        case 'operator': {
            return {
                items: ['=', '==', '!=', '!=='].map((item) => {
                    return {
                        label: item,
                        search: item,
                        value: {operator: item},
                        focus: {idx: ctx.idx, key: 'value', offset: -1},
                    };
                }),
                options: {
                    isFilterable: false,
                },
            };
        }
    }

    return {items: [], options: {showEmptyState: false}};
};

export const CustomPlaceholderTokenizedInput = (
    props: Omit<TokenizedInputData<TokenValue>, 'tokens' | 'onChange' | 'fields' | 'onSuggest'>,
) => {
    const [tokens, setTokens] = React.useState<TokenValue[]>([]);

    const placeholder: TokenPlaceholderGeneratorFn<TokenValue> = React.useCallback(
        (tokenType, token, idx) => {
            if (token.key === 'message' && idx === 2) {
                return 'Enter a string';
            }
            if (tokenType === 'new' && idx === 0) {
                return 'Enter a value';
            }
            return undefined;
        },
        [],
    );

    return (
        <TokenizedInput
            {...props}
            tokens={tokens}
            onChange={setTokens}
            fields={fields}
            onSuggest={onSuggest}
            placeholder={placeholder}
        />
    );
};

export const CustomPlaceholderTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return <CustomPlaceholderTokenizedInput {...args} />;
};
