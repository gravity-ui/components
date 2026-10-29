import * as React from 'react';

import type {GalleryItemProps} from '../../components';

export interface GalleryOpenOptions {
    onOpenChange?: (open: boolean) => void;
}

export type GalleryContextType = {
    openGallery: (
        items: GalleryItemProps[],
        initialFileIndex?: number,
        options?: GalleryOpenOptions,
    ) => void;
    closeGallery: () => void;
    open: boolean;
};

export const GalleryContext = React.createContext<GalleryContextType>({
    openGallery: () => {},
    closeGallery: () => {},
    open: false,
});
