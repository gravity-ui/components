import * as React from 'react';

import {getUniqId} from '@gravity-ui/uikit';
import {StoryFn} from '@storybook/react';

import {TokenizedInput} from '../TokenizedInput';
import {
    Token,
    TokenField,
    TokenizedInputData,
    TokenizedSuggestionContext,
    TokenizedSuggestions,
} from '../types';

import {TokenizedComponentType} from './types';

type TokenValue = {value: string};

const fields: TokenField<TokenValue>[] = [
    {
        key: 'value',
        specialKeysActions: [
            {
                key: (e) => e.key === ' ',
                action: ({focus, onFocus, event}) => {
                    event.preventDefault();

                    onFocus({
                        ...focus,
                        idx: focus.idx + 1,
                        key: 'value',
                        offset: -1,
                    });
                },
            },
        ],
    },
];

const onSuggest = (
    ctx: TokenizedSuggestionContext<TokenValue>,
): TokenizedSuggestions<TokenValue> => {
    const values = ctx.tokens.filter((v) => v.kind === 'regular').map(({value}) => value.value);
    const items = [
        'Red',
        'Green',
        'Blue',
        'Yellow',
        'White',
        'Black',
        'Grey',
        'Pink',
        'Purple',
        'Orange',
        'Brown',
    ].filter((c) => !values.includes(c));

    return {
        items: ['*', ...items].map((item, i) => {
            const preselected = i === 1;

            return {
                label: item,
                search: item,
                value: {value: item},
                focus: {idx: ctx.idx + 1, key: 'value', offset: -1},
                preselected,
            };
        }),
    };
};

export const transformTokens = (tokens: TokenValue[]): Token<TokenValue>[] => {
    return tokens.map((t) => ({
        id: getUniqId(),
        value: t,
        kind: 'regular',
        options: {readOnlyFields: ['value']},
    }));
};

export const SingleFieldTokenizedInput = (
    props: Omit<TokenizedInputData<TokenValue>, 'tokens' | 'onChange' | 'fields' | 'onSuggest'>,
) => {
    const [tokens, setTokens] = React.useState<TokenValue[]>([]);

    return (
        <TokenizedInput
            {...props}
            tokens={tokens}
            transformTokens={transformTokens}
            onChange={setTokens}
            fields={fields}
            onSuggest={onSuggest}
        />
    );
};

export const SingleFieldTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return <SingleFieldTokenizedInput {...args} />;
};
