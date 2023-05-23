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

export type NotificationProps = {
    id: string;
    content: React.ReactNode;

    title?: React.ReactNode;
    formattedDate?: React.ReactNode;
    unread?: boolean;
    source?: NotificationSourceProps;
    severity?: NotificationSeverity;
    className?: string;

    sideActions?: JSX.Element;
    bottomActions?: JSX.Element;

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
