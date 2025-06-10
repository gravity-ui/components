import * as React from 'react';

import type {ModalProps} from '@gravity-ui/uikit';
import {Modal, useMobile} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import type {GalleryItemProps} from './GalleryItem';
import {GalleryFallbackText} from './components/FallbackText';
import {GalleryHeader} from './components/GalleryHeader/GalleryHeader';
import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {ZoomProvider} from './contexts/ZoomContext';
import {useFullScreen} from './hooks/useFullScreen';
import {useMobileGestures} from './hooks/useMobileGestures';
import type {UseNavigationProps} from './hooks/useNavigation';
import {useNavigation} from './hooks/useNavigation';
import {i18n} from './i18n';

import './Gallery.scss';

const cnGallery = block('gallery');

const emptyItems: GalleryItemProps[] = [];

export type GalleryProps = {
    className?: string;
    children?: React.ReactElement<GalleryItemProps>[] | React.ReactElement<GalleryItemProps>;
    emptyMessage?: string;
} & Pick<ModalProps, 'open' | 'container' | 'onOpenChange'> &
    Pick<UseNavigationProps, 'initialItemIndex'>;

const getMode = (isMobile: boolean, fullScreen: boolean) => {
    if (fullScreen) {
        return 'full-screen';
    }

    return isMobile ? 'mobile' : 'default';
};

export const Gallery = ({
    initialItemIndex,
    open,
    onOpenChange,
    container,
    className,
    children,
    emptyMessage,
}: GalleryProps) => {
    const isMobile = useMobile();

    const items = children ? React.Children.map(children, (child) => child.props) : emptyItems;
    const itemsCount = items.length;

    const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLButtonElement>[]>(() =>
        items.map(() => React.createRef()),
    );

    React.useEffect(() => {
        setItemRefs(Array.from({length: itemsCount}, () => React.createRef()));
    }, [itemsCount]);

    const {activeItemIndex, setActiveItemIndex, handleGoToNext, handleGoToPrevious} = useNavigation(
        {
            initialItemIndex,
            itemRefs,
        },
    );

    const {fullScreen, setFullScreen} = useFullScreen();

    const [hiddenHeader, setHiddenHeader] = React.useState(false);

    const handleBackClick = React.useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);

    const handleClose = React.useCallback(() => {
        onOpenChange?.(false);
        setFullScreen(false);
    }, [onOpenChange, setFullScreen]);

    const handleOpenChange = React.useCallback<NonNullable<ModalProps['onOpenChange']>>(
        (nextOpen, event, reason) => {
            setFullScreen(false);

            if (fullScreen && reason === 'escape-key') {
                return;
            }

            onOpenChange?.(nextOpen, event, reason);
        },
        [onOpenChange, fullScreen, setFullScreen],
    );

    const activeItem = items[activeItemIndex] || items[0];

    const handleTap = React.useCallback(() => {
        if (!activeItem?.interactive) {
            setHiddenHeader((prevValue) => !prevValue);
        }
    }, [activeItem?.interactive]);

    // Mobile gestures for the entire gallery
    const [
        {scale, position, isSwitching},
        {resetZoom, handleTouchStart, handleTouchMove, handleTouchEnd, handleDoubleClick},
    ] = useMobileGestures({
        onSwipeLeft: handleGoToNext,
        onSwipeRight: handleGoToPrevious,
        onTap: handleTap,
        enableSwitchAnimation: isMobile,
    });

    const enhancedActiveView = React.useMemo(() => {
        if (!activeItem?.view) return null;

        const view = activeItem.view;
        if (
            isMobile &&
            React.isValidElement(view) &&
            typeof view.type === 'function' &&
            view.type.name === 'ImageView'
        ) {
            return (
                <ZoomProvider
                    value={{
                        scale,
                        position,
                        onDoubleClick: handleDoubleClick,
                    }}
                >
                    {view}
                </ZoomProvider>
            );
        }

        return view;
    }, [activeItem?.view, isMobile, scale, position, handleDoubleClick]);

    const withNavigation = items.length > 1;

    const showNavigationButtons =
        withNavigation && !isMobile && activeItem && !activeItem.interactive;
    const showFooter = !fullScreen && !isMobile;

    return (
        <Modal
            container={container}
            className={cnGallery(
                {
                    mode: getMode(isMobile, fullScreen),
                    interactive: isMobile && activeItem?.interactive,
                },
                className,
            )}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <div
                className={cnGallery('content')}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
            >
                <GalleryHeader
                    itemName={activeItem?.name}
                    actions={activeItem?.actions}
                    withNavigation={withNavigation}
                    activeItemIndex={activeItemIndex}
                    itemsLength={items.length}
                    fullScreen={fullScreen}
                    onBackClick={handleBackClick}
                    onGoToPrevious={handleGoToPrevious}
                    onGoToNext={handleGoToNext}
                    onUpdateFullScreen={setFullScreen}
                    onClose={handleClose}
                    hidden={hiddenHeader}
                    interactive={activeItem?.interactive}
                />
                <div key={activeItemIndex} className={cnGallery('body')}>
                    <div
                        className={cnGallery('body-content', {switching: isMobile && isSwitching})}
                    >
                        {!items.length && (
                            <GalleryFallbackText>
                                {emptyMessage ?? i18n('no-items')}
                            </GalleryFallbackText>
                        )}
                        {enhancedActiveView}
                        {showNavigationButtons && (
                            <React.Fragment>
                                <NavigationButton onClick={handleGoToPrevious} position="start" />
                                <NavigationButton onClick={handleGoToNext} position="end" />
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {showFooter && (
                    <div className={cnGallery('footer')}>
                        {withNavigation && (
                            <div className={cnGallery('preview-list')}>
                                {items.map((item, index) => {
                                    const handleClick = () => {
                                        setActiveItemIndex(index);

                                        // Reset zoom when changing items
                                        if (isMobile && !isSwitching && index !== activeItemIndex) {
                                            resetZoom();
                                        }
                                    };

                                    const selected = activeItemIndex === index;

                                    return (
                                        <button
                                            ref={itemRefs[index]}
                                            type="button"
                                            key={index}
                                            onClick={handleClick}
                                            className={cnGallery('preview-list-item', {selected})}
                                        >
                                            {item.thumbnail}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
};
