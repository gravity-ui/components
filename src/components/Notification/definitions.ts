import {ButtonProps} from '@gravity-ui/uikit';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';

export enum NotificationSeverity {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
}

type SvgOrImage = {icon: SVGIconData} | {imageSrc: string};

export type NotificationSourceProps = {
    title: string;
    href?: string;
} & Partial<SvgOrImage>;

export type NotificationSwipeActionProps = {
    content: React.ReactNode;
    onActivate: () => void;
};
export type NotificationSwipeActionsProps =
    | {left: NotificationSwipeActionProps}
    | {right: NotificationSwipeActionProps}
    | {left: NotificationSwipeActionProps; right: NotificationSwipeActionProps};

export type NotificationProps = {
    id: string;
    content: React.ReactNode;

    isMobile?: boolean;
    title?: React.ReactNode;
    formattedDate?: React.ReactNode;
    unread?: boolean;
    source?: NotificationSourceProps;
    severity?: NotificationSeverity;
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
    icon?: SVGIconData;
    text: string;
    onClick?: () => void;
    href?: string;
    target?: '_blank';
};