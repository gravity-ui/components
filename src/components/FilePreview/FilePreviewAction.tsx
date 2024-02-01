import React from 'react';

import {ActionTooltip, Button, Icon, IconData} from '@gravity-ui/uikit';

export interface FilePreviewActionProps {
    id?: string;
    icon: IconData;
    title: string;
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    extraProps?:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export function FilePreviewAction({
    id,
    icon,
    title,
    href,
    disabled,
    onClick,
    extraProps,
}: FilePreviewActionProps) {
    return (
        <ActionTooltip id={id} title={title}>
            <Button
                onClick={onClick}
                view="raised"
                pin="circle-circle"
                href={href}
                disabled={disabled}
                size="s"
                extraProps={{'aria-label': title, 'aria-describedby': id, ...extraProps}}
            >
                <Icon data={icon} size={14} />
            </Button>
        </ActionTooltip>
    );
}

FilePreviewAction.displayName = 'FilePreviewAction';
