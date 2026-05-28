import * as React from 'react';

import {
    TokenizedInputFieldProps as FieldProps,
    TokenizedInputSuggestionsProps as SuggestionsProps,
    TokenizedInputTokenProps as TokenProps,
} from './components';

export type TokenValueBase = Record<string, string>;

export type RegularToken<T extends TokenValueBase> = {
    id: string;
    kind: 'regular';
    value: T;
    options?: {
        readOnlyFields?: (keyof T)[];
        notRemovable?: boolean;
    };
    errors?: Partial<Record<keyof T, string>>;
};

export type NewToken<T extends TokenValueBase> = {
    id: string;
    kind: 'new';
    value: T;
    options?: undefined;
    errors?: undefined;
};

export type Token<T extends TokenValueBase> = RegularToken<T> | NewToken<T>;

export type TokenOnKeyDownOptions<T extends TokenValueBase> = {
    /** Current token */
    token: Token<T>;
    /** Current focus */
    focus: TokenFocus<T>;
    /** Keydown event */
    event: React.KeyboardEvent;
    /** Caret position */
    offset: number;
    /** Focus handler */
    onFocus: (v: TokenFocus<T>) => void;
    /** Updates a single token */
    onChange: (idx: number, v: Partial<T>) => void;
    /** Applies pending changes */
    onApply: (currentTokens?: boolean) => void;
};

export type TokenFieldKeyAction<T extends TokenValueBase> = {
    /** Key matcher */
    key: string | ((event: React.KeyboardEvent) => boolean);
    /** Action */
    action?: (v: TokenOnKeyDownOptions<T>) => void;
};

export type TokenField<T extends TokenValueBase> = {
    /** Field key */
    key: keyof T;
    /** Field className */
    className?: string;
    /** Keyboard actions for this field */
    specialKeysActions?: TokenFieldKeyAction<T>[];
};

export type TokenFocus<T extends TokenValueBase> = {
    /** Token index */
    idx: number;
    /** Field key */
    key: keyof T;
    /** Cursor position (used to initialize focus) */
    offset?: number;
    /** Skip focus boundary checks (useful for suggestions) */
    ignoreChecks?: boolean;
};

export type TokenizedSuggestionContext<T extends TokenValueBase> = {
    /** Token index */
    idx: number;
    /** Field key */
    key: keyof T;
    /** Current field value */
    value: string;
    /** Current cursor position */
    offset: number;
    /** Current selection */
    selection?: [number, number];
    /** Token list */
    tokens: Token<T>[];
};

export type TokenizedSuggestionsItem<T extends TokenValueBase> = {
    /** Label shown in the list */
    label: React.ReactNode;
    /** Value used for fuzzy search */
    search: string;
    /** Partial token values to apply */
    value: Partial<T>;
    /** Focus to move to after selection */
    focus?: TokenFocus<T>;
    /** Whether the item is preselected; if several match, the first wins */
    preselected?: boolean;
    /** Sort position */
    sort?: number;
};

export type TokenizedSuggestions<T extends TokenValueBase> = {
    /** Suggestion items */
    items: TokenizedSuggestionsItem<T>[];
    /** Extra hint for the suggestion set */
    hint?: React.ReactNode;
    /** Current word for targeted replacement */
    currentWord?: {
        value: string;
        offset: number;
        position: {
            start: number;
            end: number;
        };
    };
    /** Extra options */
    options?: {
        isFilterable?: boolean;
        showEmptyState?: boolean;
    };
};

export type TokenPlaceholderGeneratorFn<T extends TokenValueBase> = (
    tokenType: 'new' | 'regular',
    tokenValue: T,
    idx: number,
) => string | undefined;

export type TokenizedInputInfo<T extends TokenValueBase> = {
    state: {
        /** Token list */
        tokens: Token<T>[];
        /** Token fields */
        fields: TokenField<T>[];
        /** Whether editing is allowed */
        isEditable: boolean;
        /** Whether full clear is allowed */
        isClearable: boolean;
        /** Placeholder for the new token */
        placeholder?: string | TokenPlaceholderGeneratorFn<T>;
        /** Wrapper className */
        className?: string;
        /** Wrapper ref */
        wrapperRef: React.RefObject<HTMLDivElement>;
    };
    callbacks: {
        /** Applies pending changes */
        onApplyChanges: (currentTokens?: boolean) => void;
        /** Updates one token */
        onChangeToken: (idx: number, newValue: Partial<T>) => Token<T>[];
        /** Replaces all tokens */
        onChangeTokens: (tokens: Token<T>[]) => Token<T>[];
        /** Removes a token */
        onRemoveToken: (idx: number) => Token<T>[];
        /** Clears the input using defaultTokens */
        onClearInput: () => Token<T>[];
        /** Undo */
        onUndo: () => Token<T>[];
        /** Redo */
        onRedo: () => Token<T>[];
    };
};

