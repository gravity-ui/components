import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react';
import {ItemSelector} from '../ItemSelector';

export default {
    title: 'Components/AdaptiveTabs',
    component: ItemSelector,
} as Meta;

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

const DefaultTemplate: Story = (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
        <ItemSelector
            {...args}
            items={items}
            value={value}
            onUpdate={(val) => setValue(val)}
            getItemId={(item) => item.name}
        />
    );
};
export const Default = DefaultTemplate.bind({});
