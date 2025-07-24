import {ImageView, VideoView} from '../../components';
import type {StoriesItemMedia} from '../../types';
import {StoriesMediaBlockStyle} from '../../types';

export interface MediaRendererProps {
    media: StoriesItemMedia;
    style?: StoriesMediaBlockStyle;
}

export function MediaRenderer({media, style}: MediaRendererProps) {
    return (media.type || 'image') === 'image' ? (
        <ImageView media={media} style={style} />
    ) : (
        <VideoView media={media} style={style} />
    );
}
