import * as React from 'react';

import {Spin, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {useGalleryContext} from '../../../contexts/GalleryContext';
import {useImageRotation} from '../../../hooks/useImageRotation';
import {useImageZoom} from '../../../hooks/useImageZoom';
import {GalleryFallbackText} from '../../FallbackText';

import './ImageView.scss';

const cnImageView = block('gallery-image-view');

export type ImageViewProps = {
    className?: string;
    src: string;
    alt?: string;
};

export const ImageView = ({className, src, alt = ''}: ImageViewProps) => {
    const [status, setStatus] = React.useState<'loading' | 'complete' | 'error'>('loading');
    const imageRef = React.useRef<HTMLImageElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isMobile = useMobile();
    const {onTap, onViewInteractionChange} = useGalleryContext();

    const {imageHandlers, setImageSize, setContainerSize, resetZoom, imageStyles, isZooming} =
        useImageZoom({onTap});

    const {imageRotationStyles, rotation, setContainerDims} = useImageRotation();

    React.useEffect(() => {
        onViewInteractionChange(isZooming);
    }, [isZooming, onViewInteractionChange]);

    React.useEffect(() => {
        resetZoom();
    }, [src, rotation, resetZoom]);

    const handleLoad = React.useCallback(() => {
        setStatus('complete');
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.naturalWidth,
                height: imageRef.current.naturalHeight,
            });
        }
    }, [setImageSize]);

    const handleError = React.useCallback(() => {
        setStatus('error');
    }, []);

    React.useEffect(() => {
        if (!containerRef.current) return undefined;

        const updateSize = () => {
            if (containerRef.current) {
                const size = {
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                };

                if (size.width > 0 && size.height > 0) {
                    setContainerSize(size);
                    setContainerDims(size);
                }
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        resizeObserver.observe(containerRef.current);

        updateSize();

        const timeoutId = setTimeout(updateSize, 100);

        window.addEventListener('resize', updateSize);

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateSize);
        };
    }, [setContainerSize, setContainerDims]);

    if (status === 'error') {
        return <GalleryFallbackText />;
    }

    const mergedTransform = [imageStyles.transform, imageRotationStyles.transform]
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={containerRef} className={cnImageView({mobile: isMobile}, className)}>
            {status === 'loading' && <Spin className={cnImageView('spin')} size="xl" />}
            <img
                ref={imageRef}
                className={cnImageView('image')}
                src={src}
                alt={alt}
                {...imageHandlers}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    ...imageStyles,
                    ...imageRotationStyles,
                    transform: mergedTransform || undefined,
                }}
            />
        </div>
    );
};
