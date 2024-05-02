import {QAProps} from '@gravity-ui/uikit';

import type {HelpPopoverProps} from '../HelpPopover';
export type DefinitionListItemNote = string | HelpPopoverProps;

export interface DefinitionListGroupItem {
    label: string;
}

export interface DefinitionListGroup {
    label: string;
    items?: DefinitionListItem[];
}

export interface DefinitionListItem {
    name: React.ReactNode;
    content?: React.ReactNode;
    contentTitle?: string;
    nameTitle?: string;
    copyText?: string;
    note?: DefinitionListItemNote;
    multilineName?: boolean;
}

export interface DefinitionListItemGrouped extends DefinitionListItem {
    isGrouped?: boolean;
}

export interface DefinitionListProps extends QAProps {
    items: (DefinitionListItem | DefinitionListGroup)[];
    copyPosition?: 'inside' | 'outside';
    responsive?: boolean;
    nameMaxWidth?: number;
    contentMaxWidth?: number | 'auto';
    className?: string;
    itemClassName?: string;
}
