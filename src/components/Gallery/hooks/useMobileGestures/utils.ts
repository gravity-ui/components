import {BODY_CONTENT_CLASS_NAME, cnGallery} from '../../constants';

import {SWIPE_TIMEOUT, SWITCHING_TIMEOUT} from './constants';

// Helper function to check if touch target is on gallery content (not on overlay elements)
export const isTouchOnGalleryContent = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof Element)) {
        return false;
    }

    const element = target as Element;

    // Check if the touch is within the gallery body content area
    const isInGalleryBody = element.closest(`.${cnGallery(BODY_CONTENT_CLASS_NAME)}`);

    return Boolean(isInGalleryBody);
};

export const swipeWithSwithingAnimation = ({
    swipeAction,
    isSwitching,
    setIsSwitching,
}: {
    swipeAction: () => void;
    isSwitching: boolean;
    setIsSwitching: (value: boolean) => void;
}) => {
    if (isSwitching) {
        swipeAction();
    } else {
        setIsSwitching(true);
        setTimeout(() => {
            swipeAction();
            setTimeout(() => setIsSwitching(false), SWITCHING_TIMEOUT);
        }, SWIPE_TIMEOUT);
    }
};
