import * as React from 'react';

import {Modal} from '@gravity-ui/uikit';
import type {OpenChangeReason} from '@gravity-ui/uikit';

import {IndexType, StoriesLayout} from '../Stories/components/StoriesLayout/StoriesLayout';
import type {StoriesAutoPlayProps} from '../Stories/types';
import {block} from '../utils/cn';

import {StoriesPreview} from './components';
import type {StoriesGroupItem} from './types';

import './StoriesGroup.scss';

const DEFAULT_MAX_SLIDER_ITEMS_COUNT = 12;

const b = block('stories-group');

export interface StoriesGroupProps extends StoriesAutoPlayProps {
    open: boolean;
    groups: StoriesGroupItem[];
    initialStoryIndex?: [groupIndex: number, itemIndex: number];
    disableOutsideClick?: boolean;
    maxSliderItemsCount?: number;
    onClose?: (
        event?: Event | React.MouseEvent<HTMLElement, MouseEvent>,
        reason?: OpenChangeReason,
    ) => void;
    onItemSelect?: (
        itemIndexes: [groupIndex: number, itemIndex: number],
        selectedFromThumbnail: boolean,
    ) => void;
}

// eslint-disable-next-line complexity
export const StoriesGroup = ({
    open,
    groups,
    onItemSelect,
    disableOutsideClick = true,
    initialStoryIndex = [0, 0],
    maxSliderItemsCount = DEFAULT_MAX_SLIDER_ITEMS_COUNT,
    onClose,
    autoPlay,
    autoPlayInterval,
}: StoriesGroupProps) => {
    const [[groupIndex, itemIndex], setStoryIndex] = React.useState(initialStoryIndex);

    const handleClose = React.useCallback<NonNullable<StoriesGroupProps['onClose']>>(
        (event, reason) => {
            onClose?.(event, reason);
        },
        [onClose],
    );

    const handleButtonClose = React.useCallback<
        (event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>) => void
    >(
        (event) => {
            handleClose(event, 'click');
        },
        [handleClose],
    );

    const handleGotoPrevious = React.useCallback(() => {
        let newState: [number, number] | undefined;
        if (itemIndex > 0) {
            newState = [groupIndex, itemIndex - 1];
        } else {
            for (let i = groupIndex - 1; i >= 0; --i) {
                if (groups[i].items.length !== 0) {
                    newState = [i, groups[i].items.length - 1];
                    break;
                }
            }
        }
        if (newState) {
            setStoryIndex(newState);
            onItemSelect?.(newState, false);
        }
    }, [groups, groupIndex, itemIndex, onItemSelect]);

    const handleGotoNext = React.useCallback(() => {
        let newState: [number, number] | undefined;
        if (itemIndex < groups[groupIndex]?.items.length - 1) {
            newState = [groupIndex, itemIndex + 1];
        } else {
            for (let i = groupIndex + 1; i < groups.length; ++i) {
                if (groups[i].items.length !== 0) {
                    newState = [i, 0];
                    break;
                }
            }
        }
        if (newState) {
            setStoryIndex(newState);
            onItemSelect?.(newState, false);
        }
    }, [groups, groupIndex, itemIndex, onItemSelect]);

    const onGroupSelect = React.useCallback(
        (newGroupIndex: number) => {
            setStoryIndex([newGroupIndex, 0]);
            onItemSelect?.([newGroupIndex, 0], true);
        },
        [onItemSelect],
    );

    if (groups.length === 0) {
        return null;
    }

    const currentGroup = groups[groupIndex];
    const currentItems = currentGroup?.items || [];

    // case when groups has changed and indexs has ceased to be valid
    if (currentGroup === undefined || currentItems[itemIndex] === undefined) {
        if (
            groups[initialStoryIndex[0]] &&
            groups[initialStoryIndex[0]].items[initialStoryIndex[1]]
        ) {
            setStoryIndex(initialStoryIndex);
        } else {
            // try to find first valid index
            for (let i = 0; i < groups.length; ++i) {
                if (groups[i] && groups[i].items.length !== 0) {
                    setStoryIndex([i, 0]);
                    break;
                }
            }
        }

        return null;
    }

    const hasPrevious =
        itemIndex > 0 || groups.slice(0, groupIndex).some((group) => group.items.length);
    const hasNext =
        itemIndex < currentItems.length - 1 ||
        groups.slice(groupIndex + 1).some((group) => group.items.length);
    const indexType =
        (!hasPrevious && !hasNext && IndexType.Single) ||
        (!hasPrevious && IndexType.Start) ||
        (!hasNext && IndexType.End) ||
        IndexType.InProccess;

    return (
        <Modal
            open={open}
            onOpenChange={(nextOpen, event, reason) => {
                if (!nextOpen) handleClose(event, reason);
            }}
            disableOutsideClick={disableOutsideClick}
            className={b()}
            contentClassName={b('modal-content')}
        >
            <StoriesPreview
                maxSliderItemsCount={maxSliderItemsCount > 0 ? maxSliderItemsCount : 1}
                groups={groups}
                groupIndex={groupIndex}
                onGroupSelect={onGroupSelect}
                onClose={disableOutsideClick ? undefined : handleClose}
            />
            <StoriesLayout
                open={open}
                autoPlay={autoPlay}
                autoPlayInterval={autoPlayInterval}
                storyKey={`${groupIndex}:${itemIndex}`}
                storyIndex={itemIndex}
                items={currentItems}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
            />
        </Modal>
    );
};
