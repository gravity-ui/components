import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {FilePreview, FilePreviewProps} from '../../FilePreview';
import {GalleryItemProps} from '../GalleryItem';
import {DocumentView, DocumentViewProps} from '../components/views/DocumentView/DocumentView';

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
        thumbnail: <FilePreview hideName file={file} />,
        meta: (
            <Text color="primary" variant="subheader-1" ellipsis whiteSpace="nowrap">
                {file.name}
            </Text>
        ),
    };
}
