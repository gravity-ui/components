import * as React from 'react';

import type {GalleryItemProps} from '../../components';

export type GalleryContextType = {
    openGallery: (items: GalleryItemProps[], initialFileIndex?: number) => void;
    closeGallery: () => void;
    open: boolean;
};

export const GalleryContext = React.createContext<GalleryContextType>({
    openGallery: () => {},
    closeGallery: () => {},
    open: false,
});
