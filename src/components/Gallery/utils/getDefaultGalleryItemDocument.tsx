import {FilePreview, Text} from '@gravity-ui/uikit';
import type {FilePreviewProps} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {DocumentView} from '../components/views/DocumentView/DocumentView';
import type {DocumentViewProps} from '../components/views/DocumentView/DocumentView';

export type GetDefaultGalleryItemDocumentArgs = Omit<DocumentViewProps, 'name'> & {
    file: FilePreviewProps['file'];
};

export function getDefaultGalleryItemDocument({
    src,
    file,
    ...documentFileViewProps
}: GetDefaultGalleryItemDocumentArgs): GalleryItemProps {
    return {
        view: <DocumentView name={file.name} src={src} {...documentFileViewProps} />,
        thumbnail: <FilePreview file={file} />,
        meta: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {file.name}
            </Text>
        ),
    };
}
