import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {FilePreview} from '../../FilePreview';
import {GalleryItemProps} from '../GalleryItem';
import {ImageView, ImageViewProps} from '../components/views/ImageView/ImageView';

export type GetDefaultGalleryItemImageArgs = ImageViewProps & {
    name: string;
};

export function getDefaultGalleryItemImage({
    src,
    name,
    ...imageFileViewProps
}: GetDefaultGalleryItemImageArgs): GalleryItemProps {
    return {
        view: <ImageView src={src} {...imageFileViewProps} />,
        thumbnail: <FilePreview hideName file={{name, type: 'image'} as File} imageSrc={src} />,
        meta: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {name}
            </Text>
        ),
    };
}
