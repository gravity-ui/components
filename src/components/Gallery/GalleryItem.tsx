import * as React from 'react';

export type GalleryItemProps = {
    view: React.ReactNode;
    thumbnail: React.ReactNode;
    meta?: React.ReactNode;
    actions?: React.ReactNode[];
    interactive?: boolean;
};

export const GalleryItem = (_props: GalleryItemProps) => {
    return null;
};
