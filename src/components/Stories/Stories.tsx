import React from 'react';

import type {ModalCloseReason} from '@gravity-ui/uikit';
import {Modal} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import type {StoriesLayoutProps} from './components/StoriesLayout/StoriesLayout';
import {IndexType, StoriesLayout} from './components/StoriesLayout/StoriesLayout';
import {useSyncWithLS} from './hooks';
import type {StoriesItem} from './types';

import './Stories.scss';

const b = block('stories');

export interface StoriesProps {
    open: boolean;
    items: StoriesItem[];
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    initialStoryIndex?: number;
    onPreviousClick?: (storyIndex: number) => void;
    onNextClick?: (storyIndex: number) => void;
    disableOutsideClick?: boolean;
    className?: string;
    action?: StoriesLayoutProps['action'];
    syncInTabs?: boolean;
}

export function Stories({
    open,
    onClose,
    items,
    onPreviousClick,
    onNextClick,
    initialStoryIndex = 0,
    disableOutsideClick = true,
    className,
    action,
    syncInTabs,
}: StoriesProps) {
    const [storyIndex, setStoryIndex] = React.useState(initialStoryIndex);

    const handleClose = React.useCallback<NonNullable<StoriesProps['onClose']>>(
        (event, reason) => {
            onClose?.(event, reason);
        },
        [onClose],
    );

    const {callback: closeWithLS} = useSyncWithLS<NonNullable<StoriesProps['onClose']>>({
        callback: (event, reason) => {
            onClose?.(event, reason);
        },
        uniqueKey: `close-story-${initialStoryIndex}`,
    });

    const handleButtonClose = React.useCallback<
        (event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>) => void
    >(
        (event) => {
            handleClose(event, 'closeButtonClick');
            if (syncInTabs) closeWithLS(event, 'closeButtonClick');
        },
        [handleClose, syncInTabs, closeWithLS],
    );

    const handleGotoPrevious = React.useCallback(() => {
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex <= 0) {
                return 0;
            }

            const newIndex = currentStoryIndex - 1;
            onPreviousClick?.(newIndex);
            return newIndex;
        });
    }, [onPreviousClick]);

    const handleGotoNext = React.useCallback(() => {
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex >= items.length - 1) {
                return items.length - 1;
            }

            const newIndex = currentStoryIndex + 1;
            onNextClick?.(newIndex);
            return newIndex;
        });
    }, [items, onNextClick]);

    if (items.length === 0) {
        return null;
    }

    // case when items has changed and index has ceased to be valid
    if (items[storyIndex] === undefined) {
        const correctIndex = items[initialStoryIndex] === undefined ? 0 : initialStoryIndex;
        setStoryIndex(correctIndex);

        return null;
    }

    const indexType =
        (items.length === 1 && IndexType.Single) ||
        (storyIndex === 0 && IndexType.Start) ||
        (storyIndex === items.length - 1 && IndexType.End) ||
        IndexType.InProccess;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableOutsideClick={disableOutsideClick}
            contentClassName={b('modal-content', className)}
        >
            <StoriesLayout
                items={items}
                storyIndex={storyIndex}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
                action={action}
            />
        </Modal>
    );
}
