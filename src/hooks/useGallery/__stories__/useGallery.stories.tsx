import type {Meta} from '@storybook/react';

import {UseGalleryShowcase} from './UseGalleryShowcase';

export default {
    title: 'Hooks/useGallery',
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'image-redundant-alt',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

export const Showcase = UseGalleryShowcase;
