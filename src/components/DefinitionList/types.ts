import React from 'react';

import {QAProps} from '@gravity-ui/uikit';

import type {HelpPopoverProps} from '../HelpPopover';
export type DefinitionListItemNote = string | HelpPopoverProps;

export interface DefinitionListGroup {
    label: React.ReactNode;
    items?: DefinitionListSingleItem[];
}

export interface DefinitionListSingleItem {
    name: React.ReactNode;
    content?: React.ReactNode;
    contentTitle?: string;
    nameTitle?: string;
    copyText?: string;
    note?: DefinitionListItemNote;
    multilineName?: boolean;
}

export type DefinitionListItem = DefinitionListSingleItem | DefinitionListGroup;

export type DefinitionListDirection = 'vertical' | 'horizontal';

export interface DefinitionListProps extends QAProps {
    items: DefinitionListItem[];
    copyPosition?: 'inside' | 'outside';
    responsive?: boolean;
    direction?: DefinitionListDirection;
    nameMaxWidth?: number;
    contentMaxWidth?: number | 'auto';
    className?: string;
    itemClassName?: string;
}

export interface DefinitionListGranularProps extends Omit<DefinitionListProps, 'items'> {
    items: DefinitionListSingleItem[];
}
export interface DefinitionListGroupedProps extends Omit<DefinitionListProps, 'items'> {
    items: DefinitionListGroup[];
}
