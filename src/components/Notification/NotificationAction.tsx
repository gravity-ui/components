import {Button, Icon, Tooltip} from '@gravity-ui/uikit';
import React from 'react';
import {block} from '../utils/cn';
import './Notification.scss';
import {NotificationActionProps} from './definitions';

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

    return action.icon ? <Tooltip content={action.text}>{button}</Tooltip> : button;
});

function renderContent(action: NotificationActionProps): React.ReactNode {
    return action.icon ? <Icon data={action.icon} /> : action.text;
}
