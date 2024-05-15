import React from 'react';

import {useArgs} from '@storybook/preview-api';
import {Meta, StoryFn} from '@storybook/react';

import {ItemSelector, ItemSelectorProps} from '../ItemSelector';

const items = [
    {
        name: 'id',
        type: 'Uint32',
    },
    {
        name: 'series',
        type: 'Utf8',
    },
    {
        name: 'episodes',
        type: 'Utf8',
    },
    {
        name: 'actors',
        type: 'Utf8',
    },
    {
        name: 'director',
        type: 'Utf8',
    },
    {
        name: 'music',
        type: 'Utf8',
    },
    {
        name: 'something',
        type: 'Utf8',
    },
    {
        name: 'dancing',
        type: 'Utf8',
    },
    {
        name: 'shooting',
        type: 'Utf8',
    },
];

export default {
    title: 'Components/ItemSelector',
    component: ItemSelector,
    parameters: {
        disableStrictMode: true,
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-allowed-attr',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1336
                    },
                    {
                        id: 'scrollable-region-focusable', // https://github.com/gravity-ui/uikit/issues/1549
                        enabled: false,
                    },
                ],
            },
        },
    },
    args: {
        items,
        value: [],
    },
} as Meta;

const DefaultTemplate: StoryFn<ItemSelectorProps<{name: string; type: string}>> = (args) => {
    const [, setStoryArgs] = useArgs();
    return (
        <ItemSelector
            {...args}
            onUpdate={(value) => setStoryArgs({value})}
            getItemId={(item) => item.name}
        />
    );
};
export const Default = DefaultTemplate.bind({});
