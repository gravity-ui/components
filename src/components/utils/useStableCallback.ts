import React from 'react';

export function useStableCallback<Args extends Array<unknown>, Result>(
    handler: (...args: Args) => Result,
) {
    const handlerRef = React.useRef<typeof handler>(handler);

    handlerRef.current = handler;

    return React.useCallback((...args: Args) => {
        return handlerRef.current(...args);
    }, []);
}
