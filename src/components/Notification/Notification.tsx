import * as React from 'react';

import {Flex, Icon, Link, Text, useMobile, useUniqId} from '@gravity-ui/uikit';

import {CnMods, block} from '../utils/cn';

import {NotificationProps, NotificationSourceProps} from './definitions';
import {i18n} from './i18n';

import './Notification.scss';

const b = block('notification');

type Props = {notification: NotificationProps};

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

    const modifiers: CnMods = {
        unread,
        theme,
        mobile,
        active: Boolean(notification.onClick || notification.href),
    };
    const titleId = useUniqId();

    const sourceIcon = source && renderSourceIcon(source, titleId);

    const renderedTitle = title ? (
        <div className={b('title-wrapper')}>
            <Text as="h3" className={b('title')} color="primary">
                {title}
            </Text>
        </div>
    ) : null;

    const renderedSideActions = props.notification.sideActions ? (
        <div className={b('actions', {'side-actions': true})}>{props.notification.sideActions}</div>
    ) : null;

    const renderedBottomActions = props.notification.bottomActions ? (
        <div className={b('actions', {'bottom-actions': true})}>
            {props.notification.bottomActions}
        </div>
    ) : null;

    const renderedContent = <div className={b('content')}>{content}</div>;

    const renderedSourceText =
        source?.title || formattedDate ? (
            <Flex className={b('source-text')} gap={1}>
                {source?.title
                    ? renderSourceTitle({
                          title: source.title,
                          href: source.href,
                          id: titleId,
                      })
                    : null}
                {source?.title && formattedDate ? <span>•</span> : null}
                {formattedDate ? <time className={b('right-date')}>{formattedDate}</time> : null}
            </Flex>
        ) : null;

    const hasSourceOnTop = renderedSourceText && sourcePlacement === 'top';
    const hasSourceOnBottom = renderedSourceText && sourcePlacement === 'bottom';
    const topPart =
        renderedTitle || hasSourceOnTop
            ? renderTitleAndSource(renderedTitle, hasSourceOnTop ? renderedSourceText : null)
            : null;

    const notificationMainContent = (
        <React.Fragment>
            {topPart}
            {renderedContent}
            {hasSourceOnBottom ? (
                <div className={b('bottom-source')}>{renderedSourceText}</div>
            ) : null}
        </React.Fragment>
    );

    const notificationInnerContent = (
        <React.Fragment>
            {sourceIcon ? <div className={b('left')}>{sourceIcon}</div> : null}

            <Flex className={b('right')} direction="column" overflow="hidden" width="100%">
                <Flex
                    className={b('main-content')}
                    direction="column"
                    overflow="hidden"
                    width="100%"
                >
                    {notificationMainContent}
                </Flex>

                {renderedBottomActions}
            </Flex>
        </React.Fragment>
    );

    const hiddenUnreadLabel = unread ? (
        <span className={b('visually-hidden')}>{t('unread-label')}</span>
    ) : null;

    const commonProps = {
        className: b(modifiers, notification.className),
        onMouseEnter: notification.onMouseEnter,
        onMouseLeave: notification.onMouseLeave,
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.target instanceof Element && event.target.closest('button')) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        notification.onClick?.(event);
    };

    const interactiveContent = notification.href ? (
        <a
            {...commonProps}
            onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
            href={notification.href}
            target={notification.target ?? '_blank'}
            rel="noreferrer"
        >
            {hiddenUnreadLabel}
            {notificationInnerContent}
        </a>
    ) : (
        <div
            {...commonProps}
            role={notification.onClick ? 'button' : undefined}
            tabIndex={notification.onClick ? 0 : undefined}
            onClick={handleClick as React.MouseEventHandler<HTMLDivElement>}
            onKeyDown={
                notification.onClick
                    ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              handleClick(event as unknown as React.MouseEvent<HTMLDivElement>);
                          }
                      }
                    : undefined
            }
        >
            {hiddenUnreadLabel}
            {notificationInnerContent}
        </div>
    );

    return (
        <div className={b('layout')}>
            {interactiveContent}
            {renderedSideActions}
        </div>
    );
});

function renderTitleAndSource(title: React.ReactNode, source: React.ReactNode) {
    return title && source ? (
        <Flex className={b('title-with-source')} direction="column" overflow="hidden">
            {source}
            {title}
        </Flex>
    ) : (
        (title ?? source)
    );
}

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
