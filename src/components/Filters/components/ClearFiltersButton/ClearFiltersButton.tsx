import React from 'react';

import {Button, Icon} from '@gravity-ui/uikit';
import {ArrowRotateLeft} from '@gravity-ui/icons';

import {block} from 'src/components/utils/cn';

import i18n from './i18n';

import type {ClassNameProps} from 'src/utils/types';

import './ClearFiltersButton.scss';

const b = block('clear-filters-button');

interface ClearFiltersButtonProps extends ClassNameProps {
    text?: string;

    onClick: () => void;
}

export function ClearFiltersButton(props: ClearFiltersButtonProps) {
    const {className, text = i18n('button.reset.text'), onClick} = props;

    return (
        <Button className={b(null, className)} size="s" view="flat" onClick={onClick}>
            <Icon className={b('icon')} data={ArrowRotateLeft} size={12} />
            {text}
        </Button>
    );
}
