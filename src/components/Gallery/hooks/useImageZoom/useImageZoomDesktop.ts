import * as React from 'react';

import {useLatest} from '../useLatest';

import {DRAG_THRESHOLD_PX, MAX_SCALE_DESKTOP, MIN_SCALE} from './constants';
import type {Position, ZoomActions, ZoomConstraints, ZoomState} from './types';

type UseImageZoomDesktopProps = {
    enabled: boolean;
    zoomState: ZoomState;
    zoomActions: ZoomActions;
    constraints: ZoomConstraints;
};

/**
 * Desktop-specific zoom logic using mouse events
 *
 * Features:
 * - Click to toggle between 1x and 2x zoom
 * - Drag to pan when zoomed
 * - Click vs drag detection (3px threshold)
 * - Document-level mouse listeners for smooth drag
 *
 * @param props - Configuration with zoom state, actions, and constraints
 * @returns Handlers and dragging state
 */
export function useImageZoomDesktop({
    enabled,
    zoomState,
    zoomActions,
    constraints,
}: UseImageZoomDesktopProps) {
    const {scale, position} = zoomState;
    const {setScale, setPosition, resetZoom} = zoomActions;
    const {imageSizeRef, containerSizeRef, constrainPosition, imageFitsContainer} = constraints;

    const imageFitsContainerRef = useLatest(imageFitsContainer);

    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState<Position | null>(null);
    const [hasMoved, setHasMoved] = React.useState(false);

    /**
     * Handle image click - toggle zoom
     * Only toggle if there was no drag movement
     */
    const handleImageClick = React.useCallback<React.MouseEventHandler>(
        (_event) => {
            if (!enabled) {
                return;
            }

            // Don't toggle zoom if user was dragging
            if (hasMoved) {
                setHasMoved(false);
                return;
            }

            if (scale === 1) {
                // Zoom in to 2x, centered
                setScale(MAX_SCALE_DESKTOP);
                setPosition({x: 0, y: 0});
            } else {
                // Zoom out to 1x
                resetZoom();
            }
        },
        [enabled, scale, hasMoved, setScale, setPosition, resetZoom],
    );

    /**
     * Handle mouse down - start drag operation
     */
    const handleMouseDown = React.useCallback<React.MouseEventHandler>(
        (event) => {
            if (!enabled) {
                return;
            }

            // Only allow dragging when zoomed and image doesn't fit in container
            if (scale <= MIN_SCALE || imageFitsContainer) {
                return;
            }

            // Don't start drag if dimensions are not yet available
            if (
                imageSizeRef.current.width === 0 ||
                imageSizeRef.current.height === 0 ||
                containerSizeRef.current.width === 0 ||
                containerSizeRef.current.height === 0
            ) {
                return;
            }

            event.preventDefault(); // Prevent text selection
            event.stopPropagation();

            setIsDragging(true);
            setDragStart({x: event.clientX, y: event.clientY});
            setHasMoved(false);
        },
        [enabled, scale, imageFitsContainer, imageSizeRef, containerSizeRef],
    );

    /**
     * Handle mouse move - update position during drag
     */
    const handleMouseMove = React.useCallback(
        (event: MouseEvent) => {
            if (!isDragging || !dragStart) {
                return;
            }

            // Stop dragging if image now fits in container
            if (imageFitsContainerRef.current) {
                setIsDragging(false);
                setDragStart(null);
                return;
            }

            // Calculate delta from drag start
            const deltaX = event.clientX - dragStart.x;
            const deltaY = event.clientY - dragStart.y;

            // Mark as moved if there's significant movement
            if (Math.abs(deltaX) > DRAG_THRESHOLD_PX || Math.abs(deltaY) > DRAG_THRESHOLD_PX) {
                setHasMoved(true);
            }

            // Update position with constraints
            const newPosition = constrainPosition(
                {
                    x: position.x + deltaX,
                    y: position.y + deltaY,
                },
                scale,
            );

            setPosition(newPosition);
            setDragStart({x: event.clientX, y: event.clientY});
        },
        [
            isDragging,
            dragStart,
            position,
            scale,
            constrainPosition,
            setPosition,
            imageFitsContainerRef,
        ],
    );

    /**
     * Handle mouse up - end drag operation
     */
    const handleMouseUp = React.useCallback(() => {
        setIsDragging(false);
        setDragStart(null);
        // Note: hasMoved is reset in handleImageClick or on next mousedown
    }, []);

    // Add/remove document-level mouse event listeners for drag
    React.useEffect(() => {
        if (!enabled || !isDragging) {
            return undefined;
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [enabled, isDragging, handleMouseMove, handleMouseUp]);

    return {
        handlers: enabled
            ? {
                  onClick: handleImageClick,
                  onMouseDown: handleMouseDown,
              }
            : {},
        isDragging,
    };
}
