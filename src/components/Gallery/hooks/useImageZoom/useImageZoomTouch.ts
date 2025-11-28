import * as React from 'react';

import {useLatest} from '../useLatest';

import {
    DOUBLE_TAP_DELAY_MS,
    DOUBLE_TAP_DISTANCE_PX,
    DRAG_THRESHOLD_PX,
    MAX_SCALE_TOUCH,
    MIN_SCALE,
} from './constants';
import type {Position, ZoomActions, ZoomConstraints, ZoomState} from './types';

type TouchState = {
    lastTapTime: number;
    lastTapPosition: Position | null;
    initialDistance: number | null;
    initialScale: number;
    touchStartPosition: Position | null;
    initialPosition: Position;
    isTouching: boolean;
    touchCount: number;
};

type UseImageZoomTouchProps = {
    enabled: boolean;
    zoomState: ZoomState;
    zoomActions: ZoomActions;
    constraints: ZoomConstraints;
    onTap?: React.TouchEventHandler;
};

/**
 * Touch-specific zoom logic for mobile devices
 *
 * Features:
 * - Double tap to toggle zoom (1x ↔ 2x)
 * - Pinch-to-zoom with continuous scale (1.0 - 2.0)
 * - Single finger drag to pan when zoomed
 * - Conditional event propagation (allows gallery swipe when not zoomed)
 *
 * @param props - Configuration with zoom state, actions, and constraints
 * @returns Touch handlers and touching state
 */
