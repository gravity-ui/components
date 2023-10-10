import React from 'react';

import {Icon, Popover} from '@gravity-ui/uikit';
import type {PopoverProps, QAProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {QuestionMarkIcon} from './QuestionMarkIcon';

import './HelpPopover.scss';

const b = block('help-popover');

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
                <Icon data={QuestionMarkIcon} size={16} />
            </button>
        </Popover>
    );
}
