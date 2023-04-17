import React from 'react';

import {Button, Icon, ButtonSize} from '@gravity-ui/uikit';

import {block} from 'src/components/utils/cn';

import {Xmark} from '@gravity-ui/icons';

import type {ClassNameProps} from 'src/utils/types';

import './RemoveFilterButton.scss';

const b = block('remove-filter-button');

interface RemoveFilterButtonProps extends ClassNameProps {
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
