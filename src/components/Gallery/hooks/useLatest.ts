import * as React from 'react';

export function useLatest<T>(value: T): {readonly current: T} {
    const ref = React.useRef(value);
    ref.current = value;
    return ref;
}
