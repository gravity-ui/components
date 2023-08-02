import React from 'react';

import {Button, Icon, ButtonSize} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import {Xmark} from '@gravity-ui/icons';

import './RemoveFilterButton.scss';

const b = block('remove-filter-button');

interface RemoveFilterButtonProps {
    className?: string;

    size?: ButtonSize;
    onClick: () => void;
}

export function RemoveFilterButton({className, size = 's', onClick}: RemoveFilterButtonProps) {
    return (
        <Button
            view="flat"
            className={b(null, className)}
            size={size}
            pin="brick-round"
            onClick={onClick}
        >
            <Icon className={b('icon')} data={Xmark} size={16} />
        </Button>
    );
}
