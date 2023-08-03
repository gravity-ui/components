import React from 'react';

import {Meta, Story} from '@storybook/react';

import {ActionsPanel, ActionsPanelProps} from '../../ActionsPanel';

import {actions, actionsGroups, actionsSubmenu, actionsWithIcons} from './actions';

export default {
    title: 'Components/ActionsPanel',
    component: ActionsPanel,
} as Meta;

const WithIconsTemplate: Story<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actionsWithIcons}
            onClose={() => console.log('onClose called')}
        />
    );
};
export const WithIcons = WithIconsTemplate.bind({});

const WithNoteTemplate: Story<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actions}
            onClose={() => console.log('onClose called')}
            renderNote={() => '10 items'}
        />
    );
};
export const WithNote = WithNoteTemplate.bind({});

const GroupsTemplate: Story<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsGroups} />;
};
export const Groups = GroupsTemplate.bind({});

const SubmenuTemplate: Story<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsSubmenu} />;
};
export const Submenu = SubmenuTemplate.bind({});
