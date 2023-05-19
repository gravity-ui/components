import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Notifications} from '../Notifications';
import {notificationsMockActions, mockNotifications} from './mockData';

export default {
    title: 'Components/Notifications',
    component: Notifications,
} as ComponentMeta<typeof Notifications>;

const Template: ComponentStory<typeof Notifications> = (args) => <Notifications {...args} />;

export const Default = Template.bind({});
Default.args = {
    notifications: mockNotifications,
    actions: notificationsMockActions,
};

export const Empty = Template.bind({});
Empty.args = {
    notifications: [],
};
