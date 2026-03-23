import * as React from 'react';

import {StoryFn} from '@storybook/react';

import {TokenizedInputFieldProps, tokenizedInputUtils} from '..';
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

const onSuggest = (
    ctx: TokenizedSuggestionContext<TokenValue>,
): TokenizedSuggestions<TokenValue> => {
    if (ctx.idx > 6) {
        return {items: [], options: {showEmptyState: false}};
    }

    const token = ctx.tokens[ctx.idx];

    switch (ctx.key) {
        case 'key': {
            return {
                items: [
                    ...['Action', 'User', 'Name', 'Company', 'Rule', 'http-method'].map((item) => {
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
        case 'value': {
            if (token.value.key === 'User') {
                return {
                    items: [
                        'Ivan Petrov',
                        'Ilya Davydov',
                        'Dmitriy Demchenkov',
                        'Klim Zhukov',
                        'Anton Detryuk',
                    ].map((item) => {
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
            if (token.value.key === 'Company') {
                return {
                    items: ['Yandex', 'Yandex Cloud'].map((item) => {
                        return {
                            label: item,
                            search: item,
                            value: {value: item},
                            focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                        };
                    }),
                };
            }

            if (token.value.key === 'Rule') {
                return {
                    items: [
                        'abs',
                        'alert_evaluation_history',
                        'alias',
                        'as_vector',
                        'asap',
                        'avg',
                        'binomial_distribution',
                        'bottom',
                        'bottom_avg',
                        'bottom_count',
                        'bottom_last',
                        'bottom_max',
                        'bottom_min',
                        'bottom_sum',
                        'ceil',
                        'constant_line',
                        'count',
                        'delta_to_rate',
                        'derivative',
                        'diff',
                        'drop_above',
                        'drop_below',
                        'drop_empty_lines',
                        'drop_empty_series',
                        'drop_head',
                        'drop_if',
                        'drop_label',
                        'drop_nan',
                        'drop_tail',
                        'exp',
                        'exponential_trend',
                        'fallback',
                        'filter_by_time',
                        'flatten',
                        'floor',
                        'fract',
                        'get_label',
                        'get_timestamps',
                        'grid_step',
                        'group_by_time',
                        'group_lines',
                        'head',
                        'heaviside',
                        'histogram_avg',
                        'histogram_cdfp',
                        'histogram_count',
                        'histogram_percentile',
                        'histogram_sum',
                        'inf',
                        'integral',
                        'integrate',
                        'integrate_fn',
                        'iqr',
                        'kronos_adjusted',
                        'kronos_mean',
                        'kronos_variance',
                        'last',
                        'linear_trend',
                        'load',
                        'load1',
                        'log',
                        'logarithmic_trend',
                        'max',
                        'median',
                        'min',
                        'mod',
                        'moving_avg',
                        'moving_percentile',
                        'moving_sum',
                        'non_negative_derivative',
                        'percentile',
                        'percentile_group_lines',
                        'pow',
                        'ramp',
                        'random',
                        'random01',
                        'rate_to_delta',
                        'relabel',
                        'replace_nan',
                        'round',
                        'seasonal_adjusted',
                        'seasonal_mean',
                        'seasonal_variance',
                        'series_avg',
                        'series_count',
                        'series_max',
                        'series_min',
                        'series_percentile',
                        'series_sum',
                        'shift',
                        'sign',
                        'single',
                        'size',
                        'sqr',
                        'sqrt',
                        'std',
                        'sum',
                        'summary_avg',
                        'summary_count',
                        'summary_last',
                        'summary_max',
                        'summary_min',
                        'summary_sum',
                        'tail',
                        'take_if',
                        'time_interval_begin',
                        'time_interval_end',
                        'timestamps',
                        'to_fixed',
                        'to_string',
                        'to_vector',
                        'top',
                        'top_avg',
                        'top_count',
                        'top_last',
                        'top_max',
                        'top_min',
                        'top_sum',
                        'transform',
                        'trunc',
                    ].map((item) => {
                        return {
                            label: item,
                            search: item,
                            value: {value: item},
                            focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                        };
                    }),
                };
            }

            return {
                items: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'fetch', 'slice', 'sort'].map(
                    (item) => {
                        return {
                            label: item,
                            search: item,
                            value: {value: item},
                            focus: {idx: ctx.idx + 1, key: 'key', offset: -1},
                        };
                    },
                ),
            };
        }
        default: {
            return {items: [], options: {showEmptyState: false}};
        }
    }
};

const renderValue: TokenizedInputFieldProps['renderValue'] = ({
    fieldKey,
    isFocused,
    isNew,
    visibleValue,
}) => {
    if (isNew || isFocused) {
        return visibleValue;
    }

    if (fieldKey === 'key') {
        return <span style={{color: 'purple', fontWeight: 800}}>{visibleValue}</span>;
    }

    if (fieldKey === 'operator') {
        return <span style={{color: 'black'}}>{visibleValue}</span>;
    }

    if (fieldKey === 'value') {
        return <span style={{color: 'green'}}>{visibleValue}</span>;
    }

    return visibleValue;
};

const Field = (props: TokenizedInputFieldProps) => {
    return <TokenizedInput.Field {...props} renderValue={renderValue} selectOnClick />;
};

export const CustomRenderValueTokenizedInput = (
    props: Omit<TokenizedInputData<TokenValue>, 'tokens' | 'onChange' | 'fields' | 'onSuggest'>,
) => {
    const [tokens, setTokens] = React.useState<TokenValue[]>([]);

    return (
        <TokenizedInput
            {...props}
            tokens={tokens}
            onChange={setTokens}
            fields={fields}
            onSuggest={onSuggest}
            Field={Field}
        />
    );
};

export const CustomRenderValueTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return <CustomRenderValueTokenizedInput {...args} />;
};
