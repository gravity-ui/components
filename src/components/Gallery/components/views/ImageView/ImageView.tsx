import React from 'react';

import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {FilesGalleryFallbackText} from '../../FallbackText';

import './ImageView.scss';

const cnImageView = block('gallery-image-view');

export type ImageViewProps = {
    className?: string;
    src: string;
};

export const ImageView = ({className, src}: ImageViewProps) => {
    const [status, setStatus] = React.useState<'loading' | 'complete' | 'error'>('loading');

    const handleLoad = React.useCallback(() => {
        setStatus('complete');
    }, []);

    const handleError = React.useCallback(() => {
        setStatus('error');
    }, []);

    if (status === 'error') {
        return <FilesGalleryFallbackText />;
    }

    return (
        <React.Fragment>
            {status === 'loading' && <Spin className={cnImageView('spin')} size="xl" />}
            <img
                className={cnImageView(null, className)}
                src={src}
                alt=""
                onLoad={handleLoad}
                onError={handleError}
            />
        </React.Fragment>
    );
};
