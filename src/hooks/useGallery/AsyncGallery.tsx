import * as React from 'react';

export const AsyncGallery = React.lazy(() =>
    import('../../components/Gallery/Gallery.js').then((module) => ({default: module.Gallery})),
);