export function useImageZoomTouch({
    enabled,
    zoomState,
    zoomActions,
    constraints,
    onTap,
}: UseImageZoomTouchProps) {
    const {scale, position} = zoomState;
    const {setScale, setPosition} = zoomActions;
    const {constrainPosition} = constraints;

    const scaleRef = useLatest(scale);
    const positionRef = useLatest(position);
    const onTapRef = useLatest(onTap);

    const [touchState, setTouchState] = React.useState<TouchState>({
        lastTapTime: 0,
        lastTapPosition: null,
        initialDistance: null,
        initialScale: 1,
        touchStartPosition: null,
        initialPosition: {x: 0, y: 0},
        isTouching: false,
        touchCount: 0,
    });

    /**
     * Helper: Calculate distance between two touch points
     */
    const getTouchDistance = React.useCallback(
        (touch1: React.Touch, touch2: React.Touch): number => {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;
            return Math.sqrt(dx * dx + dy * dy);
        },
        [],
    );

    /**
     * Helper: Check if current tap is a double tap
     */
    const isDoubleTap = React.useCallback(
        (currentTime: number, currentPos: Position): boolean => {
            const {lastTapTime, lastTapPosition} = touchState;

            if (!lastTapPosition) {
                return false;
            }

            const timeDiff = currentTime - lastTapTime;
            const dx = currentPos.x - lastTapPosition.x;
            const dy = currentPos.y - lastTapPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            return timeDiff < DOUBLE_TAP_DELAY_MS && distance < DOUBLE_TAP_DISTANCE_PX;
        },
        [touchState],
    );

    /**
     * Handle touch start - detect gesture type
     *
     * IMPORTANT: Only stop propagation when we need to handle the gesture ourselves.
     * When image is not zoomed and it's a single touch, let the event propagate
     * so gallery swipe can work.
     */
    const handleTouchStart = React.useCallback(
        (event: React.TouchEvent) => {
            if (!enabled) {
                return;
            }

            const touchCount = event.touches.length;

            if (touchCount === 1) {
                // Single touch - could be tap or drag
                const touch = event.touches[0];
                const touchPos = {x: touch.clientX, y: touch.clientY};

                const isZoomed = scaleRef.current > MIN_SCALE;

                setTouchState((prev) => ({
                    ...prev,
                    touchStartPosition: touchPos,
                    initialPosition: positionRef.current,
                    // Only set isTouching if image is zoomed (we'll handle drag)
                    isTouching: isZoomed,
                    touchCount: 1,
                }));

                // Only stop propagation if image is zoomed (we need to handle drag)
                // Otherwise let gallery swipe work
                if (isZoomed) {
                    event.stopPropagation();
                }
            } else if (touchCount === 2) {
                // Two fingers - always handle pinch, stop propagation
                event.stopPropagation();

                const touch1 = event.touches[0];
                const touch2 = event.touches[1];
                const distance = getTouchDistance(touch1, touch2);

                setTouchState((prev) => ({
                    ...prev,
                    initialDistance: distance,
                    initialScale: scaleRef.current,
                    initialPosition: positionRef.current,
                    isTouching: true,
                    touchCount: 2,
                }));
            }
        },
        [enabled, getTouchDistance, positionRef, scaleRef],
    );

    /**
     * Handle touch move - process pinch or drag
     */
    const handleTouchMove = React.useCallback(
        (event: React.TouchEvent) => {
            if (!enabled) {
                return;
            }

            const touchCount = event.touches.length;

            if (touchCount === 2 && touchState.initialDistance !== null) {
                event.stopPropagation();

                // Pinch-to-zoom
                const touch1 = event.touches[0];
                const touch2 = event.touches[1];
                const currentDistance = getTouchDistance(touch1, touch2);
                const distanceRatio = currentDistance / touchState.initialDistance;

                // Calculate new scale
                let newScale = touchState.initialScale * distanceRatio;
                newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE_TOUCH, newScale));

                setScale(newScale);

                // Constrain position for new scale
                const constrainedPosition = constrainPosition(touchState.initialPosition, newScale);
                setPosition(constrainedPosition);
            } else if (
                touchCount === 1 &&
                touchState.touchStartPosition &&
                scaleRef.current > MIN_SCALE
            ) {
                event.stopPropagation();

                // Single finger drag when zoomed
                const touch = event.touches[0];
                const deltaX = touch.clientX - touchState.touchStartPosition.x;
                const deltaY = touch.clientY - touchState.touchStartPosition.y;

                // Update position with constraints
                const newPosition = constrainPosition(
                    {
                        x: touchState.initialPosition.x + deltaX,
                        y: touchState.initialPosition.y + deltaY,
                    },
                    scaleRef.current,
                );

                setPosition(newPosition);
            }
        },
        [enabled, touchState, getTouchDistance, constrainPosition, scaleRef, setScale, setPosition],
    );

    /**
     * Handle touch end - finalize gesture, detect double tap
     *
     * IMPORTANT: Only stop propagation when we're handling zoom-related gestures.
     * For single taps when not zoomed, let the event propagate for gallery navigation.
     */
    const handleTouchEnd = React.useCallback(
        (event: React.TouchEvent) => {
            if (!enabled) {
                return;
            }

            const currentTime = Date.now();
            const touchCount = event.changedTouches.length;

            if (touchCount === 1 && touchState.touchCount === 1) {
                // Single touch ended - check for double tap
                const touch = event.changedTouches[0];
                const touchPos = {x: touch.clientX, y: touch.clientY};

                // Check if this was a tap (not a drag)
                if (touchState.touchStartPosition) {
                    const isZoomed = scaleRef.current > MIN_SCALE;

                    const dx = touchPos.x - touchState.touchStartPosition.x;
                    const dy = touchPos.y - touchState.touchStartPosition.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < DRAG_THRESHOLD_PX) {
                        // This was a tap, check for double tap
                        if (isDoubleTap(currentTime, touchPos)) {
                            // Double tap detected - toggle zoom
                            // Always stop propagation for double tap
                            event.stopPropagation();

                            if (isZoomed) {
                                setScale(MIN_SCALE);
                                setPosition({x: 0, y: 0});
                            } else {
                                setScale(MAX_SCALE_TOUCH);
                                setPosition({x: 0, y: 0});
                            }

                            // Reset tap tracking
                            setTouchState((prev) => ({
                                ...prev,
                                lastTapTime: 0,
                                lastTapPosition: null,
                                touchStartPosition: null,
                                isTouching: false,
                                touchCount: 0,
                            }));
                        } else {
                            setTouchState((prev) => ({
                                ...prev,
                                lastTapTime: currentTime,
                                lastTapPosition: touchPos,
                                touchStartPosition: null,
                                isTouching: false,
                                touchCount: 0,
                            }));
                            if (isZoomed) {
                                onTapRef.current?.(event);
                            }
                        }
                    } else {
                        // This was a drag
                        // Stop propagation only if image was zoomed (we handled the drag)
                        if (scaleRef.current > MIN_SCALE) {
                            event.stopPropagation();
                        }

                        setTouchState((prev) => ({
                            ...prev,
                            touchStartPosition: null,
                            isTouching: false,
                            touchCount: 0,
                        }));
                    }
                }
            } else {
                // Multi-touch gesture ended (pinch)
                // Stop propagation only if we were actually handling pinch
                if (touchState.initialDistance !== null) {
                    event.stopPropagation();
                }

                setTouchState((prev) => ({
                    ...prev,
                    initialDistance: null,
                    touchStartPosition: null,
                    isTouching: false,
                    touchCount: 0,
                }));
            }
        },
        [enabled, touchState, isDoubleTap, scaleRef, setScale, setPosition, onTapRef],
    );

    return {
        handlers: enabled
            ? {
                  onTouchStart: handleTouchStart,
                  onTouchMove: handleTouchMove,
                  onTouchEnd: handleTouchEnd,
              }
            : {},
        isTouching: touchState.isTouching,
    };
}
