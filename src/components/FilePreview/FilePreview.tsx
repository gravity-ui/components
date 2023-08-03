import React, {useEffect, useId, useState} from 'react';
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
import {Card, Icon, IconData, Text, Tooltip} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {FilePreviewAction, FilePreviewActionProps} from './FilePreviewAction';
import {FileType} from './types';
import {getFileType} from './utils';

import './FilePreview.scss';

const cn = block('file-preview');

const FILE_ICON: Record<FileType, IconData> = {
    default: DefaultIcon,
    image: ImageIcon,
    video: VideoIcon,
    code: CodeIcon,
    archive: ArchiveIcon,
    music: MusicIcon,
    text: TextIcon,
    pdf: PdfIcon,
    table: TableIcon,
};

export interface FilePreviewProps {
    id?: string;

    className?: string;
    qa?: string;

    file: File;
    previewSrc?: string;
    description?: string;

    onClick?: MouseEventHandler<HTMLDivElement>;
    actions?: FilePreviewActionProps[];
}

export const FilePreview: FC<FilePreviewProps> = ({
    id: outerId,
    className,
    qa,
    file,
    previewSrc,
    description,
    onClick,
    actions,
}) => {
    const defaultId = useId();
    const id = outerId ?? defaultId;

    const [imageSrc, setImageSrc] = useState<string | undefined>(previewSrc);
    const type = getFileType(file);

    useEffect(() => {
        if (previewSrc) return undefined;

        try {
            const createdUrl = URL.createObjectURL(file);

            setImageSrc(createdUrl);

            return () => {
                URL.revokeObjectURL(createdUrl);
            };
        } catch (error: unknown) {
            return undefined;
        }
    }, [file, previewSrc]);

    return (
        <div className={cn(null, className)} data-qa={qa}>
            <Card className={cn('card')} view="clear" type="selection" onClick={onClick}>
                {typeof imageSrc === 'string' ? (
                    <div className={cn('image')}>
                        <img
                            className={cn('image-img')}
                            src={imageSrc}
                            aria-labelledby={`${id}-file-name`}
                        />
                    </div>
                ) : (
                    <div className={cn('icon', {type})}>
                        <Icon className={cn('icon-svg')} data={FILE_ICON[type]} size={20} />
                    </div>
                )}
                <Tooltip id={`${id}-file-name`} content={file.name}>
                    <Text className={cn('name')} color="secondary" ellipsis>
                        {file.name}
                    </Text>
                </Tooltip>
                {Boolean(description) && (
                    <Tooltip content={description}>
                        <Text className={cn('description')} color="secondary" ellipsis>
                            {description}
                        </Text>
                    </Tooltip>
                )}
            </Card>
            {actions?.length ? (
                <div className={cn('actions')}>
                    {actions.map((action, index) => (
                        <FilePreviewAction
                            key={`${id}-file-actions-${index}`}
                            id={`${id}-file-actions-${index}`}
                            {...action}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

FilePreview.displayName = 'FilePreview';
