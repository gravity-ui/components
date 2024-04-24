import React from 'react';

import {NodesRight} from '@gravity-ui/icons';
import {Icon, Popover, useUniqId} from '@gravity-ui/uikit';
import type {IconData, PopupPlacement} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {ShareList} from './ShareList/ShareList';
import type {ShareListDefaultProps, ShareListProps} from './ShareList/ShareList';
import {LayoutDirection} from './constants';

import './SharePopover.scss';

const b = block('share-popover');
const DEFAULT_ICON_SIZE = 16; // px
const DEFAULT_CLOSE_DELAY = 300; // ms
const DEFAULT_PLACEMENT = 'bottom-end';

export const sharePopoverDefaultProps: SharePopoverDefaultProps = {
    iconSize: DEFAULT_ICON_SIZE,
    shareOptions: ShareList.defaultProps.shareOptions,
    withCopyLink: true,
    useWebShareApi: false,
    placement: [DEFAULT_PLACEMENT],
    openByHover: true,
    autoclosable: true,
    closeDelay: DEFAULT_CLOSE_DELAY,
    direction: LayoutDirection.Row,
};

interface SharePopoverDefaultProps extends ShareListDefaultProps {
    /** Web Share API setting (share options can be specified for non supported api case) */
    useWebShareApi: boolean;
    /** popover opening direction */
    placement: PopupPlacement;
    /** should open popover with hover */
    openByHover: boolean;
    /** should close popover when cursor is outside */
    autoclosable: boolean;
    /** delay before popover will be hidden when cursor is otside */
    closeDelay: number;
    /** control-icon size */
    iconSize: number;
    /** elements location direction */
    direction: LayoutDirection;
}

export interface SharePopoverProps extends ShareListProps, Partial<SharePopoverDefaultProps> {
    /** icon control mixin */
    iconClass?: string;
    /** tooltip mixin */
    tooltipClassName?: string;
    /** tooltip content mixin */
    tooltipContentClassName?: string;
    /** sitcher mixin */
    switcherClassName?: string;
    /** aria-label of control */
    controlAriaLabel?: string;
    /** custom icon */
    customIcon?: IconData;
    /** icon title */
    buttonTitle?: string | React.ReactNode;
    /** custom onClick handler */
    onClick?: (event?: React.MouseEvent<HTMLSpanElement>) => void;
    /** custom copy link button title */
    copyTitle?: string | React.ReactNode;
    /** custom copy link button icon */
    copyIcon?: IconData;
    /** custom copy button render */
    renderCopy?: ({
        url,
        title,
        icon,
    }: {
        url: string | undefined;
        title: string | React.ReactNode;
        icon: IconData;
    }) => React.ReactElement;
}

export const SharePopover = (props: SharePopoverProps) => {
    const {
        url,
        title,
        text,
        shareOptions = sharePopoverDefaultProps.shareOptions,
        withCopyLink = sharePopoverDefaultProps.withCopyLink,
        useWebShareApi = sharePopoverDefaultProps.useWebShareApi,
        placement = sharePopoverDefaultProps.placement,
        openByHover = sharePopoverDefaultProps.openByHover,
        autoclosable = sharePopoverDefaultProps.autoclosable,
        closeDelay = sharePopoverDefaultProps.closeDelay,
        iconSize = sharePopoverDefaultProps.iconSize,
        iconClass,
        tooltipClassName,
        tooltipContentClassName,
        switcherClassName,
        className,
        direction = sharePopoverDefaultProps.direction,
        customIcon,
        buttonTitle,
        copyTitle,
        copyIcon,
        renderCopy,
        children,
        onClick,
        controlAriaLabel,
    } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const tooltipId = useUniqId();

    const content = React.useMemo(
        () => (
            <ShareList
                url={url}
                title={title}
                text={text}
                shareOptions={shareOptions}
                withCopyLink={withCopyLink}
                direction={direction}
                copyTitle={copyTitle}
                copyIcon={copyIcon}
                renderCopy={renderCopy}
            >
                {children}
            </ShareList>
        ),
        [
            children,
            copyIcon,
            copyTitle,
            direction,
            renderCopy,
            shareOptions,
            text,
            title,
            url,
            withCopyLink,
        ],
    );

    const handleClick = React.useCallback(
        async (event: React.MouseEvent<HTMLSpanElement>) => {
            if (onClick) {
                onClick(event);
            }

            if (useWebShareApi && navigator && typeof navigator.share === 'function') {
                await navigator.share({url, title, text});
                event.preventDefault();
                return false;
            }
            return true;
        },
        [onClick, text, title, url, useWebShareApi],
    );

    return (
        <Popover
            placement={placement}
            hasArrow={false}
            openOnHover={openByHover && !useWebShareApi}
            autoclosable={autoclosable}
            delayClosing={closeDelay}
            content={content}
            className={b(null, className)}
            tooltipClassName={b('tooltip', tooltipClassName)}
            tooltipContentClassName={b('tooltip-content', tooltipContentClassName)}
            onClick={handleClick}
            tooltipId={tooltipId}
            disablePortal
            onOpenChange={setIsOpen}
        >
            {({onClick: onClickInner}) => (
                <button
                    className={b('container', switcherClassName)}
                    aria-expanded={openByHover ? undefined : isOpen}
                    aria-controls={tooltipId}
                    aria-describedby={tooltipId}
                    aria-label={controlAriaLabel}
                    onClick={onClickInner}
                >
                    <div className={b('icon-container')}>
                        <Icon
                            data={customIcon ? customIcon : NodesRight}
                            size={iconSize}
                            className={b('icon', iconClass)}
                        />
                    </div>

                    {Boolean(buttonTitle) && <div className={b('title')}>{buttonTitle}</div>}
                </button>
            )}
        </Popover>
    );
};
