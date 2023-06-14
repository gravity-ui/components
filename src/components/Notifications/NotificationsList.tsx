import React from 'react';
import {Notification} from '../Notification';
import {NotificationWithSwipe} from '../Notification/NotificationWithSwipe';
import {NotificationProps} from '../Notification/definitions';
import {block} from '../utils/cn';
import './Notifications.scss';
import {useMobile} from '@gravity-ui/uikit';

const b = block('notifications');

type Props = {
    notifications: NotificationProps[];
};

export const NotificationsList = React.memo(function NotificationsList(props: Props) {
    return (
        <div className={b('list')}>
            {props.notifications.map((notification) => renderNotification(notification))}
        </div>
    );
});

function renderNotification(notification: NotificationProps): JSX.Element {
    const [mobile] = useMobile();

    return (
        <div
            className={`${b('notification-wrapper')} ${notification.unread ? 'unread' : ''}`}
            key={notification.id}
        >
            {mobile && notification.swipeActions ? (
                <NotificationWithSwipe notification={notification} />
            ) : (
                <Notification notification={notification} />
            )}
        </div>
    );
}
