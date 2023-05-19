import {Icon, Link} from '@gravity-ui/uikit';
import React, {memo} from 'react';
import {block} from '../utils/cn';
import './Notification.scss';
import {NotificationProps, NotificationSourceProps} from './definitions';

const b = block('notification');

type Props = {notification: NotificationProps; isMobile?: boolean};

export const Notification: React.FC<Props> = memo(function Notification(props) {
    const {isMobile, notification} = props;
    const {title, content, formattedDate, source, unread, severity} = notification;

    const className: Record<string, boolean | undefined> = {unread, mobile: isMobile};
    if (severity) className[severity] = true;

    return (
        <div
            className={`${b(className)}`}
            onMouseEnter={notification.onMouseEnter}
            onMouseLeave={notification.onMouseLeave}
        >
            {source ? <div className={b('left')}>{renderSourceIcon(source)}</div> : null}
            <div className={b('right')}>
                <div className={b('top-part')}>
                    <div className={b('meta-and-title')}>
                        <div className={b('meta')}>
                            {source?.title ? renderSourceTitle(source.title, source.href) : null}
                            {source?.title && formattedDate ? <span>•</span> : null}
                            {formattedDate ? (
                                <div className={b('date')}>{formattedDate}</div>
                            ) : null}
                        </div>
                        {title ? <div className={b('title')}>{title}</div> : null}
                    </div>
                    {props.notification.sideActions ? (
                        <div className={b('actions', 'side-actions')}>
                            {props.notification.sideActions}
                        </div>
                    ) : null}
                </div>
                <div className={b('content')}>{content}</div>
                {props.notification.bottomActions ? (
                    <div className={b('actions', 'bottom-actions')}>
                        {props.notification.bottomActions}
                    </div>
                ) : null}
            </div>
        </div>
    );
});

function renderSourceTitle(title: string, href: string | undefined): JSX.Element {
    return href ? (
        <Link className={b('source-title')} href={href} target="_blank" title={title}>
            {title}
        </Link>
    ) : (
        <div className={b('source-title')} title={title}>
            {title}
        </div>
    );
}

function renderSourceIcon(source: NotificationSourceProps): JSX.Element | null {
    const iconElement = getIconElement(source);

    if (!iconElement) return null;

    return source.href ? (
        <Link href={source.href} target="_blank">
            {iconElement}
        </Link>
    ) : (
        iconElement
    );
}

function getIconElement(source: NotificationSourceProps): JSX.Element | null {
    if ('icon' in source && source.icon) {
        return <Icon className={b('source-icon')} size={36} data={source.icon} />;
    } else if ('imageSrc' in source && source.imageSrc) {
        return <img className={b('source-icon')} src={source.imageSrc} />;
    } else {
        return null;
    }
}
