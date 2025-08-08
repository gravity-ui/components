import {FilePreview} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {GalleryItemName} from '../components/GalleryItemName';
import {ImageView} from '../components/views/ImageView/ImageView';
import type {ImageViewProps} from '../components/views/ImageView/ImageView';

import {
    type GetGalleryItemActionsProps,
    getGalleryItemFileActions,
} from './getGalleryItemFileActions';

export type GetDefaultGalleryItemImageArgs = ImageViewProps & {
    name: string;
} & GetGalleryItemActionsProps;

export function getGalleryItemImage({
    src,
    name,
    actions,
    copyLink,
    downloadLink,
    onDownloaded,
    onLinkCopied,
    ...imageFileViewProps
}: GetDefaultGalleryItemImageArgs): GalleryItemProps {
    return {
        view: <ImageView src={src} {...imageFileViewProps} />,
        thumbnail: (
            <FilePreview view="compact" file={{name, type: 'image'} as File} imageSrc={src} />
        ),
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
