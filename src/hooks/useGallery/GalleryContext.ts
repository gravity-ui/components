import * as React from 'react';

import {GalleryItemProps} from '../../components';

export type GalleryContextType = {
    openGallery: (items: GalleryItemProps[], initialFileIndex?: number) => void;
};

export const GalleryContext = React.createContext<GalleryContextType>({
    openGallery: () => {},
});
