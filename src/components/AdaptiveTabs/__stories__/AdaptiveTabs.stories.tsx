import React, {useState} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {AdaptiveTabs, AdaptiveTabsProps} from '../AdaptiveTabs';
export default {
    title: 'Components/AdaptiveTabs',
    component: AdaptiveTabs,
    argTypes: {
        size: {
            options: ['m', 'l', 'xl'],
            control: {type: 'radio'},
            defaultValue: 'm',
        },
    },
} as Meta;
const Template: StoryFn<{size: 'm' | 'l' | 'xl'} & AdaptiveTabs<{}>> = (args) => {
    const [activeTab, setActiveTab] = useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
            />
        </div>
    );
};
export const Default = Template.bind({});

const WrapTemplate: StoryFn<AdaptiveTabsProps<{}>> = (args) => {
    const [activeTab, setActiveTab] = useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
                wrapTo={(_, node) => {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>extra</span>
                            {node}
                        </div>
                    );
                }}
            />
        </div>
    );
};
export const Wrap = WrapTemplate.bind({});

const RenderTabTemplate: StoryFn<AdaptiveTabsProps<{}>> = (args) => {
    const [activeTab, setActiveTab] = useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
                renderTab={({title}) => {
                    return (
                        <div>
                            <span>extra</span>
                            {title}
                        </div>
                    );
                }}
            />
        </div>
    );
};
export const RenderTab = RenderTabTemplate.bind({});

const RenderTabWithOverflowTextTemplate: StoryFn<AdaptiveTabsProps<{}>> = (args) => {
    const [activeTab, setActiveTab] = useState('active');
    const items: AdaptiveTabsProps<{}>['items'] = React.useMemo(
        () => [
            {
                id: 'first',
                title: 'First Tab',
            },
            {
                id: 'active',
                title: 'Active Tab',
            },
            {
                id: 'disabled',
                title: 'Disabled With Long Text Tab',
                disabled: true,
            },
            {
                id: 'fourth',
                title: 'Fourth Long Text To Show Tab',
            },
            {
                id: 'fifth',
                title: 'One More Long Text Tab To Show',
            },
        ],
        [],
    );

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs
                {...args}
                items={items}
                onSelectTab={setActiveTab}
                activeTab={activeTab}
                renderTab={({title}) => {
                    return (
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100px',
                            }}
                        >
                            <span>extra</span>
                            {title}
                        </div>
                    );
                }}
            />
        </div>
    );
};
export const RenderTabWithOverflowText = RenderTabWithOverflowTextTemplate.bind({});
