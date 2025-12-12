import * as React from 'react';

import {useMobile} from '@gravity-ui/uikit';

import {useLatest} from '../useLatest';

import {MIN_SCALE} from './constants';
import type {Position, Size, ZoomActions, ZoomConstraints, ZoomState} from './types';
import {useImageZoomDesktop} from './useImageZoomDesktop';
import {useImageZoomTouch} from './useImageZoomTouch';
import {checkImageFitsContainer, createConstrainPosition} from './utils';

// blank props for further options
export type UseImageZoomProps = {};

export type UseImageZoomReturn = {
    position: Position;
    imageHandlers: {
        onClick?: (event: React.MouseEvent) => void;
        onMouseDown?: (event: React.MouseEvent) => void;
        onTouchStart?: (event: React.TouchEvent) => void;
        onTouchMove?: (event: React.TouchEvent) => void;
        onTouchEnd?: (event: React.TouchEvent) => void;
    };
    setImageSize: (size: Size) => void;
    setContainerSize: (size: Size) => void;
    resetZoom: () => void;
    imageStyles: React.CSSProperties;
};

export function useImageZoom(_props: UseImageZoomProps): UseImageZoomReturn {
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
        enabled: !isMobile,
        zoomState,
        zoomActions,
        constraints,
    });

    const touch = useImageZoomTouch({
        enabled: isMobile,
        zoomState,
        zoomActions,
        constraints,
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
        position,
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