export type TokenizedInputFocusInfo<T extends TokenValueBase> = {
    state: {
        /** Current focus */
        focus: TokenFocus<T> | undefined;
        /** Autofocus */
        autoFocus?: boolean;
    };
    callbacks: {
        /** Focus handler */
        onFocus: (v: TokenFocus<T>) => void;
        /** Blur handler */
        onBlur: () => void;
        /** Neighbor field/token focus rules */
        getFocusRules: (v: TokenFocus<T>) => {
            nextField: TokenFocus<T>;
            prevField: TokenFocus<T>;
            nextToken: TokenFocus<T>;
            prevToken: TokenFocus<T>;
        };
    };
};

export type TokenizedInputOptionsInfo<T extends TokenValueBase> = {
    /** Suggestions getter */
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
    /** Function to filter suggestions */
    filterSuggestions: (
        items: TokenizedSuggestionsItem<T>[],
        search: string,
    ) => TokenizedSuggestionsItem<T>[];
};

export interface TokenizedInputData<T extends TokenValueBase> {
    /** Token values */
    tokens: T[];
    /** Defaults applied on full clear */
    defaultTokens?: T[];
    /** Maps raw tokens to internal token shape */
    transformTokens?: (tokens: T[]) => Token<T>[];
    /** Validates a token */
    validateToken?: ((token: T) => Partial<Record<keyof T, string>> | undefined) | false;
    /** External token errors — array parallel to tokens. Merged with validateToken errors per-field; on conflict the external error wins. */
    tokenErrors?: (Partial<Record<keyof T, string>> | undefined)[];
    /** Formats a token value */
    formatToken?: (token: T) => T;
    /** Field definitions; order matches display order */
    fields: TokenField<T>[];
    /** Wrapper className */
    className?: string;
    /** Placeholder for the new token */
    placeholder?: string | TokenPlaceholderGeneratorFn<T>;
    /** Whether editing is allowed */
    isEditable?: boolean;
    /** Whether full clear is allowed */
    isClearable?: boolean;
    /** Suggestions debounce delay; default 150ms; per-field overrides are supported (useful for prebuilt suggestion lists) */
    debounceDelay?: number | Record<keyof T, number>;
    /** When debounce flushes: `focus-input` runs debounce on focus change; `focus-field` does not debounce on focus change */
    debounceFlushStrategy?: 'focus-input' | 'focus-field';
    /** Autofocus the new token */
    autoFocus?: boolean;
    /** Keydown handler; return true to stop further handling */
    onKeyDown?: (v: TokenOnKeyDownOptions<T>) => boolean;
    /** Token list change handler */
    onChange: (newTokens: T[]) => void;
    /** Gets suggestions */
    onSuggest?: (
        suggestCtx: TokenizedSuggestionContext<T>,
    ) => TokenizedSuggestions<T> | Promise<TokenizedSuggestions<T>>;
    /** Render suggestions full width below the input */
    fullWidthSuggestions?: boolean;
    /** onFocus callback */
    onFocus?: () => void;
    /** onBlur callback */
    onBlur?: () => void;
    /** Return true to allow blur, false to prevent it */
    shouldAllowBlur?: (e: React.FocusEvent) => boolean;
    /** Function to filter suggestions */
    filterSuggestions?: (
        items: TokenizedSuggestionsItem<T>[],
        search: string,
    ) => TokenizedSuggestionsItem<T>[];
}

export type TokenizedInputComposition = {
    /** Wrapper that handles all key presses */
    Wrapper: React.ComponentType<React.PropsWithChildren<unknown>>;
    /** Renders the token list */
    TokenList: React.ComponentType<{}>;
    /** Token component */
    Token: React.ComponentType<TokenProps>;
    /** Input field inside a token */
    Field: React.ComponentType<FieldProps>;
    /** Suggestions; fully custom UIs should be wrapped with FieldComponent.Popup */
    Suggestions: React.ComponentType<SuggestionsProps>;
};
