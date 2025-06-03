import {FilePreview, Text} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {UnsupportedFormatView} from '../components/views/UnsupportedFormatView/UnsupportedFormatView';

export type GetGalleryItemUnsupportedArgs = {
    name: string;
    size?: string;
    type?: string;
};

export function getGalleryItemUnsupported({
    name,
    size,
    type = 'unknown',
}: GetGalleryItemUnsupportedArgs): GalleryItemProps {
    return {
        view: <UnsupportedFormatView fileName={name} fileSize={size} />,
        thumbnail: <FilePreview view="compact" file={{name, type} as File} />,
        name: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {name}
            </Text>
        ),
    };
}
