import {act, renderHook} from '@testing-library/react';

import {INITIAL_ROTATION, ROTATION_STEP} from '../../useImageRotation/constants';
import {useImageRotationState} from '../useImageRotationState';

describe('useImageRotationState', () => {
    it('starts at 0 by default', () => {
        const {result} = renderHook(() => useImageRotationState());

        expect(result.current.rotation).toBe(0);
    });

    it('increments rotation by ROTATION_STEP on rotateRight', () => {
        const {result} = renderHook(() => useImageRotationState());

        act(() => {
            result.current.rotateRight();
        });

        expect(result.current.rotation).toBe(ROTATION_STEP);
    });

    it('decrements rotation by ROTATION_STEP on rotateLeft', () => {
        const {result} = renderHook(() => useImageRotationState());

        act(() => {
            result.current.rotateLeft();
        });

        expect(result.current.rotation).toBe(-ROTATION_STEP);
    });

    it('accumulates rotation across multiple calls', () => {
        const {result} = renderHook(() => useImageRotationState());

        act(() => {
            result.current.rotateRight();
            result.current.rotateRight();
            result.current.rotateRight();
        });

        expect(result.current.rotation).toBe(ROTATION_STEP * 3);
    });

    it('resetRotation returns to initial rotation', () => {
        const {result} = renderHook(() => useImageRotationState());

        act(() => {
            result.current.rotateRight();
            result.current.rotateRight();
        });
        expect(result.current.rotation).toBe(INITIAL_ROTATION + ROTATION_STEP * 2);

        act(() => {
            result.current.resetRotation();
        });
        expect(result.current.rotation).toBe(INITIAL_ROTATION);
    });

    it('keeps stable rotateLeft/rotateRight identities when step is unchanged', () => {
        const {result, rerender} = renderHook(() => useImageRotationState());

        const firstRotateLeft = result.current.rotateLeft;
        const firstRotateRight = result.current.rotateRight;

        rerender();

        expect(result.current.rotateLeft).toBe(firstRotateLeft);
        expect(result.current.rotateRight).toBe(firstRotateRight);
    });
});
