import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {InfiniteScroll} from '../InfiniteScroll';

import {InfiniteScrollShowcase} from './InfiniteScrollShowcase';

export default {
    title: 'Components/InfiniteScroll',
    component: InfiniteScroll,
} as Meta;

export const Playground: Story = () => <InfiniteScrollShowcase />;
Playground.storyName = 'InfiniteScroll';
