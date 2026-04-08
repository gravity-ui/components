import type {TokenFocus, TokenValueBase, TokenizedSuggestionsItem} from '../../types';

export type SuggestionsNavigationOptions<T extends TokenValueBase> = {
    value: string;
    focus?: TokenFocus<T>;
    suggestion: TokenizedSuggestionsItem<T>;
    event: KeyboardEvent;
    currentWord?: {
        value: string;
        offset: number;
        position: {
            start: number;
            end: number;
        };
    };
    onSelectPrev: () => void;
    onSelectNext: () => void;
    onApply: (suggestion: TokenizedSuggestionsItem<T>) => void;
};

export interface SuggestionsData<T extends TokenValueBase> {
    idx: number;
    fieldKey: keyof T;
    value: string;
    offset: number;
    selection?: [number, number];
    className?: string;
    onKeyDown?: (v: SuggestionsNavigationOptions<T>) => boolean;
}
