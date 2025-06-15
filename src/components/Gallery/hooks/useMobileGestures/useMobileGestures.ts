import * as React from 'react';

import {MAX_TAP_DURATION, MIN_SWIPE_DISTANCE} from './constants';
import {isTouchOnGalleryContent, swipeWithSwithingAnimation} from './utils';

export type UseMobileGesturesProps = {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onTap?: () => void;
    enableSwitchAnimation?: boolean;
};

export function useMobileGestures({onSwipeLeft, onSwipeRight, onTap}: UseMobileGesturesProps = {}) {
    const [isSwitching, setIsSwitching] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState<{x: number; y: number} | null>(null);
    const [startDistance, setStartDistance] = React.useState<number | null>(null);
    const [touchStartTime, setTouchStartTime] = React.useState<number | null>(null);
    const [hasMoved, setHasMoved] = React.useState(false);
    const [touchStartTarget, setTouchStartTarget] = React.useState<EventTarget | null>(null);
    const [pendingSwipe, setPendingSwipe] = React.useState<'left' | 'right' | null>(null);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setStartPosition({x: e.touches[0].clientX, y: e.touches[0].clientY});
            setTouchStartTime(Date.now());
            setHasMoved(false);
            setTouchStartTarget(e.target);
            setPendingSwipe(null);
        }
    }, []);

    const handleTouchMove = React.useCallback(
        (e: React.TouchEvent) => {
            if (e.touches.length === 1 && startPosition) {
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const deltaX = currentX - startPosition.x;
                const deltaY = currentY - startPosition.y;

                // Mark as moved if the touch has moved more than a small threshold
                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    setHasMoved(true);
                }

                // Detect swipe direction but don't trigger the event yet
                if (Math.abs(deltaX) > MIN_SWIPE_DISTANCE) {
                    if (deltaX > 0 && onSwipeRight) {
                        setPendingSwipe('right');
                    } else if (deltaX < 0 && onSwipeLeft) {
                        setPendingSwipe('left');
                    }
                }
            }
        },
        [startPosition, onSwipeRight, onSwipeLeft],
    );

    const handleTouchEnd = React.useCallback(() => {
        const touchEndTime = Date.now();
        const touchDuration = touchStartTime ? touchEndTime - touchStartTime : 0;

        // Execute pending swipe if detected
        if (pendingSwipe) {
            if (pendingSwipe === 'right' && onSwipeRight) {
                swipeWithSwithingAnimation({
                    swipeAction: onSwipeRight,
                    isSwitching,
                    setIsSwitching,
                });
            } else if (pendingSwipe === 'left' && onSwipeLeft) {
                swipeWithSwithingAnimation({
                    swipeAction: onSwipeLeft,
                    isSwitching,
                    setIsSwitching,
                });
            }
        }
        // Check if this was a single tap:
        // - Touch started and ended within reasonable time (< 300ms)
        // - No significant movement occurred
        // - Touch is on gallery content (not on overlay elements)
        else if (
            onTap &&
            touchStartTime &&
            touchDuration < MAX_TAP_DURATION &&
            !hasMoved &&
            !startDistance &&
            isTouchOnGalleryContent(touchStartTarget)
        ) {
            onTap();
        }

        setStartPosition(null);
        setStartDistance(null);
        setTouchStartTime(null);
        setHasMoved(false);
        setTouchStartTarget(null);
        setPendingSwipe(null);
    }, [
        touchStartTime,
        hasMoved,
        startDistance,
        touchStartTarget,
        onTap,
        pendingSwipe,
        onSwipeRight,
        onSwipeLeft,
        isSwitching,
    ]);

    return [{isSwitching}, {handleTouchStart, handleTouchMove, handleTouchEnd}];
}
