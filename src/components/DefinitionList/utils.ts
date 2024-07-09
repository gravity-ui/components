import React from 'react';

import {block} from '../utils/cn';

import type {
    DefinitionListGroup,
    DefinitionListItem,
    DefinitionListItemGrouped,
    DefinitionListProps,
    DefinitionListSingleItem,
} from './types';

export const b = block('definition-list');

export function isUnbreakableOver(limit: number) {
    return function (value: string): boolean {
        const posibleLines = value.split(/\s+/);

        return posibleLines.some((line) => line.length > limit);
    };
}

export const isGroup = (item: DefinitionListItem): item is DefinitionListGroup =>
    'label' in item && !('name' in item);

export function getFlattenItems(
    items: (DefinitionListSingleItem | DefinitionListGroup)[],
): (DefinitionListItemGrouped | DefinitionListGroup)[] {
    return items.reduce<(DefinitionListSingleItem | DefinitionListGroup)[]>((acc, item) => {
        if (isGroup(item)) {
            acc.push({label: item.label});
            const items = [...(item.items ?? [])].map((el) => ({...el, isGrouped: true}));
            acc.push(...items);
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}

export function getTitle(title?: string, content?: React.ReactNode) {
    if (title) {
        return title;
    }

    if (typeof content === 'string' || typeof content === 'number') {
        return String(content);
    }

    return undefined;
}

export function getKeyStyles({
    nameMaxWidth,
    direction,
}: Pick<DefinitionListProps, 'nameMaxWidth' | 'direction'>) {
    if (!nameMaxWidth) {
        return {};
    }
    if (direction === 'vertical') {
        return {maxWidth: nameMaxWidth};
    }
    return {flexBasis: nameMaxWidth};
}

export function getValueStyles({
    contentMaxWidth,
    direction,
}: Pick<DefinitionListProps, 'contentMaxWidth' | 'direction'>) {
    if (!(typeof contentMaxWidth === 'number')) {
        return {};
    }
    if (direction === 'vertical') {
        return {maxWidth: contentMaxWidth};
    }
    return {flexBasis: contentMaxWidth, maxWidth: contentMaxWidth};
}
