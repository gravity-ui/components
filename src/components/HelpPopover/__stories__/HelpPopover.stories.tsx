import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {cn} from '../../utils/cn';
import {HelpPopover} from '../HelpPopover';
import type {HelpPopoverProps} from '../HelpPopover';

import './HelpPopoverShowcase.scss';

const b = cn('help-popover-showcase');

export default {
    title: 'Components/HelpPopover',
    component: HelpPopover,
    args: {
        buttonProps: {
            'aria-label': 'Note',
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                        // aria-labelledby id is valid after tooltip content is rendered
                        selector: 'button[aria-labelledby="helpPopoverWithoutActionsId"]',
                    },
                ],
            },
        },
    },
} as Meta<typeof HelpPopover>;

const DefaultTemplate: StoryFn<HelpPopoverProps> = (args) => <HelpPopover {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Some content',
};

export const Accessible: StoryFn = (args) => {
    const helpPopoverWithoutActionsId = 'helpPopoverWithoutActionsId';
    const helpPopoverWithActionsId = 'helpPopoverWithActionsId';
    const [openPopover, setOpenPopover] = React.useState(false);
    const ref = React.useRef<HTMLButtonElement>(null);
    return (
        <div>
            <div className={b('container')}>
                <span className={b('container-title')}>Without actions: </span>
                <HelpPopover
                    {...args}
                    content={'Some content'}
                    tooltipId={helpPopoverWithoutActionsId}
                    aria-hidden={true}
                    buttonProps={{
                        'aria-labelledby': helpPopoverWithoutActionsId,
                    }}
                />
            </div>
            <div className={b('container')}>
                <span className={b('container-title')}>With actions: </span>
                <HelpPopover
                    {...args}
                    tooltipId={helpPopoverWithActionsId}
                    content={<a href="https://ya.ru">Some link</a>}
                    openOnHover={false}
                    onOpenChange={setOpenPopover}
                    focusTrap
                    autoFocus
                    restoreFocusRef={ref}
                    buttonProps={{
                        'aria-expanded': openPopover,
                        'aria-controls': helpPopoverWithActionsId,
                        'aria-label': 'More info',
                    }}
                    buttonRef={ref}
                />
            </div>
        </div>
    );
};
