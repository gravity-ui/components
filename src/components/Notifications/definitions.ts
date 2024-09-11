import {NotificationActionProps, NotificationProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    qa?: string;

    title?: React.ReactNode;
    actions?: React.ReactNode;

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
};
