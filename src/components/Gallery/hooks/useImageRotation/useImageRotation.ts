import * as React from 'react';

import {useGalleryImageRotationContext} from '../../contexts/GalleryImageRotationContext';

import {FULL_ROTATION, ROTATION_STEP} from './constants';

export type UseImageRotationReturn = {
    /**
     * Styles for the `<img>` element: the `rotate` transform part plus
     * swapped max-width/max-height constraints for 90°/270° rotations.
     */
    imageRotationStyles: React.CSSProperties;
    rotation: number;
    rotateLeft: () => void;
    rotateRight: () => void;
    setContainerDims: React.Dispatch<React.SetStateAction<{width: number; height: number}>>;
};

/** Hook for reading image rotation state from GalleryImageRotationContext. */
export function useImageRotation(): UseImageRotationReturn {
    const {rotation, rotateLeft, rotateRight} = useGalleryImageRotationContext();
    const [containerDims, setContainerDims] = React.useState({width: 0, height: 0});

    const normalizedRotation = ((rotation % FULL_ROTATION) + FULL_ROTATION) % FULL_ROTATION;
    const isHorizontalRotation =
        normalizedRotation === ROTATION_STEP ||
        normalizedRotation === FULL_ROTATION - ROTATION_STEP;

    const imageRotationStyles = React.useMemo<React.CSSProperties>(
        () => ({
            ...(rotation ? {transform: `rotate(${rotation}deg)`} : {}),
            ...(isHorizontalRotation && containerDims.width > 0
                ? {maxWidth: containerDims.height, maxHeight: containerDims.width}
                : {}),
        }),
        [rotation, isHorizontalRotation, containerDims],
    );

    return {imageRotationStyles, rotation, rotateLeft, rotateRight, setContainerDims};
}
