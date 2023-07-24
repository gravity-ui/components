import React from 'react';
import {NotificationProps} from '../Notification/definitions';
import {block} from '../utils/cn';
import {NotificationWrapper} from './NotificationWrapper';
import './Notifications.scss';

const b = block('notifications');

type Props = {
    notifications: NotificationProps[];
    swipeThreshold?: number;
};

export const NotificationsList = React.memo(function NotificationsList(props: Props) {
    return (
        <div className={b('list')}>
            {props.notifications.map((notification) => (
                <NotificationWrapper
                    notification={notification}
                    swipeThreshold={props.swipeThreshold}
                    key={notification.id}
                />
            ))}
        </div>
    );
});
