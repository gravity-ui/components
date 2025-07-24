import * as React from 'react';

import {Flex, Icon, Link, useMobile, useUniqId} from '@gravity-ui/uikit';

import {CnMods, block} from '../utils/cn';

import {NotificationProps, NotificationSourceProps} from './definitions';

import './Notification.scss';

const b = block('notification');

type Props = {notification: NotificationProps};

export const Notification = React.memo(function Notification(props: Props) {
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

    const modifiers: CnMods = {unread, theme, mobile, active: Boolean(notification.onClick)};
    const titleId = useUniqId();

    const sourceIcon = source && renderSourceIcon(source, titleId);

    const renderedTitle = title ? (
        <div className={b('title-wrapper')}>
            <div className={b('title')}>{title}</div>
        </div>
    ) : null;

    const renderedSideActions = (
        <div className={b('actions', {'side-actions': true})}>{props.notification.sideActions}</div>
    );

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
                {formattedDate ? <div className={b('right-date')}>{formattedDate}</div> : null}
            </Flex>
        ) : null;

    const hasSourceOnTop = renderedSourceText && sourcePlacement === 'top';
    const hasSourceOnBottom = renderedSourceText && sourcePlacement === 'bottom';
    const topPart =
        renderedTitle || hasSourceOnTop
            ? withSideActions(
                  renderTitleAndSource(renderedTitle, hasSourceOnTop ? renderedSourceText : null),
                  renderedSideActions,
              )
            : null;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={b(modifiers, notification.className)}
            onMouseEnter={notification.onMouseEnter}
            onMouseLeave={notification.onMouseLeave}
            onClick={notification.onClick}
        >
            {sourceIcon ? <div className={b('left')}>{sourceIcon}</div> : null}

            <Flex className={b('right')} justifyContent="space-between" gap={2} overflow="hidden">
                <Flex direction="column" overflow="hidden" width="100%">
                    {topPart}

                    {withSideActions(
                        renderedContent,
                        !renderedTitle && !hasSourceOnTop ? renderedSideActions : null,
                    )}

                    {hasSourceOnBottom ? (
                        <div className={b('bottom-source')}>{renderedSourceText}</div>
                    ) : null}

                    {renderedBottomActions}
                </Flex>
            </Flex>
        </div>
    );
});

function withSideActions(content: React.ReactNode, sideActions: React.ReactNode) {
    return sideActions ? (
        <Flex alignItems="center" justifyContent="space-between" width="100%" overflow="hidden">
            {content}
            {sideActions}
        </Flex>
    ) : (
        content
    );
}

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
