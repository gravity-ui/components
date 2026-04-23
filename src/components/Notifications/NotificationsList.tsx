import * as React from 'react';

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
        <ul className={b('list')}>
            {props.notifications.map((notification) => (
                <li key={notification.id} className={b('item')}>
                    <NotificationWrapper
                        notification={notification}
                        swipeThreshold={props.swipeThreshold}
                        key={notification.id}
                    />
                </li>
            ))}
        </ul>
    );
});
