import React from 'react';

import {InfiniteScroll} from '../InfiniteScroll';
import {block} from '../utils/cn';

import {NotificationsEmptyState} from './NotificationsEmptyState';
import {NotificationsErrorState} from './NotificationsErrorState';
import {NotificationsList} from './NotificationsList';
import {NotificationsLoadingState} from './NotificationsLoadingState';
import {NotificationsProps} from './definitions';
import i18n from './i18n';

import './Notifications.scss';

const b = block('notifications');

export const Notifications = React.memo(function Notifications(props: NotificationsProps) {
    let content: JSX.Element;

    const visibleNotificationsCount = props.notifications.filter((n) => !n.archived).length;
    const hasUnloadedNotifications =
        !props.areAllNotificationsLoaded && props.onLoadMoreNotifications;

    if (props.isLoading) {
        content = <NotificationsLoadingState />;
    } else if (visibleNotificationsCount > 0 || hasUnloadedNotifications) {
        content = (
            <InfiniteScroll
                onActivate={props.onLoadMoreNotifications ?? noop}
                disabled={props.areAllNotificationsLoaded ?? true}
            >
                <NotificationsList
                    notifications={props.notifications}
                    swipeThreshold={props.swipeThreshold}
                />
            </InfiniteScroll>
        );
    } else if (props.errorContent) {
        content = <NotificationsErrorState content={props.errorContent} />;
    } else {
        content = <NotificationsEmptyState content={props.emptyContent} />;
    }

    return (
        <div className={b()}>
            <div className={b('head')}>
                <div className={b('head-title')}>{props.title || i18n('title')}</div>
                {props.actions ? <div className={b('actions')}>{props.actions}</div> : null}
            </div>
            <div className={b('body')}>{content}</div>
        </div>
    );
});

async function noop() {}
