import {Button, Icon, Tooltip} from '@gravity-ui/uikit';
import React, {memo} from 'react';
import {block} from '../utils/cn';
import {NotificationActionProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {action: NotificationActionProps};

export const NotificationAction: React.FC<Props> = memo(function NotificationAction({action}) {
    const content = renderContent(action);

    const button = (
        <Button
            className={b('action', action.icon ? 'icon' : 'with-text')}
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
