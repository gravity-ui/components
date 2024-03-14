import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UseDialogDemo} from './UseDialogDemo';

export default {
    title: 'Hooks/useDialog',
} as Meta;

export const Showcase: StoryFn = () => <UseDialogDemo />;
