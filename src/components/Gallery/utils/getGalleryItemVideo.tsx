import {FilePreview} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {GalleryItemName} from '../components/GalleryItemName/GalleryItemName';
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
        name: <GalleryItemName name={name} />,
    };
}
