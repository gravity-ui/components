import React from 'react';
import {Meta, Story} from '@storybook/react';

import {Platform} from '@gravity-ui/uikit';

import {StoreBadge, StoreBadgeProps} from '../StoreBadge';

export default {
    title: 'Components/StoreBadge',
    component: StoreBadge,
    args: {
        platform: Platform.ANDROID,
    },
} as Meta;

const Template: Story<StoreBadgeProps> = (args) => <StoreBadge {...args} />;

export const Default = Template.bind({});
