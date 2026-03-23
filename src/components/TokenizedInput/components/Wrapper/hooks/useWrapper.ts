import * as React from 'react';

import {b} from '../../../constants';
import {useTokenizedInput} from '../../../context';
import {useApplyCallbackOnBlur} from '../../../hooks';

import {useKeyDownHandler} from './useKeyDownHandler';

export const useWrapper = () => {
    const {focusInfo, inputInfo} = useTokenizedInput();

    const {tokens, fields, isEditable, isClearable, className, wrapperRef} = inputInfo.state;
    const {onApplyChanges, onClearInput} = inputInfo.callbacks;

    const {focus} = focusInfo.state;
    const {onBlur, onFocus} = focusInfo.callbacks;

    const blurCallback = React.useCallback(() => {
        onBlur();
        onApplyChanges();
    }, [onApplyChanges, onBlur]);

    const handleBlur = useApplyCallbackOnBlur(blurCallback);
    const handleKeyDown = useKeyDownHandler();
    const handleClear = React.useCallback(() => {
        onClearInput();
        onFocus({
            idx: tokens.length,
            key: fields[0].key,
        });
    }, [fields, onClearInput, onFocus, tokens.length]);

    const classNames = React.useMemo(
        () => ({
            wrapper: b('wrapper', {disabled: !isEditable, focused: Boolean(focus)}, className),
            clearButton: b('clear-button'),
        }),
        [className, focus, isEditable],
    );

    return React.useMemo(
        () => ({
            state: {isEditable, isClearable, classNames, wrapperRef},
            callbacks: {
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                onClear: handleClear,
            },
        }),
        [classNames, handleBlur, handleClear, handleKeyDown, isClearable, isEditable, wrapperRef],
    );
};
