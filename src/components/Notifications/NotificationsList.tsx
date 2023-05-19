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
            {props.notifications.reduce(
                (acc, notification, i) => (
                    <>
                        {acc}
                        {i > 0 ? renderSeparator() : null}
                        {renderNotification(notification, props.isMobile)}
                    </>
                ),
                <></>,
            )}
        </div>
    );
});

function renderSeparator(): JSX.Element {
    return <div className={b('separator')}></div>;
    // return <></>;
}

function renderNotification(
    notification: NotificationProps,
    isMobile: boolean | undefined,
): JSX.Element {
    return (
        <div className={b('notification-wrapper')}>
            <Notification
                notification={notification}
                isMobile={isMobile}
                key={notification.id}
            ></Notification>
        </div>
    );
}
