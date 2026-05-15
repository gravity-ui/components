import {act, renderHook} from '@testing-library/react';

import type {GalleryContextValue} from '../../../contexts/GalleryContext';
import {GalleryContextProvider} from '../../../contexts/GalleryContext';
import {useImageRotation} from '../useImageRotation';

const renderUseImageRotation = (rotation: number) => {
    const contextValue: GalleryContextValue = {
        onTap: () => {},
        onViewInteractionChange: () => {},
        rotation,
        rotateLeft: () => {},
        rotateRight: () => {},
    };

    return renderHook(() => useImageRotation(), {
        wrapper: ({children}) => (
            <GalleryContextProvider {...contextValue}>{children}</GalleryContextProvider>
        ),
    });
};

describe('useImageRotation', () => {
    it('returns empty styles when container has not been measured', () => {
        const {result} = renderUseImageRotation(90);

        expect(result.current.imageRotationStyles).toEqual({});
    });

    it('returns empty styles when container width is 0', () => {
        const {result} = renderUseImageRotation(90);

        act(() => {
            result.current.setContainerDims({width: 0, height: 500});
        });

        expect(result.current.imageRotationStyles).toEqual({});
    });

    it('returns empty styles when container height is 0', () => {
        const {result} = renderUseImageRotation(90);

        act(() => {
            result.current.setContainerDims({width: 500, height: 0});
        });

        expect(result.current.imageRotationStyles).toEqual({});
    });

    it('produces no transform at rotation 0 once dimensions are set', () => {
        const {result} = renderUseImageRotation(0);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({});
    });

    it('applies rotate transform for non-horizontal angles', () => {
        const {result} = renderUseImageRotation(180);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({transform: 'rotate(180deg)'});
    });

    it('swaps max-width / max-height for 90° rotation', () => {
        const {result} = renderUseImageRotation(90);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({
            transform: 'rotate(90deg)',
            maxWidth: 600,
            maxHeight: 800,
        });
    });

    it('swaps dimensions for 270° rotation', () => {
        const {result} = renderUseImageRotation(270);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({
            transform: 'rotate(270deg)',
            maxWidth: 600,
            maxHeight: 800,
        });
    });

    it('normalizes negative rotations to detect horizontal angles', () => {
        const {result} = renderUseImageRotation(-90);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({
            transform: 'rotate(-90deg)',
            maxWidth: 600,
            maxHeight: 800,
        });
    });

    it('handles rotation values greater than 360°', () => {
        const {result} = renderUseImageRotation(450); // 450 % 360 === 90

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles).toEqual({
            transform: 'rotate(450deg)',
            maxWidth: 600,
            maxHeight: 800,
        });
    });

    it('does not swap dimensions for 180° rotation', () => {
        const {result} = renderUseImageRotation(180);

        act(() => {
            result.current.setContainerDims({width: 800, height: 600});
        });

        expect(result.current.imageRotationStyles.maxWidth).toBeUndefined();
        expect(result.current.imageRotationStyles.maxHeight).toBeUndefined();
    });

    it('exposes rotation actions from context', () => {
        const rotateLeft = jest.fn();
        const rotateRight = jest.fn();
        const contextValue: GalleryContextValue = {
            onTap: () => {},
            onViewInteractionChange: () => {},
            rotation: 0,
            rotateLeft,
            rotateRight,
        };

        const {result} = renderHook(() => useImageRotation(), {
            wrapper: ({children}) => (
                <GalleryContextProvider {...contextValue}>{children}</GalleryContextProvider>
            ),
        });

        result.current.rotateLeft();
        result.current.rotateRight();

        expect(rotateLeft).toHaveBeenCalledTimes(1);
        expect(rotateRight).toHaveBeenCalledTimes(1);
    });
});
