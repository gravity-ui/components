import {FilePreview, Text} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {ImageView} from '../components/views/ImageView/ImageView';
import type {ImageViewProps} from '../components/views/ImageView/ImageView';

export type GetDefaultGalleryItemImageArgs = ImageViewProps & {
    name: string;
    mobile?: boolean;
};

export function getGalleryItemImage({
    src,
    name,
    mobile,
    ...imageFileViewProps
}: GetDefaultGalleryItemImageArgs): GalleryItemProps {
    return {
        view: <ImageView src={src} {...imageFileViewProps} />,
        thumbnail: (
            <FilePreview view="compact" file={{name, type: 'image'} as File} imageSrc={src} />
        ),
        name: (
            <Text
                color="primary"
                variant={mobile ? 'subheader-2' : 'subheader-1'}
                ellipsis
                whiteSpace="nowrap"
            >
                {name}
            </Text>
        ),
    };
}
