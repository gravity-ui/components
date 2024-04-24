import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {SharePopover, sharePopoverDefaultProps} from '../SharePopover';

import {SharePopoverDemo} from './Showcase';

export default {
    title: 'Components/SharePopover',
    component: SharePopover,
    argTypes: {
        title: {
            description: 'Link title',
        },
        text: {
            description: 'link text',
        },
    },
    args: {
        ...sharePopoverDefaultProps,
        controlAriaLabel: 'Share',
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-valid-attr-value',
                        enabled: false,
                        // the id in aria-controls will resolve on hover
                        selector: '.gc-share-popover__container[aria-controls]',
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof SharePopover>;

const DefaultTemplate: StoryFn<typeof SharePopover> = (args) => <SharePopover {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn<typeof SharePopover & typeof SharePopoverDemo> = () => (
    <SharePopoverDemo />
);
export const Showcase = ShowcaseTemplate.bind({});
