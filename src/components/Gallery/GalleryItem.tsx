import * as React from 'react';

import {ButtonProps} from '@gravity-ui/uikit';

import type {TProps, WithTFn} from './i18n';

export type GalleryItemAction = {
    id: string;
    title: string | WithTFn;
    hotkey?: string;
    onClick?: () => void;
    href?: string;
    icon: React.ReactNode;
    render?: (props: ButtonProps, tProps: TProps) => React.ReactNode;
};

export type GalleryItemProps = {
    view: React.ReactNode;
    thumbnail: React.ReactNode;
    name?: React.ReactNode;
    actions?: GalleryItemAction[];
    interactive?: boolean;
};

export const GalleryItem = (_props: GalleryItemProps) => {
    return null;
};
