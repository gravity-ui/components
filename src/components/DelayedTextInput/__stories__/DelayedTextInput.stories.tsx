import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {DelayedTextInput} from '../DelayedTextInput';

export default {
    title: 'Components/DelayedTextInput',
    component: DelayedTextInput,
    args: {
        controlProps: {
            'aria-label': 'Search',
        },
    },
} as Meta<typeof DelayedTextInput>;

const DefaultTemplate: StoryFn<React.ComponentProps<typeof DelayedTextInput>> = (
    props: React.ComponentProps<typeof DelayedTextInput>,
) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    return (
        <React.Fragment>
            <DelayedTextInput {...props} value={searchTerm} onUpdate={setSearchTerm} />
            Search term: {searchTerm}
        </React.Fragment>
    );
};

export const Default = DefaultTemplate.bind({});

Default.args = {
    delay: 200,
};
