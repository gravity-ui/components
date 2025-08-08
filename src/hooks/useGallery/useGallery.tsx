import * as React from 'react';

import {GalleryContext} from './GalleryContext';

export function useGallery() {
    return React.useContext(GalleryContext);
}
