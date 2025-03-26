import * as React from 'react';

export type UseNavigationProps = {
    initialItemIndex?: number;
    itemRefs: React.RefObject<HTMLButtonElement>[];
};

export function useNavigation({initialItemIndex = 0, itemRefs}: UseNavigationProps) {
    const [activeItemIndex, setActiveItemIndex] = React.useState(initialItemIndex);

    const itemsCount = itemRefs.length;

    const handleGoToPrevious = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => {
            const nextActiveItemIndex = previousActiveItemIndex - 1;
            return nextActiveItemIndex > -1 ? nextActiveItemIndex : itemsCount - 1;
        });
    }, [itemsCount]);

    const handleGoToNext = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => (previousActiveItemIndex + 1) % itemsCount);
    }, [itemsCount]);

    React.useEffect(() => {
        const activeItemPreview = itemRefs[activeItemIndex]?.current;

        if (activeItemPreview) {
            activeItemPreview.scrollIntoView();
        }
    }, [activeItemIndex, itemRefs]);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handleGoToPrevious();
            } else if (event.key === 'ArrowRight') {
                handleGoToNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleGoToNext, handleGoToPrevious]);

    return {
        activeItemIndex,
        handleGoToPrevious,
        handleGoToNext,
        setActiveItemIndex,
    };
}
