import React, {FC} from 'react';

import {block} from '../utils/cn';

import {FormRowFieldDescription} from './FormRowFieldDescription';
import i18n from './i18n';
import {FormRowProps} from './types';

import './FormRow.scss';

const b = block('form-row');

const FormRowComponent: FC<FormRowProps> = ({
    className,
    label,
    labelHelpPopover,
    fieldId,
    required = false,
    children,
}) => {
    const LabelComponent = fieldId ? 'label' : 'span';

    return (
        <div className={b(null, className)}>
            <div className={b('left')}>
                <LabelComponent className={b('field-name')} htmlFor={fieldId ? fieldId : undefined}>
                    <span className={b('field-name-text')}>{label}</span>

                    {required ? (
                        <>
                            &nbsp;
                            <sup
                                className={b('required-mark')}
                                aria-label={i18n('label_required-field')}
                            >
                                *
                            </sup>
                        </>
                    ) : null}

                    {labelHelpPopover ? (
                        <>
                            &nbsp;
                            <span className={b('help-popover')}>{labelHelpPopover}</span>
                        </>
                    ) : null}
                </LabelComponent>
            </div>
            <div className={b('right')}>{children}</div>
        </div>
    );
};

FormRowComponent.displayName = 'FormRow';

export const FormRow = Object.assign(FormRowComponent, {FieldDescription: FormRowFieldDescription});
