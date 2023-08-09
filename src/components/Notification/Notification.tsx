import React from 'react';

import {Icon, Link, useMobile} from '@gravity-ui/uikit';

import {CnMods, block} from '../utils/cn';

import {NotificationProps, NotificationSourceProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {notification: NotificationProps};

export const Notification = React.memo(function Notification(props: Props) {
    const [mobile] = useMobile();
    const {notification} = props;
    const {title, content, formattedDate, source, unread, theme} = notification;

    const modifiers: CnMods = {unread, theme, mobile, active: Boolean(notification.onClick)};

    return (
        <div
            className={b(modifiers, notification.className)}
            onMouseEnter={notification.onMouseEnter}
            onMouseLeave={notification.onMouseLeave}
            onClick={notification.onClick}
        >
            {source ? <div className={b('left')}>{renderSourceIcon(source)}</div> : null}
            <div className={b('right')}>
                <div className={b('right-top-part')}>
                    <div className={b('right-meta-and-title')}>
                        <div className={b('right-meta')}>
                            {source?.title ? renderSourceTitle(source.title, source.href) : null}
                            {source?.title && formattedDate ? <span>•</span> : null}
                            {formattedDate ? (
                                <div className={b('right-date')}>{formattedDate}</div>
                            ) : null}
                        </div>
                        {title ? <div className={b('right-title')}>{title}</div> : null}
                    </div>
                    {props.notification.sideActions ? (
                        <div className={b('actions', {'right-side-actions': true})}>
                            {props.notification.sideActions}
                        </div>
                    ) : null}
                </div>
                <div className={b('right-content')}>{content}</div>
                {props.notification.bottomActions ? (
                    <div className={b('actions', {'right-bottom-actions': true})}>
                        {props.notification.bottomActions}
                    </div>
                ) : null}
            </div>
        </div>
    );
});

function renderSourceTitle(title: string, href: string | undefined): JSX.Element {
    return href ? (
        <Link className={b('right-source-title')} href={href} target="_blank" title={title}>
            {title}
        </Link>
    ) : (
        <div className={b('right-source-title')} title={title}>
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
