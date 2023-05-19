import React, {memo} from 'react';
import {block} from '../utils/cn';
import './Notifications.scss';
import {NotificationsEmptyState} from './NotificationsEmptyState';
import {NotificationsList} from './NotificationsList';
import {NotificationsProps} from './definitions';
import i18n from './i18n';

const b = block('notifications');

export const Notifications: React.FC<NotificationsProps> = memo(function Notifications(props) {
    return (
        <div className={b()}>
            <div className={b('head')}>
                <div className={b('head-title')}>{props.title ?? i18n('title')}</div>
                {props.actions ? <div className={b('actions')}>{props.actions}</div> : null}
            </div>
            <div className={b('body')}>
                {props.notifications.length > 0 ? (
                    <NotificationsList
                        notifications={props.notifications}
                        isMobile={props.isMobile}
                    />
                ) : (
                    <NotificationsEmptyState content="You have not received any notifications in selected category" />
                )}
            </div>
        </div>
    );
});
