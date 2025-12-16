import * as React from 'react';

import {useMobile} from '@gravity-ui/uikit';

import {useLatest} from '../useLatest';

import {MIN_SCALE} from './constants';
import type {Position, Size, ZoomActions, ZoomConstraints, ZoomState} from './types';
import {useImageZoomDesktop} from './useImageZoomDesktop';
import {useImageZoomTouch} from './useImageZoomTouch';
import {checkImageFitsContainer, createConstrainPosition} from './utils';

export type UseImageZoomProps = {
    /**
     * Disables zoom functionality
     * @default false */
    disabled?: boolean;
    /** Tap handler for mobile. Called on single tap when image is zoomed. */
    onTap?: React.TouchEventHandler;
};

export type UseImageZoomReturn = {
    /** Event handlers for `<img>` element. */
    imageHandlers: {
        onClick?: (event: React.MouseEvent) => void;
        onMouseDown?: (event: React.MouseEvent) => void;
        onTouchStart?: (event: React.TouchEvent) => void;
        onTouchMove?: (event: React.TouchEvent) => void;
        onTouchEnd?: (event: React.TouchEvent) => void;
    };
    /** Set image natural dimensions. */
    setImageSize: (size: Size) => void;
    /** Set container dimensions */
    setContainerSize: (size: Size) => void;
    /** Reset zoom to initial state */
    resetZoom: () => void;
    /** Styles for `<img>` element. */
    imageStyles: React.CSSProperties;
    /** Indicates if user is currently interacting with zoom or image is zoomed. */
    isZooming: boolean;
};

/** Hook for managing image zoom and pan functionality in Gallery */
export function useImageZoom({disabled, onTap}: UseImageZoomProps): UseImageZoomReturn {
    const isMobile = useMobile();

    const [scale, setScale] = React.useState<number>(1);
    const [position, setPosition] = React.useState<Position>({x: 0, y: 0});
    const [imageSize, setImageSize] = React.useState<Size>({width: 0, height: 0});
    const [containerSize, setContainerSize] = React.useState<Size>({width: 0, height: 0});

    const imageSizeRef = useLatest(imageSize);
    const containerSizeRef = useLatest(containerSize);

    const constrainPosition = React.useMemo(
        () => createConstrainPosition(imageSizeRef, containerSizeRef),
        [imageSizeRef, containerSizeRef],
    );

    const imageFitsContainer = React.useMemo(
        () => checkImageFitsContainer(imageSize, containerSize, scale),
        [imageSize, containerSize, scale],
    );

    const resetZoom = React.useCallback(() => {
        setScale(1);
        setPosition({x: 0, y: 0});
    }, []);

    const zoomState: ZoomState = {scale, position};
    const zoomActions: ZoomActions = {setScale, setPosition, resetZoom};
    const constraints: ZoomConstraints = {
        imageSize,
        containerSize,
        imageSizeRef,
        containerSizeRef,
        constrainPosition,
        imageFitsContainer,
    };

    const desktop = useImageZoomDesktop({
        enabled: !isMobile && !disabled,
        zoomState,
        zoomActions,
        constraints,
    });

    const touch = useImageZoomTouch({
        enabled: isMobile && !disabled,
        zoomState,
        zoomActions,
        constraints,
        onTap,
    });

    React.useEffect(() => {
        if (scale > MIN_SCALE) {
            const constrainedPosition = constrainPosition(position, scale);
            if (constrainedPosition.x !== position.x || constrainedPosition.y !== position.y) {
                setPosition(constrainedPosition);
            }
        }
    }, [imageSize, containerSize, scale, position, constrainPosition]);

    return {
        isZooming: desktop.isDragging || touch.isTouching || scale > MIN_SCALE,
        imageHandlers: isMobile ? touch.handlers : desktop.handlers,
        setImageSize,
        setContainerSize,
        resetZoom,
        imageStyles: getImageStyles(),
    };

    function getImageStyles(): React.CSSProperties {
        const isScaling = scale > MIN_SCALE;
        const isInteracting = desktop.isDragging || touch.isTouching;

        const styles: React.CSSProperties = {
            cursor: isScaling ? 'move' : 'zoom-in',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isInteracting ? 'none' : 'transform 0.3s ease-out',
        };

        // Show zoom-out cursor when zoomed but image fits in container
        if (isScaling && imageFitsContainer) styles.cursor = 'zoom-out';

        return styles;
    }
}
