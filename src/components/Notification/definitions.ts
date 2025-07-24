import type * as React from 'react';

import {ButtonProps, IconData, QAProps} from '@gravity-ui/uikit';

export type NotificationTheme = 'success' | 'info' | 'warning' | 'danger';

type NotificationIcon = {icon: IconData} | {imageSrc: string} | {custom: React.ReactNode};

export type NotificationSourceProps = {
    title?: string;
    href?: string;
} & Partial<NotificationIcon>;

export type NotificationSourcePlacement = 'top' | 'bottom';

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
    sourcePlacement?: NotificationSourcePlacement;
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
