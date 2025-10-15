import * as React from 'react';

import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {GalleryFallbackText} from '../../FallbackText';

import {i18n} from './i18n';

import './VideoView.scss';

const cnVideoView = block('gallery-video-view');

export type VideoViewProps = {
    className?: string;
    src: string;
    autoPlay?: boolean;
    controls?: boolean;
};

export const VideoView = ({className, src, autoPlay = true, controls = true}: VideoViewProps) => {
    const [status, setStatus] = React.useState<'loading' | 'playing' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = React.useState<string>();

    const handleCanPlay = React.useCallback(() => {
        setStatus('playing');
    }, []);

    const handleError = React.useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
        setStatus('error');

        const error = (event.target as HTMLVideoElement).error;

        setErrorMessage(
            error?.MEDIA_ERR_SRC_NOT_SUPPORTED ? i18n('not-supported-video') : i18n('video-error'),
        );
    }, []);

    if (status === 'error') {
        return <GalleryFallbackText>{errorMessage}</GalleryFallbackText>;
    }

    return (
        <React.Fragment>
            {status === 'loading' && <Spin className={cnVideoView('spin')} size="xl" />}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                className={cnVideoView(null, className)}
                src={src}
                controls={status === 'loading' ? false : controls}
                autoPlay={autoPlay}
                onCanPlay={handleCanPlay}
                onError={status === 'playing' ? undefined : handleError}
            />
        </React.Fragment>
    );
};
