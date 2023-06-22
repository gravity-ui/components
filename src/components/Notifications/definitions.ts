import {NotificationProps, NotificationActionProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    title?: React.ReactNode;
    actions?: React.ReactNode;

    notifications: NotificationProps[];

    emptyMessage?: React.ReactNode;
    swipeThreshold?: number;
};
