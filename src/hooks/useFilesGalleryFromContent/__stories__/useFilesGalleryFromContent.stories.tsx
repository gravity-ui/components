import type {Meta} from '@storybook/react';

import {UseFilesGalleryFromContentShowcase} from './UseFilesGalleryFromContentShowcase';

export default {
    title: 'Hooks/useFilesGalleryFromContent',
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

export const Showcase = UseFilesGalleryFromContentShowcase;
