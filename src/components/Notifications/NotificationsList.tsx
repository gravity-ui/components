import React, {memo} from 'react';
import {Notification} from '../Notification/Notification';
import {NotificationProps} from '../Notification/definitions';
import {block} from '../utils/cn';
import './Notifications.scss';

const b = block('notifications');

type Props = {
    notifications: NotificationProps[];
    isMobile?: boolean;
};

export const NotificationsList: React.FC<Props> = memo(function NotificationsList(props) {
    return (
        <div className={b('list')}>
            {props.notifications.map((notification) =>
                renderNotification(notification, props.isMobile),
            )}
        </div>
    );
});

function renderNotification(
    notification: NotificationProps,
    isMobile: boolean | undefined,
): JSX.Element {
    return (
        <div
            className={`${b('notification-wrapper')} ${notification.unread ? 'unread' : ''}`}
            key={notification.id}
        >
            <Notification notification={notification} isMobile={isMobile}></Notification>
        </div>
    );
}
