import * as React from 'react';

import {KeyCode, b} from '../../constants';
import {useFocusContext, useOptionsContext, useTokenizedInputComponents} from '../../context';
import {useApplyCallbackOnBlur} from '../../hooks';

import {FieldProps} from './Field';

type UseFieldOptions = FieldProps;

export const useField = ({
    selectOnClick = false,
    idx,
    fieldKey,
    value,
    onFocus,
    onChange,
    placeholder,
    readOnly,
    isNew,
    hidden,
    error,
    autoFocus,
    ...inputProps
}: UseFieldOptions) => {
    const focusInfo = useFocusContext();
    const options = useOptionsContext();
    const {Suggestions} = useTokenizedInputComponents();

    const {focus} = focusInfo.state;

    const isFocused = focus?.key === fieldKey && focus?.idx === idx;
    const focusOffset = focus?.offset;

    const [inputElement, setInputElement] = React.useState<HTMLInputElement | null>(null);
    const [hideSuggestions, setHideSuggestions] = React.useState(autoFocus);
    const [offset, setOffset] = React.useState<number | undefined>(undefined);
    const [selection, setSelection] = React.useState<[number, number] | undefined>(undefined);

    const selectedOnClick = React.useRef(false);
    const isMouseDown = React.useRef(false);

    const visibleValue = value || placeholder || '';

    React.useEffect(() => {
        if (!hideSuggestions && isFocused && inputElement) {
            inputElement.focus();
            onFocus(idx, fieldKey);

            if (focusOffset !== undefined) {
                let correctOffset = focusOffset;

                if (focusOffset < -1) {
                    correctOffset += inputElement.value.length + 1;
                }

                inputElement?.setSelectionRange(correctOffset, correctOffset);
            }

            setOffset((prev) => prev ?? inputElement.selectionStart ?? undefined);
            setSelection([inputElement.selectionStart ?? 0, inputElement.selectionEnd ?? 0]);
        } else {
            setOffset(undefined);
            setSelection(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldKey, focusOffset, idx, isFocused, inputElement]);

    const classNames = React.useMemo(() => {
        const wrapper = b('field-wrapper', {
            empty: !value,
            focused: isFocused && !isNew,
            hidden,
            error: Boolean(error),
            hoverable: !isNew && !readOnly,
        });
        const visibleSpan = b(
            'field-visible-span',
            {
                placeholder: Boolean(!value && placeholder),
                focused: isFocused && !isNew,
            },
            inputProps.className,
        );
        const input = b('field-input', inputProps.className);

        return {wrapper, visibleSpan, input};
    }, [error, hidden, inputProps.className, isFocused, isNew, placeholder, readOnly, value]);

    const showSuggestions = Boolean(
        isFocused &&
            !hideSuggestions &&
            !readOnly &&
            offset !== undefined &&
            options.onSuggest &&
            !isMouseDown.current,
    );

    const onKeyDownWrapper = React.useCallback((e: React.KeyboardEvent) => {
        if (e.key === KeyCode.Escape) {
            setHideSuggestions((prev) => {
                if (!prev) {
                    e.stopPropagation();
                    return true;
                }
                return false;
            });
            return;
        }
        if ((e.metaKey || e.ctrlKey) && e.code === 'KeyI') {
            setHideSuggestions(false);
        }
    }, []);

    const resetField = React.useCallback(() => {
        isMouseDown.current = false;
        selectedOnClick.current = false;
        setOffset(undefined);
    }, []);

    const onBlurWrapper = useApplyCallbackOnBlur(resetField);

    const onMouseDownInput = React.useCallback(() => {
        isMouseDown.current = true;
        options.suggestionsInitialCall.setValue(true);
        setOffset(inputElement?.selectionStart ?? undefined);
    }, [inputElement?.selectionStart, options.suggestionsInitialCall]);

    const onMouseUpInput = React.useCallback(() => {
        isMouseDown.current = false;
    }, []);

    const onSelectInput = React.useCallback(
        (e: React.SyntheticEvent) => {
            if (!inputElement) {
                return;
            }

            const hasSelection = inputElement.selectionStart !== inputElement.selectionEnd;
            const shouldSelectFullText = selectOnClick && !selectedOnClick.current && !hasSelection;

            if (e.nativeEvent.type === 'mouseup' && shouldSelectFullText) {
                inputElement.setSelectionRange(0, -1);
                selectedOnClick.current = true;
            }

            setOffset(inputElement.selectionStart ?? undefined);
            setSelection([inputElement.selectionStart ?? 0, inputElement.selectionEnd ?? 0]);
        },
        [inputElement, selectOnClick],
    );

    const onClickInput = React.useCallback(() => {
        setHideSuggestions(false);
    }, []);

    const onChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(idx, fieldKey, e.target.value);
            setOffset(inputElement?.selectionStart ?? undefined);
            setHideSuggestions(false);
        },
        [fieldKey, idx, inputElement?.selectionStart, onChange],
    );

    const onFocusInput = React.useCallback(() => {
        onFocus(idx, fieldKey);
    }, [fieldKey, idx, onFocus]);

    return {
        inputProps: {
            ...inputProps,
            onSelect: onSelectInput,
            onClick: onClickInput,
            onChange: onChangeInput,
            onFocus: onFocusInput,
            onMouseDown: onMouseDownInput,
            onMouseUp: onMouseUpInput,
            autoFocus,
        } as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        wrapper: {
            onBlurWrapper,
            onKeyDownWrapper,
        },
        state: {
            idx,
            fieldKey,
            offset,
            selection,
            value,
            placeholder,
            isFocused,
            hidden,
            error,
            isNew,
            inputElement,
            setInputElement,
            readOnly,
            classNames,
            hideSuggestions,
            visibleValue,
        },
        callbacks: {
            setOffset,
            setHideSuggestions,
        },
        suggestions: {
            showSuggestions,
            Suggestions,
        },
    };
};
