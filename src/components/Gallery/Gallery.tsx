import React from 'react';

import {ArrowLeft, ArrowRight, Xmark} from '@gravity-ui/icons';
import type {ModalProps} from '@gravity-ui/uikit';
import {Button, Icon, Modal, Text, ThemeProvider, ThemeProviderProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import type {UseNavigationProps} from './hooks/useNavigation';
import {useNavigation} from './hooks/useNavigation';
import {i18n} from './i18n';

import './Gallery.scss';

const cnGallery = block('gallery');

export type GalleryProps<ItemType extends unknown> = {
    items: ItemType[];
    onClose: () => void;
    fullScreen?: boolean;
    renderActions?: (activeItem: ItemType) => React.ReactNode;
    renderItemPreview: (item: ItemType, selected: boolean) => React.ReactNode;
    renderActiveItemInfo?: (activeItem: ItemType) => React.ReactNode;
    renderBody: (activeItem: ItemType) => React.ReactNode;
    modalClassName?: string;
    className?: string;
    headerClassName?: string;
    activeItemInfoClassName?: string;
    footerClassName?: string;
    bodyClassName?: string;
} & Pick<ModalProps, 'open' | 'container'> &
    Pick<UseNavigationProps, 'initialItemIndex'> &
    Pick<ThemeProviderProps, 'theme'>;

export const Gallery = <ItemType extends unknown>({
    items,
    initialItemIndex,
    open,
    onClose,
    fullScreen,
    container,
    renderActions,
    renderItemPreview,
    renderActiveItemInfo,
    renderBody,
    modalClassName,
    className,
    headerClassName,
    activeItemInfoClassName,
    footerClassName,
    bodyClassName,
    theme = 'dark',
}: GalleryProps<ItemType>) => {
    const {activeItemIndex, setActiveItemIndex, handleGoToNext, handleGoToPrevious} = useNavigation(
        {
            itemsCount: items.length,
            initialItemIndex,
            selectedPreviewItemClass: `.${cnGallery('preview-list-item')}_selected`,
        },
    );

    const activeItem = items[activeItemIndex] || items[0];

    if (!items.length) {
        return null;
    }

    return (
        <Modal
            container={container}
            className={cnGallery({mode: fullScreen ? 'full-screen' : 'default'}, modalClassName)}
            open={open}
            onClose={onClose}
            disableEscapeKeyDown={fullScreen}
        >
            <ThemeProvider theme={theme}>
                <div className={cnGallery('content', className)}>
                    <div className={cnGallery('header', headerClassName)}>
                        <div className={cnGallery('active-item-info', activeItemInfoClassName)}>
                            {activeItem && renderActiveItemInfo?.(activeItem)}
                        </div>
                        <div className={cnGallery('navigation')}>
                            <Button size="l" view="flat" onClick={handleGoToPrevious}>
                                <Icon data={ArrowLeft} />
                            </Button>
                            <Text color="secondary" variant="body-1">
                                {activeItemIndex + 1}/{items.length}
                            </Text>
                            <Button size="l" view="flat" onClick={handleGoToNext}>
                                <Icon data={ArrowRight} />
                            </Button>
                        </div>
                        <div className={cnGallery('actions')}>
                            {renderActions?.(activeItem)}
                            <Button
                                size="l"
                                view="flat"
                                extraProps={{
                                    'aria-label': i18n('close'),
                                }}
                                onClick={onClose}
                            >
                                <Icon data={Xmark} />
                            </Button>
                        </div>
                    </div>
                    <div className={cnGallery('body', bodyClassName)}>
                        {activeItem && renderBody(activeItem)}
                        <button
                            onClick={handleGoToPrevious}
                            type="button"
                            className={cnGallery('body-navigation-button', {
                                direction: 'left',
                            })}
                        />
                        <button
                            onClick={handleGoToNext}
                            type="button"
                            className={cnGallery('body-navigation-button', {
                                direction: 'right',
                            })}
                        />
                    </div>
                    {!fullScreen && (
                        <div className={cnGallery('footer', footerClassName)}>
                            <div className={cnGallery('preview-list')}>
                                {items.map((item, index) => {
                                    const handleClick = () => {
                                        setActiveItemIndex(index);
                                    };

                                    const selected = activeItemIndex === index;

                                    return (
                                        <button
                                            key={index}
                                            onClick={handleClick}
                                            className={cnGallery('preview-list-item', {selected})}
                                        >
                                            {renderItemPreview(item, selected)}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </ThemeProvider>
        </Modal>
    );
};
