import React from 'react';

import {NodesRight} from '@gravity-ui/icons';
import {Icon, Popover} from '@gravity-ui/uikit';
import type {IconData, PopupPlacement} from '@gravity-ui/uikit';

import {block} from '../utils/cn';
import {getUniqId} from '../utils/getUniqId';

import {ShareList} from './ShareList/ShareList';
import type {ShareListDefaultProps, ShareListProps} from './ShareList/ShareList';
import {LayoutDirection} from './constants';

import './SharePopover.scss';

const b = block('share-popover');

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

type SharePopoverInnerProps = Omit<SharePopoverProps, keyof SharePopoverDefaultProps> &
    Required<Pick<SharePopoverProps, keyof SharePopoverDefaultProps>>;

type SharePopoverState = {
    isOpen: boolean;
};

export const sharePopoverDefaultProps: SharePopoverDefaultProps = {
    iconSize: 16,
    shareOptions: ShareList.defaultProps.shareOptions,
    withCopyLink: true,
    useWebShareApi: false,
    placement: ['bottom-end'],
    openByHover: true,
    autoclosable: true,
    closeDelay: 300,
    direction: LayoutDirection.Row,
};

export class SharePopover extends React.PureComponent<SharePopoverInnerProps, SharePopoverState> {
    static defaultProps = sharePopoverDefaultProps;
    state = {
        isOpen: false,
    };
    tooltipId: string;

    constructor(props: SharePopoverInnerProps) {
        super(props);

        this.tooltipId = getUniqId();
    }

    render() {
        const {
            url,
            title,
            text,
            shareOptions,
            withCopyLink,
            useWebShareApi,
            placement,
            openByHover,
            autoclosable,
            closeDelay,
            iconSize,
            iconClass,
            tooltipClassName,
            switcherClassName,
            className,
            direction,
            customIcon,
            buttonTitle,
            copyTitle,
            copyIcon,
            renderCopy,
            children,
        } = this.props;
        const {isOpen} = this.state;

        const content = (
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
                onClick={this.handleClick}
                tooltipId={this.tooltipId}
                disablePortal
                onOpenChange={this.onOpenChange}
            >
                {({onClick}) => (
                    <button
                        className={b('container', switcherClassName)}
                        onClick={onClick}
                        aria-expanded={openByHover ? undefined : isOpen}
                        aria-controls={this.tooltipId}
                        aria-describedby={this.tooltipId}
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
    }

    private handleClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        const {url, title, text, useWebShareApi, onClick} = this.props;

        if (onClick) {
            onClick(event);
        }

        if (useWebShareApi && navigator && typeof navigator.share === 'function') {
            await navigator.share({url, title, text});
            event.preventDefault();
            return false;
        }
        return true;
    };

    private onOpenChange = (isOpen: boolean) => {
        this.setState({isOpen});
    };
}
