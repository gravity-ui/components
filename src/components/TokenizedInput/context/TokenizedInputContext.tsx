import * as React from 'react';

import {useSuggestionsInitialCall, useTokenizedInputFocus, useTokenizedInputInfo} from '../hooks';
import {useTokenizedInputComponentFocus} from '../hooks/useTokenizedInputComponentFocus';
import type {
    TokenValueBase,
    TokenizedInputData,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
} from '../types';

export type TokenizedInputOptionsInfo<T extends TokenValueBase> = {
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

export type TokenizedInputContextOptions<T extends TokenValueBase> = {
    inputInfo: TokenizedInputInfo<T>;
    focusInfo: TokenizedInputFocusInfo<T>;
    options: TokenizedInputOptionsInfo<T>;
};

export const InputContext = React.createContext<TokenizedInputInfo<TokenValueBase>>({
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
});

export const FocusContext = React.createContext<TokenizedInputFocusInfo<TokenValueBase>>({
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
});

export const OptionsContext = React.createContext<TokenizedInputOptionsInfo<TokenValueBase>>({
    onSuggest: () => ({
        items: [],
    }),
    onKeyDown: () => false,
    debounceDelay: 150,
    suggestionsInitialCall: {value: {current: true}, setValue: () => undefined},
    fullWidthSuggestions: false,
    shouldAllowBlur: () => true,
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

    const optionsValue = React.useMemo(
        () =>
            ({
                onSuggest,
                onKeyDown,
                debounceDelay,
                suggestionsInitialCall,
                fullWidthSuggestions,
                shouldAllowBlur,
            }) as unknown as TokenizedInputOptionsInfo<TokenValueBase>,
        [
            debounceDelay,
            shouldAllowBlur,
            fullWidthSuggestions,
            onKeyDown,
            onSuggest,
            suggestionsInitialCall,
        ],
    );

    return (
        <OptionsContext.Provider value={optionsValue}>
            <InputContext.Provider
                value={inputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={focusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
                >
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        </OptionsContext.Provider>
    );
}

export const useInputContext = <T extends TokenValueBase>() => {
    const ctx = React.useContext(InputContext as unknown as React.Context<TokenizedInputInfo<T>>);

    if (!ctx) {
        throw new Error('InputContext is not defined');
    }

    return ctx;
};

export const useFocusContext = <T extends TokenValueBase>() => {
    const ctx = React.useContext(
        FocusContext as unknown as React.Context<TokenizedInputFocusInfo<T>>,
    );

    if (!ctx) {
        throw new Error('FocusContext is not defined');
    }

    return ctx;
};

export const useOptionsContext = <T extends TokenValueBase>() => {
    const ctx = React.useContext(
        OptionsContext as unknown as React.Context<TokenizedInputOptionsInfo<T>>,
    );

    if (!ctx) {
        throw new Error('OptionsContext is not defined');
    }

    return ctx;
};

export const useTokenizedInput = <T extends TokenValueBase>(): TokenizedInputContextOptions<T> => {
    const inputInfo = useInputContext<T>();
    const focusInfo = useFocusContext<T>();
    const options = useOptionsContext<T>();

    return React.useMemo(
        () => ({
            inputInfo,
            focusInfo,
            options,
        }),
        [inputInfo, focusInfo, options],
    );
};
