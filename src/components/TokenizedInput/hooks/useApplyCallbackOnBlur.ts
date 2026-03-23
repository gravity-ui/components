import * as React from 'react';

import {useTokenizedInput} from '../context';

export const useApplyCallbackOnBlur = (fn: (e: React.FocusEvent) => void) => {
    const {
        options: {shouldAllowBlur},
    } = useTokenizedInput();
    return React.useCallback(
        (e: React.FocusEvent) => {
            if (!e.currentTarget.contains(e.relatedTarget) && shouldAllowBlur?.(e)) {
                fn(e);
            }
        },
        [fn, shouldAllowBlur],
    );
};
