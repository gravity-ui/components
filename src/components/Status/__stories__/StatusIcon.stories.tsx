import React from 'react';

import {Meta, Story} from '@storybook/react';

import {StatusIcon, StatusIconProps} from '../StatusIcon';
import {Status} from '../types';

export default {
    title: 'Components/Status/StatusIcon',
    component: StatusIcon,
    argTypes: {
        status: {
            options: ['success', 'info', 'warning', 'error', 'failure', 'upload', 'inactive'],
            control: {type: 'radio'},
        },
    },
    args: {
        status: 'success',
    },
} as Meta;

const DefaultTemplate: Story<{status: Status} & StatusIconProps> = ({...args}) => {
    return <StatusIcon {...args} />;
};
export const Default = DefaultTemplate.bind({});
