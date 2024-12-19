import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {cnFilesGallery} from '../FilesGallery';
import {GalleryFileBase} from '../types';

export function renderActiveItemInfo<GalleryFileType extends GalleryFileBase>(
    item: GalleryFileType,
) {
    return (
        <Text
            className={cnFilesGallery('active-item-info-description-text')}
            color="primary"
            variant="subheader-1"
            ellipsis
            whiteSpace="nowrap"
        >
            {item.data.name}
        </Text>
    );
}
