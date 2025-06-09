import {FilePreview, Text} from '@gravity-ui/uikit';
import type {FilePreviewProps} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {DocumentView} from '../components/views/DocumentView/DocumentView';
import type {DocumentViewProps} from '../components/views/DocumentView/DocumentView';

export type GetDefaultGalleryItemDocumentArgs = Omit<DocumentViewProps, 'name'> & {
    file: FilePreviewProps['file'];
    mobile?: boolean;
};

export function getGalleryItemDocument({
    src,
    file,
    mobile,
    ...documentFileViewProps
}: GetDefaultGalleryItemDocumentArgs): GalleryItemProps {
    return {
        view: <DocumentView name={file.name} src={src} {...documentFileViewProps} />,
        thumbnail: <FilePreview view="compact" file={file} />,
        name: (
            <Text
                color="primary"
                variant={mobile ? 'subheader-2' : 'subheader-1'}
                ellipsis
                whiteSpace="nowrap"
            >
                {file.name}
            </Text>
        ),
    };
}
