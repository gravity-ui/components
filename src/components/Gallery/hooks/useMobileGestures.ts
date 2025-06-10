import * as React from 'react';

const isInteractiveElement = (element: Element): boolean => {
    const interactiveTags = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A', 'IFRAME'];
    const interactiveRoles = ['button', 'link', 'textbox', 'combobox', 'listbox', 'tab'];

    // Check if element itself is interactive
    if (interactiveTags.includes(element.tagName)) {
        return true;
    }

    // Check for interactive roles
    const role = element.getAttribute('role');
    if (role && interactiveRoles.includes(role)) {
        return true;
    }

    // Check for tabindex (focusable elements)
    const tabIndex = element.getAttribute('tabindex');
    if (tabIndex && parseInt(tabIndex, 10) >= 0) {
        return true;
    }

    // Check for contenteditable
    if (element.getAttribute('contenteditable') === 'true') {
        return true;
    }

    // Check for onclick handlers or cursor pointer (likely interactive)
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.cursor === 'pointer') {
        return true;
    }

    return false;
};

// Helper function to check if touch target or any parent is interactive
const isTouchOnInteractiveElement = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof Element)) {
        return false;
    }

    const element: Element | null = target;
    if (isInteractiveElement(element)) {
        return true;
    }

    return false;
};

export type ImageGesturesState = {
    scale: number;
    position: {x: number; y: number};
    isSwitching: boolean;
};

export type ImageGesturesActions = {
    resetZoom: () => void;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
    handleDoubleClick: () => void;
};

export type UseMobileGesturesProps = {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onTap?: () => void;
    maxScale?: number;
    enableSwitchAnimation?: boolean;
};

export function useMobileGestures({
    onSwipeLeft,
    onSwipeRight,
    onTap,
    maxScale = 3,
    enableSwitchAnimation = true,
}: UseMobileGesturesProps = {}): [ImageGesturesState, ImageGesturesActions] {
    const [scale, setScale] = React.useState(1);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [isSwitching, setIsSwitching] = React.useState(false);
    const [startPosition, setStartPosition] = React.useState<{x: number; y: number} | null>(null);
    const [startDistance, setStartDistance] = React.useState<number | null>(null);
    const [startScale, setStartScale] = React.useState<number>(1);
    const [touchStartTime, setTouchStartTime] = React.useState<number | null>(null);
    const [hasMoved, setHasMoved] = React.useState(false);
    const [touchStartTarget, setTouchStartTarget] = React.useState<EventTarget | null>(null);

    const resetZoom = React.useCallback(() => {
        setScale(1);
        setPosition({x: 0, y: 0});
    }, []);

    const handleTouchStart = React.useCallback(
        (e: React.TouchEvent) => {
            if (e.touches.length === 1) {
                setStartPosition({
                    x: e.touches[0].clientX - position.x,
                    y: e.touches[0].clientY - position.y,
                });
                setTouchStartTime(Date.now());
                setHasMoved(false);
                setTouchStartTarget(e.target);
            } else if (e.touches.length === 2) {
                // Calculate the distance between two touch points for pinch zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                setStartDistance(distance);
                setStartScale(scale);
                setTouchStartTime(null);
                setHasMoved(true);
                setTouchStartTarget(null);
            }
        },
        [position.x, position.y, scale],
    );

    const handleTouchMove = React.useCallback(
        (e: React.TouchEvent) => {
            if (e.touches.length === 1 && startPosition) {
                const deltaX = e.touches[0].clientX - startPosition.x;
                const deltaY = e.touches[0].clientY - startPosition.y;

                // Mark as moved if the touch has moved more than a small threshold
                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    setHasMoved(true);
                }

                // Handle panning when zoomed in
                if (scale > 1) {
                    const newX = e.touches[0].clientX - startPosition.x;
                    const newY = e.touches[0].clientY - startPosition.y;
                    setPosition({x: newX, y: newY});
                    // Handle horizontal swipe for navigation when not zoomed
                } else if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0 && onSwipeRight) {
                        if (enableSwitchAnimation && !isSwitching) {
                            setIsSwitching(true);
                            setTimeout(() => {
                                onSwipeRight();
                                setTimeout(() => setIsSwitching(false), 50);
                            }, 150);
                        } else {
                            onSwipeRight();
                        }
                        setStartPosition(null);
                    } else if (deltaX < 0 && onSwipeLeft) {
                        if (enableSwitchAnimation && !isSwitching) {
                            setIsSwitching(true);
                            setTimeout(() => {
                                onSwipeLeft();
                                setTimeout(() => setIsSwitching(false), 50);
                            }, 150);
                        } else {
                            onSwipeLeft();
                        }
                        setStartPosition(null);
                    }
                }
            } else if (e.touches.length === 2 && startDistance !== null) {
                setHasMoved(true);
                // Handle pinch zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const scaleRatio = distance / startDistance;
                const newScale = Math.max(1, Math.min(maxScale, startScale * scaleRatio));
                setScale(newScale);
            }
        },
        [
            startPosition,
            startDistance,
            scale,
            onSwipeRight,
            onSwipeLeft,
            enableSwitchAnimation,
            isSwitching,
            maxScale,
            startScale,
        ],
    );

    const handleTouchEnd = React.useCallback(() => {
        const touchEndTime = Date.now();
        const touchDuration = touchStartTime ? touchEndTime - touchStartTime : 0;

        // Check if this was a single tap:
        // - Touch started and ended within reasonable time (< 300ms)
        // - No significant movement occurred
        // - No pinch gesture was performed
        if (
            touchStartTime &&
            touchDuration < 300 &&
            !hasMoved &&
            !startDistance &&
            !isTouchOnInteractiveElement(touchStartTarget)
        ) {
            onTap?.();
        }

        setStartPosition(null);
        setStartDistance(null);
        setStartScale(1);
        setTouchStartTime(null);
        setHasMoved(false);
    }, [touchStartTime, hasMoved, startDistance, touchStartTarget, onTap]);

    const handleDoubleClick = React.useCallback(() => {
        if (scale > 1) {
            resetZoom();
        } else {
            setScale(2);
        }
    }, [scale, resetZoom]);

    return [
        {scale, position, isSwitching},
        {resetZoom, handleTouchStart, handleTouchMove, handleTouchEnd, handleDoubleClick},
    ];
}
