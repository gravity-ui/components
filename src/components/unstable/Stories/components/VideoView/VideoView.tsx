import {block} from '../../../utils/cn';
import type {MediaRendererProps} from '../MediaRenderer/MediaRenderer';

import './VideoView.scss';

const b = block('stories-video-view');

export interface VideoViewProps extends MediaRendererProps {}

export function VideoView({media, style}: VideoViewProps) {
    if (media.type === 'video') {
        return (
            <div className={b({style})}>
                <video
                    className={b('video')}
                    src={media.url}
                    controls={false}
                    playsInline
                    muted
                    autoPlay
                    loop
                    poster={media.posterUrl}
                    // eslint-disable-next-line react/no-unknown-property
                    webkit-playsinline="true"
                />
            </div>
        );
    }

    return null;
}
