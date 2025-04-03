import * as React from 'react';

export const GalleryWithTheme = React.lazy(() =>
    import('./GalleryWithTheme').then((module) => ({default: module.GalleryWithTheme})),
);
