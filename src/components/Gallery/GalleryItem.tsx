import type * as React from 'react';

import {ButtonProps} from '@gravity-ui/uikit';

import type {TProps, WithTFn} from './i18n';

export type GalleryItemAction = {
    id: string;
    title: string;
    /** @internal */
    __titleT?: WithTFn;
    hotkey?: string;
    onClick?: () => void;
    href?: string;
    icon: React.ReactNode;
    render?: (props: ButtonProps) => React.ReactNode;
    /** @internal */
    __renderT?: (props: ButtonProps, tProps: TProps) => React.ReactNode;
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
