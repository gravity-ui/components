import * as React from 'react';

export const AsyncGallery = React.lazy(() =>
    import('../../components/Gallery/Gallery').then((module) => ({default: module.Gallery})),
);
