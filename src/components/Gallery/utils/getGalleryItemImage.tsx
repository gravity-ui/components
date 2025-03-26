import {FilePreview, Text} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {ImageView} from '../components/views/ImageView/ImageView';
import type {ImageViewProps} from '../components/views/ImageView/ImageView';

export type GetDefaultGalleryItemImageArgs = ImageViewProps & {
    name: string;
};

export function getGalleryItemImage({
    src,
    name,
    ...imageFileViewProps
}: GetDefaultGalleryItemImageArgs): GalleryItemProps {
    return {
        view: <ImageView src={src} {...imageFileViewProps} />,
        thumbnail: (
            <FilePreview view="compact" file={{name, type: 'image'} as File} imageSrc={src} />
        ),
        name: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {name}
            </Text>
        ),
    };
}
