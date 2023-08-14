import React, {useEffect, useState} from 'react';
import type {MouseEventHandler} from 'react';

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
import {Icon, IconData, Text, useActionHandlers, useUniqId} from '@gravity-ui/uikit';

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
    className?: string;
    qa?: string;

    file: File;
    imageSrc?: string;
    description?: string;

    onClick?: MouseEventHandler<HTMLDivElement>;
    actions?: FilePreviewActionProps[];
}

export function FilePreview({
    className,
    qa,
    file,
    imageSrc,
    description,
    onClick,
    actions,
}: FilePreviewProps) {
    const id = useUniqId();

    const [previewSrc, setPreviewSrc] = useState<string | undefined>(imageSrc);
    const type = getFileType(file);

    const {onKeyDown} = useActionHandlers(onClick);

    useEffect(() => {
        if (imageSrc) return undefined;

        try {
            const createdUrl = URL.createObjectURL(file);

            setPreviewSrc(createdUrl);

            return () => {
                URL.revokeObjectURL(createdUrl);
            };
        } catch (error: unknown) {
            return undefined;
        }
    }, [file, imageSrc]);

    return (
        <div className={cn(null, className)} data-qa={qa}>
            <div
                className={cn('card')}
                role="button"
                onKeyDown={onKeyDown}
                tabIndex={0}
                onClick={onClick}
            >
                {typeof previewSrc === 'string' ? (
                    <div className={cn('image')}>
                        <img
                            className={cn('image-img')}
                            src={previewSrc}
                            aria-labelledby={`${id}-file-name`}
                        />
                    </div>
                ) : (
                    <div className={cn('icon', {type})}>
                        <Icon className={cn('icon-svg')} data={FILE_ICON[type]} size={20} />
                    </div>
                )}
                <Text className={cn('name')} color="secondary" ellipsis title={file.name}>
                    {file.name}
                </Text>
                {Boolean(description) && (
                    <Text
                        className={cn('description')}
                        color="secondary"
                        ellipsis
                        title={description}
                    >
                        {description}
                    </Text>
                )}
            </div>
            {actions?.length ? (
                <div className={cn('actions')}>
                    {actions.map((action, index) => (
                        <FilePreviewAction
                            key={`${id}-${index}`}
                            id={`${id}-${index}`}
                            {...action}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}

FilePreview.displayName = 'FilePreview';
