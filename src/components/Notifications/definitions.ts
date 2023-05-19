import {NotificationProps, NotificationActionProps} from '../Notification/definitions';

export type NotificationsActionProps = NotificationActionProps;

export type NotificationsProps = {
    title?: string;
    notifications: NotificationProps[];
    actions?: React.ReactNode;
    isMobile?: boolean;
};
