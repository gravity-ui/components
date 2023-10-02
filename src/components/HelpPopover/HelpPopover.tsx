import React from 'react';

import {Icon, Popover} from '@gravity-ui/uikit';
import type {PopoverProps, QAProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {QuestionMarkIcon} from './QuestionMarkIcon';

import './HelpPopover.scss';

const b = block('help-popover');

/**
 * @see {@link https://github.com/microsoft/TypeScript/issues/28339}
 */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export interface AriaProps {
    buttonAriaAttributes?: React.AriaAttributes;
    buttonRole?: React.AriaRole;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}
export type HelpPopoverProps = DistributiveOmit<PopoverProps, 'children'> & QAProps & AriaProps;

export function HelpPopover(props: HelpPopoverProps) {
    return (
        <Popover {...props} className={b(null, props.className)}>
            <button
                ref={props.buttonRef}
                className={b('button')}
                {...props.buttonAriaAttributes}
                role={props.buttonRole}
            >
                <Icon data={QuestionMarkIcon} size={16} />
            </button>
        </Popover>
    );
}
