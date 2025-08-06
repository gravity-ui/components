import * as React from 'react';

import {GalleryContext} from './GalleryContext';

export function useGallery(onCloseCallback?: () => void) {
    const {openGallery, closeGallery: contextClose} = React.useContext(GalleryContext);

    const closeGallery = React.useCallback(() => {
        contextClose();
        onCloseCallback?.();
    }, [contextClose]);

    return {openGallery, closeGallery};
}
