import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ActionsPanel, ActionsPanelProps} from '../../ActionsPanel';
import {actions, actionsWithIcons, actionsGroups, actionsSubmenu} from './actions';

export default {
    title: 'Components/ActionsPanel',
    component: ActionsPanel,
} as Meta;

const DefaultTemplate: Story<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actions}
            onClose={() => console.log('onClose called')}
            renderNote={() => '10 items'}
        />
    );
};
export const Default = DefaultTemplate.bind({});

const WithIconsTemplate: Story<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsWithIcons} />;
};
export const WithIcons = WithIconsTemplate.bind({});

const GroupsTemplate: Story<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsGroups} />;
};
export const Groups = GroupsTemplate.bind({});

const SubmenuTemplate: Story<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsSubmenu} />;
};
export const Submenu = SubmenuTemplate.bind({});
