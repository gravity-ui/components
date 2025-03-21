import {FilePreview, Text} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {VideoView} from '../components/views/VideoView/VideoView';
import type {VideoViewProps} from '../components/views/VideoView/VideoView';

export type GetDefaultGalleryItemVideoArgs = VideoViewProps & {
    name: string;
};

export function getGalleryItemVideo({
    name,
    src,
    ...videoFileViewProps
}: GetDefaultGalleryItemVideoArgs): GalleryItemProps {
    return {
        view: <VideoView src={src} {...videoFileViewProps} />,
        thumbnail: <FilePreview view="compact" file={{name, type: 'video'} as File} />,
        name: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {name}
            </Text>
        ),
    };
}
