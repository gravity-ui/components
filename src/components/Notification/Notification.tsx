import * as React from 'react';

import {Icon, Link, Text, useMobile, useUniqId} from '@gravity-ui/uikit';

import {CnMods, block} from '../utils/cn';

import {NotificationProps, NotificationSourceProps} from './definitions';
import {i18n} from './i18n';

import './Notification.scss';

const b = block('notification');

type Props = {notification: NotificationProps};

interface ClickableElementProps {
    notification: NotificationProps;
    className: string;
    children: React.ReactNode;
}

export const Notification = React.memo(function Notification(props: Props) {
    const {t} = i18n.useTranslation();
    const mobile = useMobile();
    const {notification} = props;
    const {
        title,
        content,
        formattedDate,
        source,
        unread,
        theme,
        sourcePlacement = 'bottom',
    } = notification;

    const isInteractive = Boolean(notification.onClick || notification.href);
    const titleId = useUniqId();

    const sourceIcon = source && renderSourceIcon(source, titleId);

    const renderedTitle = title ? (
        <div className={b('title-wrapper')}>
            <Text as="h3" className={b('title')} color="primary">
                {title}
            </Text>
        </div>
    ) : null;

    const hasSideActions = Boolean(notification.sideActions);
    const hasBottomActions = Boolean(notification.bottomActions);
    const hasLeft = Boolean(sourceIcon);

    const renderedSideActions = notification.sideActions ? (
        <div className={b('actions', {'side-actions': true})}>{notification.sideActions}</div>
    ) : null;

    const renderedBottomActions = notification.bottomActions ? (
        <div className={b('actions', {'bottom-actions': true})}>{notification.bottomActions}</div>
    ) : null;

    const renderedContent = (
        <div className={b('content-wrapper')}>
            <div className={b('content')}>{content}</div>
        </div>
    );

    const renderedSourceText =
        source?.title || formattedDate ? (
            <span className={b('source-text')}>
                {source?.title
                    ? renderSourceTitle({
                          title: source.title,
                          href: source.href,
                          id: titleId,
                      })
                    : null}
                {source?.title && formattedDate ? <span>•</span> : null}
                {formattedDate ? <time className={b('right-date')}>{formattedDate}</time> : null}
            </span>
        ) : null;

    const hasSourceOnTop = Boolean(renderedSourceText && sourcePlacement === 'top');
    const hasSourceOnBottom = Boolean(renderedSourceText && sourcePlacement === 'bottom');

    const layoutModifiers: CnMods = {
        unread,
        theme,
        mobile,
        active: isInteractive,
        'has-left': hasLeft,
        'has-side-actions': hasSideActions,
        'has-bottom-actions': hasBottomActions,
        'has-source-top': hasSourceOnTop,
        'has-source-bottom': hasSourceOnBottom,
    };

    const clickableContent = (
        <React.Fragment>
            {unread ? <span className={b('visually-hidden')}>{t('unread-label')}</span> : null}
            <div className={b('main-content')}>
                {renderedTitle}
                {renderedContent}
            </div>
        </React.Fragment>
    );

    const clickableClassName = b('clickable', {
        active: isInteractive,
        'has-left': hasLeft,
        'has-side-actions': hasSideActions,
        'has-bottom-actions': hasBottomActions,
        'has-source-top': hasSourceOnTop,
        'has-source-bottom': hasSourceOnBottom,
    });

    const clickableElement = renderClickableElement({
        notification,
        className: clickableClassName,
        children: clickableContent,
    });

    return (
        <div
            className={b(layoutModifiers, notification.className)}
            onMouseEnter={notification.onMouseEnter}
            onMouseLeave={notification.onMouseLeave}
        >
            {clickableElement}

            {sourceIcon ? <div className={b('left')}>{sourceIcon}</div> : null}

            {hasSourceOnTop ? <div className={b('top-source')}>{renderedSourceText}</div> : null}
            {hasSourceOnBottom ? (
                <span className={b('bottom-source')}>{renderedSourceText}</span>
            ) : null}

            {renderedSideActions}
            {renderedBottomActions}
        </div>
    );
});

interface RenderSourceTitleOptions {
    title: string;
    href?: string;
    id: string;
}

function renderSourceTitle({title, href, id}: RenderSourceTitleOptions): React.ReactNode {
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

function renderSourceIcon(source: NotificationSourceProps, titleId: string): React.ReactNode {
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

function getIconElement(source: NotificationSourceProps): React.ReactNode {
    if ('icon' in source && source.icon) {
        return <Icon className={b('source-icon')} size={36} data={source.icon} />;
    } else if ('imageSrc' in source && source.imageSrc) {
        return <img alt="" className={b('source-icon')} src={source.imageSrc} />;
    } else if ('custom' in source && source.custom) {
        return source.custom;
    } else {
        return null;
    }
}

function renderClickableElement({
    notification,
    className,
    children,
}: ClickableElementProps): React.ReactNode {
    if (notification.href) {
        return (
            <a
                className={className}
                onClick={notification.onClick as React.MouseEventHandler<HTMLAnchorElement>}
                href={notification.href}
                target={notification.target ?? '_blank'}
                rel="noreferrer"
            >
                {children}
            </a>
        );
    }

    if (notification.onClick) {
        return (
            <button
                type="button"
                className={className}
                onClick={notification.onClick as React.MouseEventHandler<HTMLButtonElement>}
            >
                {children}
            </button>
        );
    }

    return <div className={className}>{children}</div>;
}
