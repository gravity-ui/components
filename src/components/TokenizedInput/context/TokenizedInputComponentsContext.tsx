import * as React from 'react';

import {
    FieldComponent,
    SuggestionsComponent,
    TokenComponent,
    TokenListComponent,
    WrapperComponent,
} from '../components';
import type {TokenizedInputComposition} from '../types';

const TokenizedInputComponentsContext = React.createContext<TokenizedInputComposition>({
    Wrapper: WrapperComponent,
    TokenList: TokenListComponent,
    Token: TokenComponent,
    Field: FieldComponent,
    Suggestions: SuggestionsComponent,
});

export function TokenizedInputComponentContextProvider({
    Wrapper,
    TokenList,
    Token,
    Field,
    Suggestions,
    children,
}: React.PropsWithChildren<TokenizedInputComposition>) {
    const ctxValue = React.useMemo(
        () => ({
            Wrapper,
            TokenList,
            Token,
            Field,
            Suggestions,
        }),
        [Field, Suggestions, Token, TokenList, Wrapper],
    );

    return (
        <TokenizedInputComponentsContext.Provider value={ctxValue}>
            {children}
        </TokenizedInputComponentsContext.Provider>
    );
}

export const useTokenizedInputComponents = () => {
    const ctx = React.useContext(TokenizedInputComponentsContext);

    if (!ctx) {
        throw new Error('TokenizedInput context is not defined');
    }

    return ctx;
};
