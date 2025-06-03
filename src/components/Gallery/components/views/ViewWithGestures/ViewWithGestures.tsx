import * as React from 'react';

import {block} from '../../../../utils/cn';
import {useMobileGestures} from '../../../hooks/useMobileGestures';

import './ViewWithGestures.scss';

const cnViewWithGestures = block('mobile-gallery-view');

export type ViewWithGesturesProps = {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onTap?: () => void;
};

export const ViewWithGestures = ({
    children,
    onSwipeLeft,
    onSwipeRight,
    onTap,
}: ViewWithGesturesProps) => {
    const [, {handleTouchStart, handleTouchMove, handleTouchEnd}] = useMobileGestures({
        onSwipeLeft,
        onSwipeRight,
        onTap,
    });

    if (!children) {
        return null;
    }

    return (
        <div
            className={cnViewWithGestures()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {children}
        </div>
    );
};
