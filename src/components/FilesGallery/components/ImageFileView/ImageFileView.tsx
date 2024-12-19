import React from 'react';

import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {FilesGalleryFallbackText} from '../FallbackText/FallbackText';

import './ImageFileView.scss';

const cnImageFileView = block('image-file-view');

export type ImageFileViewProps = {
    className?: string;
    src: string;
};

export const ImageFileView = ({className, src}: ImageFileViewProps) => {
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
            {status === 'loading' && <Spin className={cnImageFileView('spin')} size="xl" />}
            <img
                className={cnImageFileView(null, className)}
                src={src}
                alt=""
                onLoad={handleLoad}
                onError={handleError}
            />
        </React.Fragment>
    );
};
