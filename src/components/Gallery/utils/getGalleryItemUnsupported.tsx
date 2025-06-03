import {FilePreview, Text} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {
    UnsupportedFormatView,
    UnsupportedFormatViewProps,
} from '../components/views/UnsupportedFormatView/UnsupportedFormatView';

export function getGalleryItemUnsupported({file}: UnsupportedFormatViewProps): GalleryItemProps {
    return {
        view: <UnsupportedFormatView file={file} />,
        thumbnail: <FilePreview view="compact" file={file} />,
        name: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {file.name}
            </Text>
        ),
    };
}
