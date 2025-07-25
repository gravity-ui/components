import * as React from 'react';

import type {GalleryItemProps} from '../../components';

export type GalleryContextType = {
    openGallery: (items: GalleryItemProps[], initialFileIndex?: number) => void;
    closeGallery: () => void;
};

export const GalleryContext = React.createContext<GalleryContextType>({
    openGallery: () => {},
    closeGallery: () => {},
});
