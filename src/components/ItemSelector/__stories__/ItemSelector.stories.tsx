import * as React from 'react';

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
        },
    },
    args: {
        items,
        value: [],
    },
} as Meta;

type Item = {name: string; type: string};

// `useArgs` updates asynchronously, and the List needs the new order in the drop render
function ItemSelectorWithState({onUpdate, ...props}: Omit<ItemSelectorProps<Item>, 'getItemId'>) {
    const [value, setValue] = React.useState(props.value);
    React.useEffect(() => setValue(props.value), [props.value]);
    return (
        <ItemSelector
            {...props}
            value={value}
            onUpdate={(nextValue) => {
                setValue(nextValue);
                onUpdate(nextValue);
            }}
            getItemId={(item) => item.name}
        />
    );
}

const DefaultTemplate: StoryFn<ItemSelectorProps<Item>> = (args) => {
    const [, setStoryArgs] = useArgs();
    return <ItemSelectorWithState {...args} onUpdate={(value) => setStoryArgs({value})} />;
};
export const Default = DefaultTemplate.bind({});
