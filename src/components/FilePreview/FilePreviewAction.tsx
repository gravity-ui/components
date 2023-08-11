import React from 'react';
import type {MouseEventHandler} from 'react';

import {Button, Icon, IconData, Text, Tooltip} from '@gravity-ui/uikit';

export interface FilePreviewActionProps {
    id?: string;
    icon: IconData;
    title: string;
    label?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export function FilePreviewAction({id, icon, title, label, href, onClick}: FilePreviewActionProps) {
    return (
        <Tooltip id={id} content={<Text variant="caption-2">{title}</Text>}>
            <Button
                onClick={onClick}
                view="raised"
                pin="circle-circle"
                href={href}
                target="_blank"
                size="s"
                extraProps={{
                    'aria-label': label ?? title,
                    'aria-describedby': label ? undefined : id,
                }}
            >
                <Icon data={icon} size={14} />
            </Button>
        </Tooltip>
    );
}

FilePreviewAction.displayName = 'FilePreviewAction';
