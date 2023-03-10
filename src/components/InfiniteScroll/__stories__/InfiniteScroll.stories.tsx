import React from 'react';
import {InfiniteScroll} from '../InfiniteScroll';
import {InfiniteScrollShowcase} from './InfiniteScrollShowcase';
import type {Meta, Story} from '@storybook/react';

export default {
    title: 'Components/InfiniteScroll',
    component: InfiniteScroll,
} as Meta;

export const Playground: Story = () => <InfiniteScrollShowcase />;
Playground.storyName = 'InfiniteScroll';
