import {NotificationProps, NotificationActionProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    title?: React.ReactNode;
    actions?: React.ReactNode;

    notifications: NotificationProps[];
    areAllNotificationsLoaded?: boolean;
    onLoadMoreNotifications?: () => Promise<void>;

    isLoading?: boolean;
    errorContent?: React.ReactNode;
    emptyContent?: React.ReactNode;
    swipeThreshold?: number;
};
