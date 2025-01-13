import type {Meta, StoryFn} from '@storybook/react';

import {InfiniteScroll} from '../InfiniteScroll';

import {InfiniteScrollShowcase} from './InfiniteScrollShowcase';

export default {
    title: 'Components/InfiniteScroll',
    component: InfiniteScroll,
} as Meta;

export const Playground: StoryFn = () => <InfiniteScrollShowcase />;
Playground.storyName = 'InfiniteScroll';
