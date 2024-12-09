import React from 'react';

import {block} from '../../../../utils/cn';
import type {MediaRendererProps} from '../MediaRenderer/MediaRenderer';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps extends MediaRendererProps {}

export function ImageView({media, style}: ImageViewProps) {
    if (media.type === 'image') {
        return (
            <div
                className={b({style})}
                style={{
                    background: `url("${media.url2x ?? media.url}") left 0 top 0 / cover no-repeat`,
                }}
            />
        );
    }

    return null;
}
