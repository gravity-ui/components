import * as React from 'react';

import {useControlledState} from '@gravity-ui/uikit';

import {useLatest} from './useLatest';

export type UseNavigationProps = {
    initialItemIndex?: number;
    activeItemIndex?: number;
    onActiveItemIndexChange?: (index: number) => void;
    itemRefs: React.RefObject<HTMLButtonElement | null>[];
    keyboardScope?: React.RefObject<HTMLElement | null>;
};

export function useNavigation({
    initialItemIndex = 0,
    activeItemIndex: controlledActiveItemIndex,
    onActiveItemIndexChange,
    itemRefs,
    keyboardScope,
}: UseNavigationProps) {
    const itemsCount = itemRefs.length;

    const onActiveItemIndexChangeRef = useLatest(onActiveItemIndexChange);
    const handleActiveItemIndexChange = React.useCallback(
        (index: number) => {
            onActiveItemIndexChangeRef.current?.(index);
        },
        [onActiveItemIndexChangeRef],
    );

    const [rawItemIndex, setRawItemIndex] = useControlledState(
        controlledActiveItemIndex,
        initialItemIndex,
        handleActiveItemIndexChange,
    );

    const activeItemIndex =
        itemsCount === 0 ? 0 : Math.min(Math.max(rawItemIndex, 0), itemsCount - 1);

    const activeItemIndexRef = useLatest(activeItemIndex);

    const setRawItemIndexRef = useLatest(setRawItemIndex);

    const setActiveItemIndex = React.useCallback(
        (update: number | ((previousActiveItemIndex: number) => number)) => {
            const nextActiveItemIndex =
                typeof update === 'function' ? update(activeItemIndexRef.current) : update;

            setRawItemIndexRef.current(nextActiveItemIndex);
        },
        [activeItemIndexRef, setRawItemIndexRef],
    );

    const handleGoToPrevious = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => {
            const nextActiveItemIndex = previousActiveItemIndex - 1;
            return nextActiveItemIndex > -1 ? nextActiveItemIndex : itemsCount - 1;
        });
    }, [itemsCount, setActiveItemIndex]);

    const handleGoToNext = React.useCallback(() => {
        setActiveItemIndex((previousActiveItemIndex) => (previousActiveItemIndex + 1) % itemsCount);
    }, [itemsCount, setActiveItemIndex]);

    React.useEffect(() => {
        const activeItemPreview = itemRefs[activeItemIndex]?.current;

        if (activeItemPreview) {
            activeItemPreview.scrollIntoView();
        }
    }, [activeItemIndex, itemRefs]);

    React.useEffect(() => {
        const target = keyboardScope?.current ?? document;

        const handleKeyDown = (event: Event) => {
            const {key} = event as KeyboardEvent;

            if (key === 'ArrowLeft') {
                handleGoToPrevious();
            } else if (key === 'ArrowRight') {
                handleGoToNext();
            }
        };

        target.addEventListener('keydown', handleKeyDown);

        return () => {
            target.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleGoToNext, handleGoToPrevious, keyboardScope]);

    return {
        activeItemIndex,
        handleGoToPrevious,
        handleGoToNext,
        setActiveItemIndex,
    };
}
