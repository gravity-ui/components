import * as React from 'react';

import {TextInput, TextInputProps} from '@gravity-ui/uikit';

import {useDelayedValue} from './hooks/useDelayedValue';

type DelayedTextInputProps = Required<Pick<TextInputProps, 'onUpdate' | 'value'>> &
    Omit<TextInputProps, 'onUpdate' | 'defaultValue'> & {delay?: number};

function DelayedTextInputComponent(props: DelayedTextInputProps, ref: React.Ref<HTMLInputElement>) {
    const {value, onUpdate, delay, ...textInputProps} = props;

    const {currentValue: textInputValue, delayedOnChange} = useDelayedValue(value, onUpdate, delay);

    // Without this proxy "native" input clear will synchronize value only after specified delay.
    const onChangeProxy: DelayedTextInputProps['onChange'] = (event) => {
        if (props.hasClear && event.type === 'click' && event.target.value === '') {
            textInputProps.onChange?.(event);

            onUpdate('');
        }
    };

    return (
        <TextInput
            {...textInputProps}
            ref={ref}
            onChange={onChangeProxy}
            value={textInputValue}
            onUpdate={delayedOnChange}
        />
    );
}

/***
 * Controlled input component. Property onUpdate is required in this component.
 */
export const DelayedTextInput = React.forwardRef(DelayedTextInputComponent);
