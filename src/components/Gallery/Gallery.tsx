import * as React from 'react';

import {ArrowLeft, ArrowRight, Xmark} from '@gravity-ui/icons';
import type {ModalProps} from '@gravity-ui/uikit';
import {Button, Icon, Modal, Text, ThemeProvider, useThemeValue} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import type {GalleryItemProps} from './GalleryItem';
import {FilesGalleryFallbackText} from './components/FallbackText';
import type {UseNavigationProps} from './hooks/useNavigation';
import {useNavigation} from './hooks/useNavigation';
import {i18n} from './i18n';
import {getInvertedTheme} from './utils/getInvertedTheme';

import './Gallery.scss';

const cnGallery = block('gallery');

const emptyItems: GalleryItemProps[] = [];

export type GalleryProps = {
    fullScreen?: boolean;
    modalClassName?: string;
    className?: string;
    children?: React.ReactElement<GalleryItemProps>[];
    invertTheme?: boolean;
    noItemsMessage?: string;
} & Pick<ModalProps, 'open' | 'container'> &
    Required<Pick<ModalProps, 'onOpenChange'>> &
    Pick<UseNavigationProps, 'initialItemIndex'>;

export const Gallery = ({
    initialItemIndex,
    open,
    onOpenChange,
    fullScreen,
    container,
    modalClassName,
    className,
    invertTheme,
    children,
    noItemsMessage,
}: GalleryProps) => {
    const items = children ? React.Children.map(children, (child) => child.props) : emptyItems;
    const theme = useThemeValue();

    const {activeItemIndex, setActiveItemIndex, handleGoToNext, handleGoToPrevious} = useNavigation(
        {
            itemsCount: items.length,
            initialItemIndex,
            selectedPreviewItemClass: `.${cnGallery('preview-list-item')}_selected`,
        },
    );

    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    const activeItem = items[activeItemIndex] || items[0];
    console.log(activeItem);
    return (
        <Modal
            container={container}
            className={cnGallery({mode: fullScreen ? 'full-screen' : 'default'}, modalClassName)}
            open={open}
            onOpenChange={onOpenChange}
            disableEscapeKeyDown={fullScreen}
        >
            <ThemeProvider theme={invertTheme ? getInvertedTheme(theme) : theme}>
                <div className={cnGallery('content', className)}>
                    <div className={cnGallery('header')}>
                        <div className={cnGallery('active-item-info')}>{activeItem?.meta}</div>
                        {items.length > 0 && (
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
                        )}
                        <div className={cnGallery('actions')}>
                            {activeItem?.actions}
                            <Button
                                size="l"
                                view="flat"
                                aria-label={i18n('close')}
                                onClick={handleClose}
                            >
                                <Icon data={Xmark} />
                            </Button>
                        </div>
                    </div>
                    <div key={activeItemIndex} className={cnGallery('body')}>
                        {!items.length && (
                            <FilesGalleryFallbackText>
                                {noItemsMessage ?? i18n('no-items')}
                            </FilesGalleryFallbackText>
                        )}
                        {activeItem?.view}
                        {activeItem && !activeItem.interactive && (
                            <React.Fragment>
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
                            </React.Fragment>
                        )}
                    </div>
                    {!fullScreen && (
                        <div className={cnGallery('footer')}>
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
                                            {item.thumbnail}
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
