import * as React from 'react';

import {INITIAL_ROTATION, ROTATION_STEP} from '../useImageRotation/constants';

export type UseImageRotationStateReturn = {
    rotation: number;
    rotateLeft: VoidFunction;
    rotateRight: VoidFunction;
    resetRotation: VoidFunction;
};

/**
 * Hook that owns image rotation state and exposes rotation actions.
 *
 * @returns Current rotation and actions to rotate left/right or reset.
 */
export function useImageRotationState(): UseImageRotationStateReturn {
    const [rotation, setRotation] = React.useState(INITIAL_ROTATION);

    const rotateLeft = React.useCallback(() => setRotation((r) => r - ROTATION_STEP), []);
    const rotateRight = React.useCallback(() => setRotation((r) => r + ROTATION_STEP), []);
    const resetRotation = React.useCallback(() => setRotation(INITIAL_ROTATION), []);

    return {rotation, rotateLeft, rotateRight, resetRotation};
}
