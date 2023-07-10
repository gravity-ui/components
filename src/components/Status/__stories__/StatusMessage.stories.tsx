import React from 'react';

import {Meta, Story} from '@storybook/react';

import {StatusMessage, StatusMessageProps} from '../StatusMessage';

export default {
    title: 'Components/Status/StatusMessage',
    component: StatusMessage,
    argTypes: {
        text: {
            control: {type: 'text'},
        },
        type: {
            options: ['success', 'info', 'warning', 'error', 'failure', 'upload', 'inactive'],
            control: {type: 'radio'},
        },
    },
    args: {
        text: 'Warning',
        type: 'warning',
    },
} as Meta;

const DefaultTemplate: Story<StatusMessageProps> = (args) => <StatusMessage {...args} />;
export const Default = DefaultTemplate.bind({});
