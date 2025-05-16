import {QAProps} from '@gravity-ui/uikit';

import {NotificationActionProps, NotificationProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    title?: React.ReactNode;
    actions?: React.ReactNode;

    renderCustomHeader?: (title: React.ReactNode) => JSX.Element;

    notifications: NotificationProps[];
    areAllNotificationsLoaded?: boolean;
    onLoadMoreNotifications?: () => Promise<void>;

    isLoading?: boolean;

    errorTitle?: React.ReactNode;
    errorContent?: React.ReactNode;
    errorImage?: React.ReactNode;

    emptyTitle?: React.ReactNode;
    emptyContent?: React.ReactNode;
    emptyImage?: React.ReactNode;

    swipeThreshold?: number;
} & QAProps;
