import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ActionsPanel, ActionsPanelProps} from '../';
import {PencilToSquare} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

export default {
    title: 'Components/ActionsPanel',
    component: ActionsPanel,
} as Meta;

const actions: ActionsPanelProps['actions'] = [
    {
        id: 'id1',
        renderContent: (kind) => {
            const text = 'Action 1';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
    },
    {
        id: 'id2',
        renderContent: (kind) => {
            const text = 'Action 2';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
    },
    {
        id: 'id3',
        renderContent: (kind) => {
            const text = 'Action 3';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
    },
    {
        id: 'id4',
        renderContent: (kind) => {
            const text = 'Action 4';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
        buttonProps: {
            view: 'normal-contrast',
        },
    },
    {
        id: 'id5',
        renderContent: (kind) => {
            const text = 'Action 5';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
    },
    {
        id: 'id6',
        renderContent: (kind) => {
            const text = 'Action 6';
            return kind === 'button' ? [<Icon key="icon" data={PencilToSquare} />, text] : text;
        },
        handler: () => {},
    },
];

const DefaultTemplate: Story<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actions}
            onClose={() => {}}
            renderNote={() => '10 items'}
        />
    );
};

export const Default = DefaultTemplate.bind({});
