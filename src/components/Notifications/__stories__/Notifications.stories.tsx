import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Notifications} from '../Notifications';
import {notificationsMockActions, mockNotifications} from './mockData';

export default {
    title: 'Components/Notifications',
    component: Notifications,
} as ComponentMeta<typeof Notifications>;

const Template: ComponentStory<typeof Notifications> = (args) => (
    <div
        style={{
            borderRadius: '8px',
            border: '1px solid var(--g-color-line-generic)',
            margin: '4px',
            width: '350px',
            height: '470px',
            overflowY: 'auto',
        }}
    >
        <Notifications {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    notifications: mockNotifications,
    actions: notificationsMockActions,
};

export const Empty = Template.bind({});
Empty.args = {
    notifications: [],
    emptyMessage: 'You have not received any notifications',
};
