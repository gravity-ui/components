import * as React from 'react';

import {simpleFilterSuggestions} from '../components/Suggestions';
import {useSuggestionsInitialCall, useTokenizedInputFocus, useTokenizedInputInfo} from '../hooks';
import {useTokenizedInputComponentFocus} from '../hooks/useTokenizedInputComponentFocus';
import type {
    TokenValueBase,
    TokenizedInputData,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
    TokenizedInputOptionsInfo,
} from '../types';

export type TokenizedInputContextOptions<T extends TokenValueBase> = {
    inputInfo: TokenizedInputInfo<T>;
    focusInfo: TokenizedInputFocusInfo<T>;
    options: TokenizedInputOptionsInfo<T>;
};

export const InputContext = React.createContext<TokenizedInputInfo<TokenValueBase> | undefined>(
    undefined,
);
export const FocusContext = React.createContext<
    TokenizedInputFocusInfo<TokenValueBase> | undefined
>(undefined);
export const OptionsContext = React.createContext<
    TokenizedInputOptionsInfo<TokenValueBase> | undefined
>(undefined);

export function TokenizedInputContextProvider<T extends TokenValueBase>({
    debounceDelay = 150,
    debounceFlushStrategy = 'focus-field',
    autoFocus = false,
    fullWidthSuggestions = false,
    tokens,
    defaultTokens,
    transformTokens,
    validateToken,
    tokenErrors,
    formatToken,
    fields,
    placeholder,
    className,
    size = 'm',
    isEditable,
    isClearable,
    onKeyDown,
    onChange,
    onSuggest,
    onFocus,
    onBlur,
    shouldAllowBlur = () => true,
    filterSuggestions = simpleFilterSuggestions,
    children,
}: React.PropsWithChildren<TokenizedInputData<T>>) {
    const inputInfo = useTokenizedInputInfo({
        tokens,
        defaultTokens,
        transformTokens,
        validateToken,
        tokenErrors,
        formatToken,
        fields,
        placeholder,
        className,
        size,
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
                filterSuggestions,
            }) as unknown as TokenizedInputOptionsInfo<TokenValueBase>,
        [
            debounceDelay,
            shouldAllowBlur,
            fullWidthSuggestions,
            onKeyDown,
            onSuggest,
            suggestionsInitialCall,
            filterSuggestions,
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
