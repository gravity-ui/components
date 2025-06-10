import * as React from 'react';

import {Spin} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {useZoom} from '../../../contexts/ZoomContext';
import {GalleryFallbackText} from '../../FallbackText';

import './ImageView.scss';

const cnImageView = block('gallery-image-view');

export type ImageViewProps = {
    className?: string;
    src: string;
    alt?: string;
    mobile?: boolean;
};

export const ImageView = ({className, src, alt = '', mobile}: ImageViewProps) => {
    // Get zoom data from context
    const zoomContext = useZoom();

    const scale = zoomContext?.scale ?? 1;
    const position = zoomContext?.position ?? {x: 0, y: 0};
    const onDoubleClick = zoomContext?.onDoubleClick;
    const [status, setStatus] = React.useState<'loading' | 'complete' | 'error'>('loading');

    const handleLoad = React.useCallback(() => {
        setStatus('complete');
    }, []);

    const handleError = React.useCallback(() => {
        setStatus('error');
    }, []);

    if (status === 'error') {
        return <GalleryFallbackText />;
    }

    const mobileAnimationStyle: React.CSSProperties = {
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: 'center center',
        transition: scale === 1 ? 'transform 0.3s ease-out' : 'none',
    };

    const mobileProps = mobile ? {style: mobileAnimationStyle, onDoubleClick} : {};

    return (
        <React.Fragment>
            {status === 'loading' && <Spin className={cnImageView('spin')} size="xl" />}
            <img
                className={cnImageView({mobile}, className)}
                src={src}
                alt={alt}
                onLoad={handleLoad}
                onError={handleError}
                {...mobileProps}
            />
        </React.Fragment>
    );
};
