import React from 'react';

import {Button, Icon} from '@gravity-ui/uikit';
import {ArrowRotateLeft} from '@gravity-ui/icons';

import {block} from '../../../utils/cn';

import i18n from './i18n';

import './ResetFiltersButton.scss';

const b = block('reset-filters-button');

interface ResetFiltersButtonProps {
    text?: string;
    className?: string;

    onClick: () => void;
}

export function ResetFiltersButton(props: ResetFiltersButtonProps) {
    const {className, text = i18n('button.reset.text'), onClick} = props;

    return (
        <Button
            className={b(null, className)}
            size="s"
            view="flat"
            onClick={onClick}
            qa="reset-filters"
        >
            <Icon className={b('icon')} data={ArrowRotateLeft} size={12} />
            {text}
        </Button>
    );
}
