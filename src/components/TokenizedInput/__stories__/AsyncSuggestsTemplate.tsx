import * as React from 'react';

import {StoryFn} from '@storybook/react';

import {tokenizedInputUtils} from '..';
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
            }),
        ],
    },
];

const fetchKeys = async () => {
    return new Promise<string[]>((res) =>
        setTimeout(() => {
            res(['Action', 'User', 'Name', 'Company', 'Rule', 'http-method']);
        }, 500),
    );
};

const fetchExtendedKeys = async () => {
    return new Promise<{value: string; type: string}[]>((res) =>
        setTimeout(() => {
            res([
                ...['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((value) => ({
                    value,
                    type: 'http-method',
                })),
                ...[
                    'Ivan Petrov',
                    'Ilya Davydov',
                    'Dmitriy Demchenkov',
                    'Klim Zhukov',
                    'Anton Detryuk',
                ].map((value) => ({value, type: 'User'})),
            ]);
        }, 1000),
    );
};

const fetchValues = async (key: string) => {
    return new Promise<string[]>((res) =>
        setTimeout(() => {
            if (key === 'User') {
                res([
                    'Ivan Petrov',
                    'Ilya Davydov',
                    'Dmitriy Demchenkov',
                    'Klim Zhukov',
                    'Anton Detryuk',
                ]);
                return;
            }
            if (key === 'Company') {
                res(['Yandex', 'Yandex Cloud']);
                return;
            }
            if (key === 'http-method') {
                res(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
                return;
            }

            res(['fetch', 'slice', 'sort']);
        }, 500),
    );
};

const onSuggest = async (
    ctx: TokenizedSuggestionContext<TokenValue>,
): Promise<TokenizedSuggestions<TokenValue>> => {
    if (ctx.idx > 6) {
        await Promise.all([fetchKeys(), fetchExtendedKeys()]);

        return {items: [], options: {showEmptyState: false}};
    }

    const token = ctx.tokens[ctx.idx];

    switch (ctx.key) {
        case 'key': {
            const [keys, extendedKeys] = await Promise.all([fetchKeys(), fetchExtendedKeys()]);
            return {
                items: [
                    ...keys.map((item) => {
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
                    ...extendedKeys.map((item) => {
                        return {
                            label: (
                                <span>
                                    {item.value}&nbsp;&nbsp;
                                    <span style={{color: 'var(--g-color-text-secondary)'}}>
                                        {`(${item.type})`}
                                    </span>
                                </span>
                            ),
                            search: item.value + item.type,
                            value: {key: item.type, operator: '=', value: item.value},
                            focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                            sort: 2,
                        };
                    }),
                ] as TokenizedSuggestionsItem<TokenValue>[],
            };
        }
        case 'operator': {
            const operators = ['=', '==', '!=', '!=='];

            return {
                items: operators.map((item) => {
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
        case 'value': {
            const values = await fetchValues(token.value.key);

            if (token.value.key === 'User') {
                return {
                    items: values.map((item) => {
                        return {
                            label: (
                                <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                                    <span>{item}</span>
                                    <span style={{color: 'var(--g-color-text-secondary)'}}>
                                        {item.split(' ').join('').toLowerCase() + '@yandex.ru'}
                                    </span>
                                </div>
                            ),
                            search: item,
                            value: {value: item},
                            focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                        };
                    }),
                };
            }
            return {
                items: values.map((item) => {
                    return {
                        label: item,
                        search: item,
                        value: {value: item},
                        focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                    };
                }),
            };
        }
        default: {
            return {items: [], options: {showEmptyState: false}};
        }
    }
};

export const AsyncSuggestsTokenizedInput = (
    props: Omit<TokenizedInputData<TokenValue>, 'onChange' | 'fields' | 'onSuggest'>,
) => {
    const [tokens, setTokens] = React.useState<TokenValue[]>(props.tokens ?? []);

    return (
        <TokenizedInput
            {...props}
            tokens={tokens}
            onChange={setTokens}
            fields={fields}
            onSuggest={onSuggest}
        />
    );
};

export const AsyncSuggestsTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return <AsyncSuggestsTokenizedInput {...args} />;
};
