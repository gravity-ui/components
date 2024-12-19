import React from 'react';

import {FilePreview} from '../../FilePreview';
import {cnFilesGallery} from '../FilesGallery';
import {GalleryFileBase} from '../types';

export function renderItemPreview<GalleryFileType extends GalleryFileBase>(item: GalleryFileType) {
    return (
        <FilePreview
            file={item.data}
            imageSrc={item.imageSrc}
            className={cnFilesGallery('file-preview')}
            hideName
        />
    );
}
