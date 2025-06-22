import * as React from 'react';

import {useMobile} from '@gravity-ui/uikit';

import type {GalleryItemAction} from '../../GalleryItem';
import {DesktopGalleryHeader} from '../DesktopGalleryHeader/DesktopGalleryHeader';
import {MobileGalleryHeader} from '../MobileGalleryHeader/MobileGalleryHeader';

export type GalleryHeaderProps = {
    itemName?: React.ReactNode;
    actions?: GalleryItemAction[];
    withNavigation: boolean;
    activeItemIndex: number;
    itemsLength: number;
    fullScreen: boolean;
    onBackClick: () => void;
    onGoToPrevious: () => void;
    onGoToNext: () => void;
    onUpdateFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    hidden?: boolean;
    interactive?: boolean;
};

export const GalleryHeader = ({
    itemName,
    actions,
    withNavigation,
    activeItemIndex,
    itemsLength,
    fullScreen,
    onBackClick,
    onGoToPrevious,
    onGoToNext,
    onUpdateFullScreen,
    onClose,
    hidden,
    interactive,
}: GalleryHeaderProps) => {
    const isMobile = useMobile();

    if (isMobile) {
        return (
            <MobileGalleryHeader
                itemName={itemName}
                actions={actions}
                withNavigation={withNavigation}
                activeItemIndex={activeItemIndex}
                itemsLength={itemsLength}
                onBackClick={onBackClick}
                hidden={hidden}
                interactive={interactive}
            />
        );
    }

    return (
        <DesktopGalleryHeader
            itemName={itemName}
            actions={actions}
            withNavigation={withNavigation}
            activeItemIndex={activeItemIndex}
            itemsLength={itemsLength}
            fullScreen={fullScreen}
            onGoToPrevious={onGoToPrevious}
            onGoToNext={onGoToNext}
            onUpdateFullScreen={onUpdateFullScreen}
            onClose={onClose}
        />
    );
};
