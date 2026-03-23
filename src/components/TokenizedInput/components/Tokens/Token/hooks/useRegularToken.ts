import * as React from 'react';

import {b} from '../../../../constants';
import {useTokenizedInput, useTokenizedInputComponents} from '../../../../context';
import {useApplyCallbackOnBlur} from '../../../../hooks';

import {useTokenCallbacks} from './useTokenCallbacks';

export const useRegularToken = (idx: number) => {
    const {inputInfo} = useTokenizedInput();
    const {Field} = useTokenizedInputComponents();

    const {tokens, isEditable, fields, placeholder} = inputInfo.state;
    const {onApplyChanges, onRemoveToken} = inputInfo.callbacks;
    const {onChangeField, onFocusField} = useTokenCallbacks();

    const token = tokens[idx];

    const hasChanges = React.useRef(false);

    const handleChangeField = React.useCallback(
        (index: number, key: string, value: string) => {
            hasChanges.current = true;
            onChangeField(index, key, value);
        },
        [onChangeField],
    );

    const blurCallback = React.useCallback(() => {
        if (hasChanges.current) {
            onApplyChanges(true);
            hasChanges.current = false;
        }
    }, [onApplyChanges]);
    const onBlur = useApplyCallbackOnBlur(blurCallback);

    const showRemoveButton = !token.options?.notRemovable;

    const onRemove = React.useCallback(() => {
        onRemoveToken(idx);
        onFocusField(idx, fields[0].key);
    }, [fields, idx, onFocusField, onRemoveToken]);

    const classNames = React.useMemo(
        () => ({
            wrapper: b('token-wrapper', {
                error: Boolean(Object.keys(token.errors ?? {}).length),
            }),
            removeButton: b('token-remove-button'),
        }),
        [token.errors],
    );

    const getPlaceholder = React.useCallback(
        (i: number) => {
            if (typeof placeholder !== 'function') {
                return undefined;
            }

            return placeholder('regular', token.value, i);
        },
        [placeholder, token],
    );

    return React.useMemo(
        () => ({
            state: {
                token,
                fields,
                showRemoveButton,
                Field,
                isEditable,
                classNames,
            },
            callbacks: {
                onChangeField: handleChangeField,
                onFocusField,
                onRemove,
                onBlur,
                getPlaceholder,
            },
        }),
        [
            Field,
            classNames,
            fields,
            handleChangeField,
            isEditable,
            onBlur,
            onFocusField,
            onRemove,
            showRemoveButton,
            token,
            getPlaceholder,
        ],
    );
};
