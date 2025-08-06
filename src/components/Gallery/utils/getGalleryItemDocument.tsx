import {FilePreview} from '@gravity-ui/uikit';
import type {FilePreviewProps} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {GalleryItemName} from '../components/GalleryItemName';
import {DocumentView} from '../components/views/DocumentView/DocumentView';
import type {DocumentViewProps} from '../components/views/DocumentView/DocumentView';

import {
    type GetGalleryItemActionsProps,
    getGalleryItemFileActions,
} from './getGalleryItemFileActions';

export type GetDefaultGalleryItemDocumentArgs = Omit<DocumentViewProps, 'name'> & {
    file: FilePreviewProps['file'];
} & GetGalleryItemActionsProps;

export function getGalleryItemDocument({
    src,
    file,
    actions,
    copyLink,
    downloadLink,
    onDownloaded,
    onLinkCopied,
    ...documentFileViewProps
}: GetDefaultGalleryItemDocumentArgs): GalleryItemProps {
    return {
        view: <DocumentView name={file.name} src={src} {...documentFileViewProps} />,
        thumbnail: <FilePreview view="compact" file={file} />,
        name: <GalleryItemName name={file.name} />,
        actions: getGalleryItemFileActions({
            actions,
            copyLink,
            downloadLink,
            onDownloaded,
            onLinkCopied,
        }),
    };
}
