import React from 'react';
import {Meta, Story} from '@storybook/react';
import {useArgs} from '@storybook/client-api';
import {AdaptiveTabs, AdaptiveTabsProps} from '../AdaptiveTabs';
export default {
    title: 'Components/AdaptiveTabs',
    component: AdaptiveTabs,
    argTypes: {
        activeTab: {
            defaultValue: 'active',
        },
        size: {
            options: ['m', 'l', 'xl'],
            control: {type: 'radio'},
            defaultValue: 'm',
        },
        items: {
            defaultValue: [
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
        },
    },
} as Meta;

const Template: Story<AdaptiveTabsProps<{}>> = (args) => {
    const [{activeTab}, updateArgs] = useArgs();
    const onSelectTab = (tab: string) => updateArgs({activeTab: tab});

    return (
        <div style={{resize: 'horizontal', overflow: 'auto'}}>
            <AdaptiveTabs {...args} activeTab={activeTab} onSelectTab={onSelectTab} />
        </div>
    );
};
export const Default = Template.bind({});
