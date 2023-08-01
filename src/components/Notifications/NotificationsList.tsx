import React from 'react';

import {useMobile} from '@gravity-ui/uikit';

import {Notification} from '../Notification';
import {NotificationWithSwipe} from '../Notification/NotificationWithSwipe';
import {NotificationProps} from '../Notification/definitions';
import {block} from '../utils/cn';

import './Notifications.scss';

const b = block('notifications');

type Props = {
    notifications: NotificationProps[];
    swipeThreshold?: number;
};

export const NotificationsList = React.memo(function NotificationsList({
    notifications,
    swipeThreshold,
}: Props) {
    const [mobile] = useMobile();

    return (
        <div className={b('list')}>
            {notifications.map((notification) => (
                <div
                    className={`${b('notification-wrapper')} ${
                        notification.unread ? 'unread' : ''
                    }`}
                    key={notification.id}
                >
                    {mobile && notification.swipeActions ? (
                        <NotificationWithSwipe
                            notification={notification}
                            swipeThreshold={swipeThreshold}
                        />
                    ) : (
                        <Notification notification={notification} />
                    )}
                </div>
            ))}
        </div>
    );
});
