/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';

import i18n from '../../i18n';

import {FieldPopup} from './FieldPopup';
import {useField} from './useField';

export type FieldProps = Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'ref' | 'value' | 'onChange' | 'onFocus' | 'onSelect' | 'onClick' | 'focused'
> & {
    idx: number;
    fieldKey: string;
    isNew?: boolean;
    value: string;
    onChange: (idx: number, key: string, v: string) => void;
    onFocus: (idx: number, key: string) => void;
    error?: string;
    selectOnClick?: boolean;
    renderValue?: (inputState: ReturnType<typeof useField>['state']) => React.ReactNode;
};

const FieldComponent = (props: FieldProps) => {
    const fieldInfo = useField(props);

    const {inputProps} = fieldInfo;
    const {Suggestions, showSuggestions} = fieldInfo.suggestions;
    const {onBlurWrapper, onKeyDownWrapper} = fieldInfo.wrapper;
    const {
        idx,
        fieldKey,
        offset,
        selection,
        value,
        placeholder,
        hidden,
        inputElement,
        setInputElement,
        readOnly,
        classNames,
        visibleValue,
    } = fieldInfo.state;

    return (
        <div className={classNames.wrapper} onKeyDown={onKeyDownWrapper} onBlur={onBlurWrapper}>
            <span className={classNames.visibleSpan}>
                {props.renderValue?.(fieldInfo.state) || visibleValue}
            </span>
            <input
                {...inputProps}
                placeholder={placeholder}
                className={classNames.input}
                ref={setInputElement}
                value={value}
                type="text"
                autoComplete="off"
                readOnly={readOnly}
                tabIndex={hidden ? -1 : 0}
                formNoValidate
                aria-label={i18n('field_aria_label', {index: idx, key: fieldKey})}
            />
            {showSuggestions && (
                <Suggestions
                    idx={idx}
                    fieldKey={fieldKey}
                    value={value}
                    offset={offset ?? 0}
                    selection={selection}
                    inputElement={inputElement}
                />
            )}
        </div>
    );
};

type TField = typeof FieldComponent & {
    Popup: typeof FieldPopup;
};

export const Field = FieldComponent as TField;

Field.Popup = FieldPopup;
