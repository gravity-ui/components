import React from 'react';

import {Platform} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {StoreBadge, StoreBadgeProps} from '../StoreBadge';

export default {
    title: 'Components/StoreBadge',
    component: StoreBadge,
    args: {
        platform: Platform.ANDROID,
    },
} as Meta<typeof StoreBadge>;

const Template: StoryFn<StoreBadgeProps> = (args) => <StoreBadge {...args} />;

export const Default = Template.bind({});

const WithHrefTemplate: StoryFn<StoreBadgeProps> = (args) => (
    <StoreBadge {...args} href="https://github.com/gravity-ui/uikit" />
);

export const WithHref = WithHrefTemplate.bind({});
