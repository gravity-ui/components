import * as React from 'react';

import {useOptionsContext} from '../context';

export const useApplyCallbackOnBlur = (fn: (e: React.FocusEvent) => void) => {
    const {shouldAllowBlur} = useOptionsContext();
    return React.useCallback(
        (e: React.FocusEvent) => {
            if (!e.currentTarget.contains(e.relatedTarget) && shouldAllowBlur?.(e)) {
                fn(e);
            }
        },
        [fn, shouldAllowBlur],
    );
};
