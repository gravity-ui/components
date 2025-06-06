import {Meta, StoryFn} from '@storybook/react';

import {StoreBadgeNext, StoreBadgeNextProps} from '../StoreBadgeNext';

export default {
    title: 'Components/StoreBadgeNext',
    component: StoreBadgeNext,
    args: {
        store: 'playmarket',
    },
} as Meta<typeof StoreBadgeNext>;

const Template: StoryFn<StoreBadgeNextProps> = (args) => <StoreBadgeNext {...args} />;

export const Default = Template.bind({});

const WithHrefTemplate: StoryFn<StoreBadgeNextProps> = (args) => (
    <StoreBadgeNext {...args} href="https://github.com/gravity-ui/uikit" />
);

export const WithHref = WithHrefTemplate.bind({});
