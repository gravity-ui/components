import React from 'react';

import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {FilesGalleryFallbackText} from '../FallbackText/FallbackText';

import {i18n} from './i18n';

import './VideoFileView.scss';

const cnVideoFileView = block('video-file-view');

export type VideoFileViewProps = {
    className?: string;
    src: string;
    autoPlay?: boolean;
    controls?: boolean;
};

export const VideoFileView = ({
    className,
    src,
    autoPlay = true,
    controls = true,
}: VideoFileViewProps) => {
    const [status, setStatus] = React.useState<'loading' | 'playing' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = React.useState<string>();

    const handleLoad = React.useCallback(() => {
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
        return <FilesGalleryFallbackText>{errorMessage}</FilesGalleryFallbackText>;
    }

    return (
        <React.Fragment>
            {status === 'loading' && <Spin className={cnVideoFileView('spin')} size="xl" />}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                className={cnVideoFileView(null, className)}
                src={src}
                controls={controls}
                autoPlay={autoPlay}
                onLoadedMetadata={handleLoad}
                onError={status === 'playing' ? undefined : handleError}
            />
        </React.Fragment>
    );
};
