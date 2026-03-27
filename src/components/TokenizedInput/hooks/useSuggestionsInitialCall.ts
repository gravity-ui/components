import * as React from 'react';

import type {TokenFocus, TokenValueBase, TokenizedInputData} from '../types';

export const useSuggestionsInitialCall = <T extends TokenValueBase>(
    focus: TokenFocus<T> | undefined,
    debounceFlushStrategy: TokenizedInputData<T>['debounceFlushStrategy'],
) => {
    const initialCallRef = React.useRef(true);

    React.useEffect(() => {
        if (debounceFlushStrategy === 'focus-input') {
            initialCallRef.current = !focus;
        } else {
            initialCallRef.current = true;
        }
        // We only want to reset the initial call flag when the focused field changes,
        // not when the entire focus object reference or debounceFlushStrategy changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focus?.key, focus?.idx]);

    const setInitialCall = React.useCallback((value: boolean) => {
        initialCallRef.current = value;
    }, []);

    return React.useMemo(
        () => ({
            value: initialCallRef,
            setValue: setInitialCall,
        }),
        [setInitialCall],
    );
};
