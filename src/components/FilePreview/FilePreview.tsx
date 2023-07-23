import React, {useEffect, useState} from 'react';
import type {FC, MouseEventHandler} from 'react';
import {block} from '../utils/cn';

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
import {Card, Icon, IconData, Text, Tooltip} from '@gravity-ui/uikit';

import {getFileType} from './utils';
import {FilePreviewAction, FilePreviewActionProps} from './FilePreviewAction';

import './FilePreview.scss';

const cn = block('file-preview');

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

export interface FilePreviewProps {
    className?: string;
    qa?: string;

    file: File;
    previewSrc?: string;
    description?: string;

    onClick?: MouseEventHandler<HTMLDivElement>;
    actions?: FilePreviewActionProps[];
}

export const FilePreview: FC<FilePreviewProps> = ({
    className,
    qa,
    file,
    previewSrc,
    description,
    onClick,
    actions,
}) => {
    const [imageSrc, setImageSrc] = useState<string | undefined>(previewSrc);
    const type = getFileType(file);

    useEffect(() => {
        if (previewSrc) return undefined;

        let createdUrl: string;
        try {
            createdUrl = URL.createObjectURL(file);

            setImageSrc(createdUrl);
        } catch (err) {}

        return () => {
            if (!createdUrl) return;

            URL.revokeObjectURL(createdUrl);
        };
    }, [file]);

    return (
        <div className={cn(null, className)} data-qa={qa}>
            <Card className={cn('card')} view="clear" type="selection" onClick={onClick}>
                {typeof imageSrc === 'string' ? (
                    <div className={cn('card-image')}>
                        <img className={cn('card-image-img')} src={imageSrc} alt={file.name} />
                    </div>
                ) : (
                    <div className={cn('card-icon', {type})}>
                        <Icon className={cn('card-icon-svg')} data={FILE_ICON[type]} size={20} />
                    </div>
                )}
                <Tooltip content={file.name}>
                    <Text className={cn('card-name')} color="secondary" ellipsis>
                        {file.name}
                    </Text>
                </Tooltip>
                {Boolean(description) && (
                    <Tooltip content={description}>
                        <Text className={cn('card-description')} color="secondary" ellipsis>
                            {description}
                        </Text>
                    </Tooltip>
                )}
            </Card>
            <div className={cn('actions')}>
                {actions?.map((action, index) => (
                    <FilePreviewAction key={index} {...action} />
                ))}
            </div>
        </div>
    );
};
