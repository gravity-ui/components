import type * as React from 'react';

import type {ModalProps} from '@gravity-ui/uikit';

import type {GalleryItemProps} from './GalleryItem';
import type {UseNavigationProps} from './hooks/useNavigation';

/**
 * - `modal` — open the gallery in a viewport-sized modal overlay (default).
 * - `inline` — render the gallery in place, filling its parent container.
 */
export type GalleryView = 'modal' | 'inline';

type GalleryBaseProps = {
    className?: string;
    children?: React.ReactElement<GalleryItemProps>[] | React.ReactElement<GalleryItemProps>;
    emptyMessage?: string;
} & Pick<UseNavigationProps, 'initialItemIndex' | 'activeItemIndex' | 'onActiveItemIndexChange'>;

export type GalleryModalProps = GalleryBaseProps & {
    view?: 'modal';
} & Pick<ModalProps, 'open' | 'container' | 'onOpenChange'>;

export type GalleryInlineProps = GalleryBaseProps & {
    view: 'inline';
    open?: undefined;
    onOpenChange?: undefined;
    container?: undefined;
};

export type GalleryProps = GalleryModalProps | GalleryInlineProps;
