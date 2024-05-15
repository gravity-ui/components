import React from 'react';

import {ActionTooltip, Button, Icon, useUniqId} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {NotificationActionProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {action: NotificationActionProps};

export const NotificationAction = React.memo(function NotificationAction({action}: Props) {
    const content = renderContent(action);
    const tooltipId = useUniqId();

    const button = (
        <Button
            className={b('action', {icon: Boolean(action.icon)})}
            view={action.view ?? 'flat'}
            href={action.href}
            target={action.target}
            onClick={action.onClick}
            extraProps={{
                'aria-labelledby': action.icon ? tooltipId : undefined,
            }}
        >
            {content}
        </Button>
    );

    return action.icon ? (
        <ActionTooltip title={action.text} id={tooltipId}>
            {button}
        </ActionTooltip>
    ) : (
        button
    );
});

function renderContent(action: NotificationActionProps): React.ReactNode {
    return action.icon ? <Icon data={action.icon} /> : action.text;
}
