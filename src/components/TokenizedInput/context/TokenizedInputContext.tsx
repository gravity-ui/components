import * as React from 'react';

import {useSuggestionsInitialCall, useTokenizedInputFocus, useTokenizedInputInfo} from '../hooks';
import {useTokenizedInputComponentFocus} from '../hooks/useTokenizedInputComponentFocus';
import type {
    TokenValueBase,
    TokenizedInputData,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
} from '../types';

type TokenizedInputContextOptions<T extends TokenValueBase> = {
    /** Input state and callbacks */
    inputInfo: TokenizedInputInfo<T>;
    /** Focus state and callbacks */
    focusInfo: TokenizedInputFocusInfo<T>;
    /** Extra options from props */
    options: {
        /** Suggestions fetcher */
        onSuggest: TokenizedInputData<T>['onSuggest'];
        /** Keydown handler; return true to stop further handling */
        onKeyDown: TokenizedInputData<T>['onKeyDown'];
        /** Suggestions debounce delay */
        debounceDelay: number | Record<keyof T, number>;
        /** First suggestions call: ensures the first focus triggers a request without debounce */
        suggestionsInitialCall: {
            value: React.MutableRefObject<boolean>;
            setValue: (v: boolean) => void;
        };
        /** Render suggestions full width below the input */
        fullWidthSuggestions: boolean;
        /** Return true to allow blur, false to prevent it */
        shouldAllowBlur?: (e: React.FocusEvent) => boolean;
    };
};

const TokenizedInputContext = React.createContext<TokenizedInputContextOptions<TokenValueBase>>({
    inputInfo: {
        state: {
            tokens: [],
            wrapperRef: {current: null},
            fields: [],
            isEditable: true,
            isClearable: true,
        },
        callbacks: {
            onApplyChanges: () => undefined,
            onChangeToken: () => [],
            onChangeTokens: () => [],
            onRemoveToken: () => [],
            onClearInput: () => [],
            onUndo: () => [],
            onRedo: () => [],
        },
    },
    focusInfo: {
        state: {focus: undefined, autoFocus: false},
        callbacks: {
            onFocus: () => undefined,
            onBlur: () => undefined,
            getFocusRules: () => ({
                nextField: {idx: 0, key: ''},
                prevField: {idx: 0, key: ''},
                nextToken: {idx: 0, key: ''},
                prevToken: {idx: 0, key: ''},
            }),
        },
    },
    options: {
        onSuggest: () => ({
            items: [],
        }),
        onKeyDown: () => false,
        debounceDelay: 150,
        suggestionsInitialCall: {value: {current: true}, setValue: () => undefined},
        fullWidthSuggestions: false,
        shouldAllowBlur: () => true,
    },
});

export function TokenizedInputContextProvider<T extends TokenValueBase>({
    debounceDelay = 150,
    debounceFlushStrategy = 'focus-field',
    autoFocus = false,
    fullWidthSuggestions = false,
    tokens,
    defaultTokens,
    transformTokens,
    validateToken,
    formatToken,
    fields,
    placeholder,
    className,
    isEditable,
    isClearable,
    onKeyDown,
    onChange,
    onSuggest,
    onFocus,
    onBlur,
    shouldAllowBlur = () => true,
    children,
}: React.PropsWithChildren<TokenizedInputData<T>>) {
    const inputInfo = useTokenizedInputInfo({
        tokens,
        defaultTokens,
        transformTokens,
        validateToken,
        formatToken,
        fields,
        placeholder,
        className,
        isEditable,
        isClearable,
        onChange,
    });
    const focusInfo = useTokenizedInputFocus({fields, inputInfo, autoFocus});
    const suggestionsInitialCall = useSuggestionsInitialCall(
        focusInfo.state.focus,
        debounceFlushStrategy,
    );

    useTokenizedInputComponentFocus({
        focusInfo,
        onBlur,
        onFocus,
    });

    const ctxValue = React.useMemo(
        () =>
            ({
                inputInfo,
                focusInfo,
                options: {
                    onSuggest,
                    onKeyDown,
                    debounceDelay,
                    suggestionsInitialCall,
                    fullWidthSuggestions,
                    shouldAllowBlur,
                },
            }) as unknown as TokenizedInputContextOptions<TokenValueBase>,
        [
            debounceDelay,
            shouldAllowBlur,
            focusInfo,
            fullWidthSuggestions,
            inputInfo,
            onKeyDown,
            onSuggest,
            suggestionsInitialCall,
        ],
    );

    return (
        <TokenizedInputContext.Provider value={ctxValue}>{children}</TokenizedInputContext.Provider>
    );
}

export const useTokenizedInput = <T extends TokenValueBase>() => {
    const ctx = React.useContext(
        TokenizedInputContext as unknown as React.Context<TokenizedInputContextOptions<T>>,
    );

    if (!ctx) {
        throw new Error('TokenizedInput context is not defined');
    }

    return ctx;
};
