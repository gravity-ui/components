import * as React from 'react';

export type UseNavigationProps = {
    itemsCount: number;
    initialItemIndex?: number;
    selectedPreviewItemClass: string;
};

export function useNavigation({
    itemsCount,
    initialItemIndex = 0,
    selectedPreviewItemClass,
}: UseNavigationProps) {
    const [activeItemIndex, setActiveItemIndex] = React.useState(initialItemIndex);

    const handleGoToPrevious = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => {
            const nextActiveItemIndex = previousActiveItemIndex - 1;

            return nextActiveItemIndex > -1 ? nextActiveItemIndex : itemsCount - 1;
        });
    }, [itemsCount]);

    const handleGoToNext = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => (previousActiveItemIndex + 1) % itemsCount);
    }, [itemsCount]);

    React.useLayoutEffect(() => {
        const activeItemPreview = document.querySelector(selectedPreviewItemClass);

        if (activeItemPreview) {
            activeItemPreview.scrollIntoView();
        }
    }, [activeItemIndex, selectedPreviewItemClass]);

    React.useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handleGoToPrevious();
            } else if (event.key === 'ArrowRight') {
                handleGoToNext();
            }
        };

        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleGoToNext, handleGoToPrevious]);

    return {
        activeItemIndex,
        handleGoToPrevious,
        handleGoToNext,
        setActiveItemIndex,
    };
}
