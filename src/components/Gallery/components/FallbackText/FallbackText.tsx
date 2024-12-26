import React from 'react';

import {block} from '../../../utils/cn';

import {i18n} from './i18n';

import './FallbackText.scss';

const cnFallbackText = block('files-gallery-fallback-text');

export type FallbackTextProps = React.HTMLAttributes<HTMLElement>;

export const FilesGalleryFallbackText = ({children, className, ...props}: FallbackTextProps) => (
    <div className={cnFallbackText(null, className)} {...props}>
        {children || i18n('cannot-display-file')}
    </div>
);
