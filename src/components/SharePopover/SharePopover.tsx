import * as React from 'react';

import {NodesRight} from '@gravity-ui/icons';
import {Icon, Popover} from '@gravity-ui/uikit';
import type {IconData, PopoverProps, PopupPlacement} from '@gravity-ui/uikit';

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
    /** sitcher mixin */
    switcherClassName?: string;
    /** custom icon */
    customIcon?: IconData;
    /** icon title */
    buttonTitle?: string | React.ReactNode;
    /** aria-label of button */
    buttonAriaLabel?: string;
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
        buttonAriaLabel,
    } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const canWebShare =
        useWebShareApi && typeof navigator !== 'undefined' && typeof navigator.share === 'function';

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

            if (canWebShare) {
                event.preventDefault();
                await navigator.share({url, title, text});
            } else if (!autoclosable && openByHover) {
                setIsOpen((open) => !open);
            }
        },
        [onClick, text, title, url, canWebShare, autoclosable, openByHover],
    );

    const handleOpenChange: PopoverProps['onOpenChange'] = (open, _event, reason) => {
        if (!open && !autoclosable && reason === 'hover') return;
        setIsOpen(open);
    };

    const shouldOpenByHover = openByHover && !useWebShareApi;
    return (
        <Popover
            placement={placement}
            hasArrow={false}
            trigger={shouldOpenByHover ? 'all' : 'click'}
            openDelay={0}
            closeDelay={closeDelay}
            open={isOpen}
            disabled={canWebShare}
            content={content}
            className={b('tooltip', tooltipClassName)}
            disablePortal
            onOpenChange={handleOpenChange}
            modal={!shouldOpenByHover}
            initialFocus={shouldOpenByHover ? -1 : 0}
            returnFocus={!shouldOpenByHover}
        >
            <button
                type="button"
                className={b('container', [b(null, className), switcherClassName])}
                aria-label={buttonAriaLabel}
                onClick={handleClick}
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
        </Popover>
    );
};
