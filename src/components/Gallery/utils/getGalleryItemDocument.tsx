import {FilePreview} from '@gravity-ui/uikit';
import type {FilePreviewProps} from '@gravity-ui/uikit';

import type {GalleryItemProps} from '../GalleryItem';
import {DefaultNameBlock} from '../components/views/DefaultNameBlock/DefaultNameBlock';
import {DocumentView} from '../components/views/DocumentView/DocumentView';
import type {DocumentViewProps} from '../components/views/DocumentView/DocumentView';

export type GetDefaultGalleryItemDocumentArgs = Omit<DocumentViewProps, 'name'> & {
    file: FilePreviewProps['file'];
    mobile?: boolean;
};

export function getGalleryItemDocument({
    src,
    file,
    ...documentFileViewProps
}: GetDefaultGalleryItemDocumentArgs): GalleryItemProps {
    return {
        view: <DocumentView name={file.name} src={src} {...documentFileViewProps} />,
        thumbnail: <FilePreview view="compact" file={file} />,
        name: <DefaultNameBlock name={file.name} />,
    };
}
