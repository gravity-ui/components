import React from 'react';

import {Text} from '@gravity-ui/uikit';
import {block} from 'src/components/utils/cn';

import {RemoveFilterButton} from '../RemoveFilterButton';

import type {ClassNameProps} from 'src/utils/types';

import './FieldValue.scss';

const b = block('field-value');

interface FieldValueProps extends ClassNameProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onClear: VoidFunction;

    fieldName: string;
    fieldValue?: string;
    emptyValueText?: string;

    hideFieldName?: boolean;
}

export function FieldValue(props: FieldValueProps) {
    const {onClick, onClear, fieldName, fieldValue, emptyValueText, hideFieldName, className} =
        props;

    const WrapperTag = typeof onClick === 'function' ? 'button' : 'span';

    const renderDelimiter = fieldValue || emptyValueText;

    return (
        <div className={b(null, className)}>
            <WrapperTag className={b('content', {type: WrapperTag})} onClick={onClick}>
                {hideFieldName ? null : `${fieldName}`}
                {renderDelimiter ? ': ' : null}
                {fieldValue ? (
                    <Text variant="subheader-1">{fieldValue}</Text>
                ) : (
                    <Text color="secondary">{emptyValueText}</Text>
                )}
            </WrapperTag>
            <RemoveFilterButton onClick={onClear} />
        </div>
    );
}
