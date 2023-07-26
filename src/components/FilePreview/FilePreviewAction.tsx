import React from 'react';
import type {FC, MouseEventHandler} from 'react';

import {Button, Icon, IconData, Text, Tooltip} from '@gravity-ui/uikit';

export interface FilePreviewActionProps {
    icon: IconData;
    title?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export const FilePreviewAction: FC<FilePreviewActionProps> = ({icon, title, href, onClick}) => {
    const button = (
        <Button
            onClick={onClick}
            view="raised"
            pin="circle-circle"
            href={href}
            target="_blank"
            size="s"
            aria-label={title || 'FilePreview action'}
        >
            <Icon data={icon} size={16} />
        </Button>
    );

    if (!title) {
        return button;
    }

    return <Tooltip content={<Text variant="caption-2">{title}</Text>}>{button}</Tooltip>;
};

FilePreviewAction.displayName = 'FilePreviewAction';
