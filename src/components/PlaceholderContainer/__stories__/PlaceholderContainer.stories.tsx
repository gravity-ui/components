import React from 'react';

import {Meta, Story} from '@storybook/react';

import {PlaceholderContainer} from '../PlaceholderContainer';
import {PlaceholderContainerShowcase} from './PlaceholderContainerShowcase';

export default {
    title: 'Components/PlaceholderContainer',
    component: PlaceholderContainer,
} as Meta;

const ShowcaseTemplate: Story = () => <PlaceholderContainerShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
