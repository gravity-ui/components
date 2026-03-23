import * as React from 'react';

import {TokenValueBase, TokenizedInputFocusInfo} from '../types';

type Props<T extends TokenValueBase = TokenValueBase> = {
    focusInfo: TokenizedInputFocusInfo<T>;
    onFocus?: () => void;
    onBlur?: () => void;
};

export const useTokenizedInputComponentFocus = <T extends TokenValueBase = TokenValueBase>({
    focusInfo,
    onFocus,
    onBlur,
}: Props<T>) => {
    const lastFocused = React.useRef<number | null>(null);

    React.useEffect(() => {
        const p = lastFocused.current;
        const n = focusInfo.state.focus?.idx;

        const pEmpty = !p && p !== 0;
        const nEmpty = !n && n !== 0;

        if (pEmpty && !nEmpty) {
            onFocus?.();
        } else if (!pEmpty && nEmpty) {
            onBlur?.();
        }

        lastFocused.current = n ?? null;
    }, [focusInfo.state.focus?.idx, onBlur, onFocus]);
};
