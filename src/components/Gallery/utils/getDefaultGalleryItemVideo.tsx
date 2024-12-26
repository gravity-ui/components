import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {FilePreview} from '../../FilePreview';
import {GalleryItemProps} from '../GalleryItem';
import {VideoView, VideoViewProps} from '../components/views/VideoView/VideoView';

export type GetDefaultGalleryItemVideoArgs = VideoViewProps & {
    name: string;
};

export function getDefaultGalleryItemVideo({
    name,
    src,
    ...videoFileViewProps
}: GetDefaultGalleryItemVideoArgs): GalleryItemProps {
    return {
        view: <VideoView src={src} {...videoFileViewProps} />,
        thumbnail: <FilePreview hideName file={{name, type: 'video'} as File} />,
        meta: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {name}
            </Text>
        ),
    };
}
