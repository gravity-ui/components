import {ArrowDownToLine} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {GalleryItemAction} from '../GalleryItem';
import {i18n} from '../i18n';

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
        title: i18n('download'),
        icon: <Icon data={ArrowDownToLine} />,
        href: downloadUrl,
        onClick: handleClick,
    };
}
