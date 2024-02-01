import React from 'react';

import {ActionTooltip, Button, Icon} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {NotificationActionProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {action: NotificationActionProps};

export const NotificationAction = React.memo(function NotificationAction({action}: Props) {
    const content = renderContent(action);

    const button = (
        <Button
            className={b('action', {icon: Boolean(action.icon)})}
            view={action.view ?? 'flat'}
            href={action.href}
            target={action.target}
            onClick={action.onClick}
        >
            {content}
        </Button>
    );

    return action.icon ? <ActionTooltip title={action.text}>{button}</ActionTooltip> : button;
});

function renderContent(action: NotificationActionProps): React.ReactNode {
    return action.icon ? <Icon data={action.icon} /> : action.text;
}
