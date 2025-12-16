import {ArrowDownToLine} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {GalleryItemAction} from '../GalleryItem';

export type GetGalleryItemDownloadActionArgs = {
    downloadUrl: string;
    onClick?: (event?: MouseEvent) => void;
};

export function getGalleryItemDownloadAction({
    downloadUrl,
    onClick,
}: GetGalleryItemDownloadActionArgs): GalleryItemAction {
    const handleClick = (event?: MouseEvent) => {
        event?.stopPropagation();
        onClick?.();
    };

    return {
        id: 'download',
        title: 'download',
        __titleT: ({t}) => t('download'),
        icon: <Icon data={ArrowDownToLine} />,
        href: downloadUrl,
        onClick: handleClick,
    };
}
