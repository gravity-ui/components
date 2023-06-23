import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {FC, MouseEventHandler} from 'react';

import {
    FileZipper as ArchiveIcon,
    Code as CodeIcon,
    FileQuestion as DefaultIcon,
    Picture as ImageIcon,
    MusicNote as MusicIcon,
    LogoAcrobat as PdfIcon,
    LayoutHeaderCellsLarge as TableIcon,
    TextAlignLeft as TextIcon,
    Filmstrip as VideoIcon,
} from '@gravity-ui/icons';
import {Button, Card, Icon, IconData, Text, Tooltip} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {getFileType} from './utils';

import './FilePreview.scss';

const b = block('file-preview');

export enum FileType {
    Default = 'default',
    Image = 'image',
    Video = 'video',
    Code = 'code',
    Archive = 'archive',
    Music = 'music',
    Text = 'text',
    Pdf = 'pdf',
    Table = 'table',
}

const FILE_ICON: Record<FileType, IconData> = {
    [FileType.Default]: DefaultIcon,
    [FileType.Image]: ImageIcon,
    [FileType.Video]: VideoIcon,
    [FileType.Code]: CodeIcon,
    [FileType.Archive]: ArchiveIcon,
    [FileType.Music]: MusicIcon,
    [FileType.Text]: TextIcon,
    [FileType.Pdf]: PdfIcon,
    [FileType.Table]: TableIcon,
};

export interface FilePreviewActionProps {
    icon: IconData;
    title?: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const FilePreviewAction: FC<FilePreviewActionProps> = ({icon, title, href, onClick}) => {
    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
        (e) => {
            e.stopPropagation();
            onClick?.(e);
            e.currentTarget.blur();
        },
        [onClick],
    );

    const button = (
        <Button
            className={b('actions-item')}
            onClick={handleClick}
            view="raised"
            pin="circle-circle"
            href={href}
            target="_blank"
            size="s"
        >
            <Icon data={icon} size={16} />
        </Button>
    );

    if (!title) {
        return button;
    }

    return <Tooltip content={<Text variant="caption-2">{title}</Text>}>{button}</Tooltip>;
};

export interface FilePreviewProps {
    className?: string;

    file: File;
    description?: string;

    onClick?: MouseEventHandler<HTMLDivElement>;
    actions?: FilePreviewActionProps[];
}

export const FilePreview: FC<FilePreviewProps> = ({
    className,
    file,
    description,
    onClick,
    actions,
}) => {
    const [url, setUrl] = useState<string | undefined>(undefined);
    const type = getFileType(file);

    useEffect(() => {
        let createdUrl: string;
        try {
            createdUrl = URL.createObjectURL(file);

            setUrl(createdUrl);
        } catch (err) {}

        return () => {
            if (!createdUrl) return;

            URL.revokeObjectURL(createdUrl);
        };
    }, [file]);

    const actionsList = useMemo(
        () => actions?.map((action, index) => <FilePreviewAction key={index} {...action} />),
        [actions],
    );

    const isImage = type === FileType.Image && url;

    return (
        <Card
            className={b({'with-image': isImage}, className)}
            view="clear"
            type="selection"
            onClick={onClick}
        >
            <div className={b('actions')}>{actionsList}</div>
            {isImage ? (
                <div className={b('image')}>
                    <img className={b('image-img')} src={url} alt={file.name} />
                </div>
            ) : (
                <div className={b('icon', {type})}>
                    <Icon className={b('icon-svg')} data={FILE_ICON[type]} size={20} />
                </div>
            )}
            <Tooltip content={file.name}>
                <Text className={b('name')} color="secondary" ellipsis>
                    {file.name}
                </Text>
            </Tooltip>
            {Boolean(description) && (
                <Tooltip content={description}>
                    <Text className={b('description')} color="secondary" ellipsis>
                        {description}
                    </Text>
                </Tooltip>
            )}
        </Card>
    );
};
