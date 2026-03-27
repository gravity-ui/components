import * as React from 'react';

import {b} from '../../../../constants';
import {useFocusContext, useInputContext, useTokenizedInputComponents} from '../../../../context';
import {getDefaultTokenValue} from '../../../../utils';

import {useTokenCallbacks} from './useTokenCallbacks';

export const useNewToken = (idx: number) => {
    const inputInfo = useInputContext();
    const focusInfo = useFocusContext();
    const {Field} = useTokenizedInputComponents();

    const {tokens, fields, placeholder} = inputInfo.state;
    const {autoFocus} = focusInfo.state;

    const {onChangeField, onFocusField} = useTokenCallbacks();

    const token = React.useMemo(
        () => tokens[idx] ?? {id: 'new-token', value: getDefaultTokenValue(fields), kind: 'new'},
        [fields, idx, tokens],
    );

    const checkIsHidden = React.useCallback(
        (i: number) => i > 0 && !token.value[fields[i - 1].key],
        [fields, token.value],
    );

    const checkIsAutoFocus = React.useCallback((i: number) => i === 0 && autoFocus, [autoFocus]);

    const getPlaceholder = React.useCallback(
        (i: number) => {
            if (typeof placeholder === 'function') {
                return placeholder('new', token.value, i);
            }

            return i === 0 ? placeholder : undefined;
        },
        [placeholder, token],
    );

    const classNames = React.useMemo(
        () => ({
            wrapper: b('token-wrapper', {new: true}),
        }),
        [],
    );

    return React.useMemo(
        () => ({
            state: {
                token,
                fields,
                Field,
                classNames,
            },
            callbacks: {
                onChangeField,
                onFocusField,
                getPlaceholder,
                checkIsHidden,
                checkIsAutoFocus,
            },
        }),
        [
            Field,
            checkIsAutoFocus,
            checkIsHidden,
            classNames,
            fields,
            getPlaceholder,
            onChangeField,
            onFocusField,
            token,
        ],
    );
};
