import {NotificationProps, NotificationActionProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    title?: React.ReactNode;
    actions?: React.ReactNode;

    notifications: NotificationProps[];
    isMobile?: boolean;

    emptyMessage?: React.ReactNode;
};
