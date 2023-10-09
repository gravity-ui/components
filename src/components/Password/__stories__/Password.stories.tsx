import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Password} from '../Password';

export default {
    title: 'Components/Password',
    component: Password,
} as Meta;

const DefaultTemplate: StoryFn<React.ComponentProps<typeof Password>> = () => {
    const [value, setValue] = React.useState('');

    return <Password showCopyButton={true} onUpdate={setValue} value={value} />;
};

export const Default = DefaultTemplate.bind({});
