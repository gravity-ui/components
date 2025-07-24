import {block} from '../../../utils/cn';
import type {MediaRendererProps} from '../MediaRenderer/MediaRenderer';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps extends MediaRendererProps {}

export function ImageView({media, style}: ImageViewProps) {
    if (media.type === 'image') {
        return (
            <div
                className={b({style}, b('image'))}
                style={{
                    backgroundImage: `url("${media.url2x ?? media.url}")`,
                }}
            />
        );
    }

    return null;
}
