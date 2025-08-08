import {FilePreview} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {GalleryItemName} from '../components/GalleryItemName';
import {VideoView} from '../components/views/VideoView/VideoView';
import type {VideoViewProps} from '../components/views/VideoView/VideoView';

import {
    type GetGalleryItemActionsProps,
    getGalleryItemFileActions,
} from './getGalleryItemFileActions';

export type GetDefaultGalleryItemVideoArgs = VideoViewProps & {
    name: string;
} & GetGalleryItemActionsProps;

export function getGalleryItemVideo({
    name,
    src,
    actions,
    copyLink,
    downloadLink,
    onDownloaded,
    onLinkCopied,
    ...videoFileViewProps
}: GetDefaultGalleryItemVideoArgs): GalleryItemProps {
    return {
        view: <VideoView src={src} {...videoFileViewProps} />,
        thumbnail: <FilePreview view="compact" file={{name, type: 'video'} as File} />,
        name: <GalleryItemName name={name} />,
        actions: getGalleryItemFileActions({
            actions,
            copyLink,
            downloadLink,
            onDownloaded,
            onLinkCopied,
        }),
    };
}
