import React from 'react';

import {CircleQuestion} from '@gravity-ui/icons';
import {Icon, Popover} from '@gravity-ui/uikit';
import type {PopoverProps, QAProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import './HelpPopover.scss';

const b = block('help-popover');
const ICON_SIZE = 16;

export interface HelpPopoverProps extends Omit<PopoverProps, 'children'>, QAProps {
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

export function HelpPopover(props: HelpPopoverProps) {
    return (
        <Popover {...props} className={b(null, props.className)}>
            <button
                ref={props.buttonRef}
                type="button"
                {...props.buttonProps}
                className={b('button', props.buttonProps?.className)}
            >
                <Icon data={CircleQuestion} size={ICON_SIZE} />
            </button>
        </Popover>
    );
}
