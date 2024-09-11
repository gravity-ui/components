import {ButtonProps, IconData, QAProps} from '@gravity-ui/uikit';

export type NotificationTheme = 'success' | 'info' | 'warning' | 'danger';

type SvgOrImage = {icon: IconData} | {imageSrc: string};

export type NotificationSourceProps = {
    title?: string;
    href?: string;
} & Partial<SvgOrImage>;

export type NotificationSwipeActionProps = {
    content: React.ReactNode;
    onSwipe?: () => void;
};
export type NotificationSwipeActionsProps =
    | {left: NotificationSwipeActionProps}
    | {right: NotificationSwipeActionProps}
    | {left: NotificationSwipeActionProps; right: NotificationSwipeActionProps};

export type NotificationProps = {
    id: string;
    content: React.ReactNode;

    title?: React.ReactNode;
    formattedDate?: React.ReactNode;
    unread?: boolean;
    archived?: boolean;
    source?: NotificationSourceProps;
    theme?: NotificationTheme;
    className?: string;

    sideActions?: React.ReactNode;
    bottomActions?: React.ReactNode;
    swipeActions?: NotificationSwipeActionsProps;

    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export type NotificationActionProps = {
    view?: ButtonProps['view'];
    icon?: IconData;
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
    target?: '_blank';
} & QAProps;
