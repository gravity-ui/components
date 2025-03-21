import * as React from 'react';

import {block} from '../../../utils/cn';

import {i18n} from './i18n';

import './FallbackText.scss';

const cnFallbackText = block('gallery-fallback-text');

export type GalleryFallbackTextProps = React.HTMLAttributes<HTMLElement>;

export const GalleryFallbackText = ({children, className, ...props}: GalleryFallbackTextProps) => (
    <div className={cnFallbackText(null, className)} {...props}>
        {children || i18n('cannot-display-file')}
    </div>
);
