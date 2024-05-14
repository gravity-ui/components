import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PlaceholderContainer} from '../PlaceholderContainer';

import {PlaceholderContainerShowcase} from './PlaceholderContainerShowcase';

export default {
    title: 'Components/PlaceholderContainer',
    component: PlaceholderContainer,
} as Meta;

const ShowcaseTemplate: StoryFn = () => <PlaceholderContainerShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
