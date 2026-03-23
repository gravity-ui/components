import * as React from 'react';

import {getUniqId} from '@gravity-ui/uikit';
import debounce from 'lodash/debounce';

import {useTokenizedInput} from '../../../context';
import type {
    Token,
    TokenValueBase,
    TokenizedInputData,
    TokenizedSuggestions,
    TokenizedSuggestionsItem,
} from '../../../types';
import {SuggestionsData} from '../types';
import {fuzzySearch, sortSuggestions} from '../utils';

import {useSelectSuggestion} from './useSelectSuggestion';
import {useSuggestionsPopupOptions} from './useSuggestionsPopupOptions';

type UseSuggestionsOptions<T extends TokenValueBase> = SuggestionsData<T> & {
    inputElement: HTMLInputElement | null;
};

export const useSuggestions = <T extends TokenValueBase>({
    idx,
    fieldKey,
    value,
    offset,
    selection,
    inputElement,
    onKeyDown,
}: UseSuggestionsOptions<T>) => {
    const {inputInfo, focusInfo, options} = useTokenizedInput<T>();

    const {tokens} = inputInfo.state;
    const {onChangeToken, onApplyChanges} = inputInfo.callbacks;
    const {focus} = focusInfo.state;
    const {onFocus} = focusInfo.callbacks;
    const {onSuggest, debounceDelay, suggestionsInitialCall, fullWidthSuggestions} = options;

    const [suggestions, setSuggestions] = React.useState<TokenizedSuggestions<T>>({
        items: [],
    });
    const [isLoadingData, setIsLoadingData] = React.useState(false);

    const initialLoadingRef = React.useRef(true);
    const currentFnId = React.useRef('');
    const cancelledFns = React.useRef<string[]>([]);

    const delay = React.useMemo(
        () => (typeof debounceDelay === 'number' ? debounceDelay : debounceDelay[fieldKey]),
        [debounceDelay, fieldKey],
    );
    const handleGetSuggestions = React.useMemo(
        () =>
            debounce(
                async (
                    args: SuggestionsData<T> & {
                        tokens: Token<T>[];
                        onSuggest: TokenizedInputData<T>['onSuggest'];
                        fnId: string;
                    },
                ) => {
                    if (!args.onSuggest) {
                        return;
                    }

                    let isCancelled = false;

                    setIsLoadingData(true);
                    setSuggestions({
                        items: [],
                        currentWord: {
                            value: args.value,
                            offset: args.offset,
                            position: {start: 0, end: 0},
                        },
                    });
                    try {
                        const response = await Promise.resolve(
                            args.onSuggest({
                                idx: args.idx,
                                key: args.fieldKey,
                                value: args.value,
                                offset: args.offset,
                                selection: args.selection,
                                tokens: args.tokens,
                            }),
                        );

                        const {
                            items,
                            currentWord = {
                                value: args.value,
                                offset: args.offset,
                                position: {start: 0, end: 0},
                            },
                        } = response;

                        const searchStr =
                            currentWord.value.slice(0, currentWord.offset).trim() || '';

                        if (cancelledFns.current.includes(args.fnId)) {
                            cancelledFns.current = cancelledFns.current.filter(
                                (fn) => fn !== args.fnId,
                            );
                            isCancelled = true;

                            return;
                        }

                        if (!searchStr || response.options?.isFilterable === false) {
                            setSuggestions({
                                ...response,
                                items: sortSuggestions(items),
                                currentWord,
                            });
                        } else {
                            const filteredItems = fuzzySearch(items, searchStr);

                            setSuggestions({
                                ...response,
                                items: filteredItems,
                                currentWord,
                            });
                        }
                    } finally {
                        if (!isCancelled) {
                            setIsLoadingData(false);
                            initialLoadingRef.current = false;
                        }
                    }
                },
                delay,
            ),
        [delay],
    );

    React.useEffect(() => {
        handleGetSuggestions.cancel();
        if (currentFnId.current) {
            cancelledFns.current.push(currentFnId.current);
        }

        const fnId = getUniqId();
        currentFnId.current = fnId;

        handleGetSuggestions({
            onSuggest,
            idx,
            fieldKey,
            value,
            offset,
            selection,
            tokens,
            fnId,
        });

        if (suggestionsInitialCall.value.current) {
            handleGetSuggestions.flush();
            suggestionsInitialCall.setValue(false);
        }

        return () => {
            handleGetSuggestions.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx, fieldKey, value, offset]);

    const onApplySuggestion = React.useCallback(
        (suggestion: TokenizedSuggestionsItem<T>) => {
            const focusIdx = focus?.idx ?? 0;
            const token = tokens[focusIdx];
            const isNew = !token || token.isNew;

            onChangeToken(focusIdx, suggestion.value);

            if (suggestion.focus) {
                onFocus({...suggestion.focus, ignoreChecks: true});
            }

            if (!isNew && suggestion.focus?.idx !== focusIdx) {
                onApplyChanges();
            }
        },
        [focus?.idx, onApplyChanges, onChangeToken, onFocus, tokens],
    );

    const {selected} = useSelectSuggestion({
        suggestions,
        inputElement,
        onApplySuggestion,
        onKeyDown,
    });

    const {popupWidth, popupOffset} = useSuggestionsPopupOptions(inputElement);

    const isLoading = initialLoadingRef.current || isLoadingData;
    const isPopupOpened =
        isLoading ||
        Boolean(suggestions.items.length) ||
        Boolean(suggestions.hint) ||
        suggestions.options?.showEmptyState !== false;

    return React.useMemo(
        () => ({
            state: {
                suggestions,
                isLoading,
                selected,
                isPopupOpened,
                inputElement,
                popupWidth,
                popupOffset,
                fullWidthSuggestions,
            },
            callbacks: {
                onApplySuggestion,
            },
        }),
        [
            fullWidthSuggestions,
            inputElement,
            isLoading,
            isPopupOpened,
            onApplySuggestion,
            popupOffset,
            popupWidth,
            selected,
            suggestions,
        ],
    );
};
