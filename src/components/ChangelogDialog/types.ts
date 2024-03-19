import React from 'react';

interface ImageData {
    src: string;
    alt?: string;
    ratio?: number;
}

export interface ChangelogItem {
    date?: string;
    isNew?: boolean;
    title: string;
    image?: ImageData;
    description?: React.ReactNode;
    storyId?: string;
    link?: string;
}
