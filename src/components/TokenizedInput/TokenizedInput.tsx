import {
    FieldComponent,
    SuggestionsComponent,
    TokenComponent,
    TokenListComponent,
    WrapperComponent,
} from './components';
import {Content} from './components/Content';
import {TokenizedInputComponentContextProvider, TokenizedInputContextProvider} from './context';
import type {TokenValueBase, TokenizedInputComposition, TokenizedInputData} from './types';

import './TokenizedInput.scss';

type TokenizedInputProps<T extends TokenValueBase> = TokenizedInputData<T> &
    Partial<TokenizedInputComposition>;

function TokenizedInputComponent<T extends TokenValueBase>({
    Wrapper = WrapperComponent,
    TokenList = TokenListComponent,
    Token = TokenComponent,
    Field = FieldComponent,
    Suggestions = SuggestionsComponent,
    ...props
}: TokenizedInputProps<T>) {
    return (
        <TokenizedInputContextProvider {...props}>
            <TokenizedInputComponentContextProvider
                Wrapper={Wrapper}
                TokenList={TokenList}
                Token={Token}
                Field={Field}
                Suggestions={Suggestions}
            >
                <Content />
            </TokenizedInputComponentContextProvider>
        </TokenizedInputContextProvider>
    );
}

type TTokenizedInput = typeof TokenizedInputComponent & TokenizedInputComposition;

export const TokenizedInput = TokenizedInputComponent as TTokenizedInput;

TokenizedInput.Wrapper = WrapperComponent;
TokenizedInput.TokenList = TokenListComponent;
TokenizedInput.Token = TokenComponent;
TokenizedInput.Field = FieldComponent;
TokenizedInput.Suggestions = SuggestionsComponent;
