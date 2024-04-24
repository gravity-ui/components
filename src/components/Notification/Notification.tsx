import React from 'react';

import {Icon, Link, useMobile, useUniqId} from '@gravity-ui/uikit';

import {CnMods, block} from '../utils/cn';

import {NotificationProps, NotificationSourceProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {notification: NotificationProps};

export const Notification = React.memo(function Notification(props: Props) {
    const mobile = useMobile();
    const {notification} = props;
    const {title, content, formattedDate, source, unread, theme} = notification;

    const modifiers: CnMods = {unread, theme, mobile, active: Boolean(notification.onClick)};
    const titleId = useUniqId();

    const sourceIcon = source && renderSourceIcon(source, titleId);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={b(modifiers, notification.className)}
            onMouseEnter={notification.onMouseEnter}
            onMouseLeave={notification.onMouseLeave}
            onClick={notification.onClick}
        >
            {sourceIcon ? <div className={b('left')}>{sourceIcon}</div> : null}
            <div className={b('right')}>
                <div className={b('right-top-part')}>
                    <div className={b('right-meta-and-title')}>
                        <div className={b('right-meta')}>
                            {source?.title
                                ? renderSourceTitle({
                                      title: source.title,
                                      href: source.href,
                                      id: titleId,
                                  })
                                : null}
                            {source?.title && formattedDate ? <span>•</span> : null}
                            {formattedDate ? (
                                <div className={b('right-date')}>{formattedDate}</div>
                            ) : null}
                        </div>
                        {title ? <div className={b('right-title')}>{title}</div> : null}
                    </div>
                    <div className={b('actions', {'right-side-actions': true})}>
                        {props.notification.sideActions}
                    </div>
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

interface RenderSourceTitleOptions {
    title: string;
    href?: string;
    id: string;
}
function renderSourceTitle({title, href, id}: RenderSourceTitleOptions): JSX.Element {
    return href ? (
        <Link className={b('right-source-title')} href={href} target="_blank" title={title} id={id}>
            {title}
        </Link>
    ) : (
        <div className={b('right-source-title')} title={title} id={id}>
            {title}
        </div>
    );
}

function renderSourceIcon(source: NotificationSourceProps, titleId: string): JSX.Element | null {
    const iconElement = getIconElement(source);

    if (!iconElement) return null;

    return source.href ? (
        <Link href={source.href} target="_blank" extraProps={{'aria-labelledby': titleId}}>
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
        return <img alt="" className={b('source-icon')} src={source.imageSrc} />;
    } else {
        return null;
    }
}
