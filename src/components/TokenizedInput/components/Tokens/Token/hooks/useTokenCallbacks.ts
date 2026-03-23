import * as React from 'react';

import {useTokenizedInput} from '../../../../context';

export const useTokenCallbacks = () => {
    const {inputInfo, focusInfo} = useTokenizedInput();

    const {onChangeToken} = inputInfo.callbacks;
    const {onFocus} = focusInfo.callbacks;

    const onChangeField = React.useCallback(
        (idx: number, key: string, value: string) => {
            onChangeToken(idx, {
                [key]: value,
            });
        },
        [onChangeToken],
    );

    const onFocusField = React.useCallback(
        (idx: number, key: string) => {
            onFocus({
                idx,
                key,
            });
        },
        [onFocus],
    );

    return {
        onChangeField,
        onFocusField,
    };
};
