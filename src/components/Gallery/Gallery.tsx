import * as React from 'react';

import type {ModalProps} from '@gravity-ui/uikit';
import {Modal, useMobile} from '@gravity-ui/uikit';

import type {GalleryItemProps} from './GalleryItem';
import {GalleryFallbackText} from './components/FallbackText';
import {GalleryHeader} from './components/GalleryHeader/GalleryHeader';
import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {BODY_CONTENT_CLASS_NAME, cnGallery} from './constants';
import {GalleryContextProvider} from './contexts/GalleryContext';
import {useFullScreen} from './hooks/useFullScreen';
import {useMobileGestures} from './hooks/useMobileGestures/useMobileGestures';
import {useNavigation} from './hooks/useNavigation';
import {i18n} from './i18n';
import type {GalleryProps} from './types';
import {getMode} from './utils/getMode';

import './Gallery.scss';

const emptyItems: GalleryItemProps[] = [];

export const Gallery = ({
    initialItemIndex,
    activeItemIndex: activeItemIndexProp,
    onActiveItemIndexChange,
    className,
    children,
    emptyMessage,
    view = 'modal',
    open,
    onOpenChange,
    container,
}: GalleryProps) => {
    const inlineGalleryContainerRef = React.useRef<HTMLDivElement>(null);

    const isMobile = useMobile();
    const {t} = i18n.useTranslation();

    const items = children ? React.Children.map(children, (child) => child.props) : emptyItems;
    const itemsCount = items.length;

    const [itemRefs, setItemRefs] = React.useState<React.RefObject<HTMLButtonElement | null>[]>(
        () => items.map(() => React.createRef()),
    );

    const [hiddenHeader, setHiddenHeader] = React.useState(false);
    const [isViewInteracting, setIsViewInteracting] = React.useState(false);

    React.useEffect(() => {
        setItemRefs(Array.from({length: itemsCount}, () => React.createRef()));
    }, [itemsCount]);

    const {activeItemIndex, setActiveItemIndex, handleGoToNext, handleGoToPrevious} = useNavigation(
        {
            initialItemIndex,
            activeItemIndex: activeItemIndexProp,
            onActiveItemIndexChange,
            itemRefs,
            keyboardScope: inlineGalleryContainerRef,
        },
    );

    React.useEffect(() => {
        setIsViewInteracting(false);
    }, [activeItemIndex]);

    React.useEffect(() => {
        if (isViewInteracting) setHiddenHeader(true);
    }, [isViewInteracting]);

    const {fullScreen, setFullScreen} = useFullScreen();

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
    const [{isSwitching}, {handleTouchStart, handleTouchMove, handleTouchEnd}] = useMobileGestures({
        onSwipeLeft: handleGoToNext,
        onSwipeRight: handleGoToPrevious,
        onTap: handleTap,
        disabled: isViewInteracting,
    });

    const withNavigation = items.length > 1;

    const showNavigationButtons =
        withNavigation && !isMobile && activeItem && !activeItem.interactive && !isViewInteracting;
    const showFooter = !fullScreen && !isMobile;
    const mode = getMode(isMobile, fullScreen);

    const rootClassName = cnGallery(
        {
            mode,
            view,
            interactive: isMobile && activeItem?.interactive,
        },
        className,
    );

    const touchHandlers = isMobile
        ? {
              onTouchStart: handleTouchStart,
              onTouchMove: handleTouchMove,
              onTouchEnd: handleTouchEnd,
          }
        : undefined;

    const content = (
        <div className={cnGallery('content')} {...touchHandlers}>
            <GalleryHeader
                itemName={activeItem?.name}
                actions={activeItem?.actions}
                withNavigation={withNavigation}
                activeItemIndex={activeItemIndex}
                itemsLength={items.length}
                fullScreen={fullScreen}
                onGoToPrevious={handleGoToPrevious}
                onGoToNext={handleGoToNext}
                onUpdateFullScreen={view === 'inline' ? undefined : setFullScreen}
                onClose={view === 'inline' ? undefined : handleClose}
                hidden={hiddenHeader}
                interactive={activeItem?.interactive}
            />
            <div key={activeItemIndex} className={cnGallery('body')}>
                <div
                    className={cnGallery(BODY_CONTENT_CLASS_NAME, {
                        switching: isMobile && isSwitching,
                    })}
                >
                    {!items.length && (
                        <GalleryFallbackText>{emptyMessage ?? t('no-items')}</GalleryFallbackText>
                    )}
                    <GalleryContextProvider
                        onTap={handleTap}
                        onViewInteractionChange={setIsViewInteracting}
                    >
                        {activeItem?.view}
                    </GalleryContextProvider>
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
                                };

                                const selected = activeItemIndex === index;

                                // Narrows RefObject<T | null> back to RefObject<T>
                                // for compatibility with @types/react@18 LegacyRef typing.
                                const buttonRef = itemRefs[
                                    index
                                ] as React.RefObject<HTMLButtonElement>;

                                return (
                                    <button
                                        ref={buttonRef}
                                        type="button"
                                        key={item.id ?? index}
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
    );

    if (view === 'inline') {
        return (
            <div ref={inlineGalleryContainerRef} className={rootClassName}>
                {content}
            </div>
        );
    }

    return (
        <Modal
            container={container}
            className={rootClassName}
            open={open}
            onOpenChange={handleOpenChange}
            style={{
                overflow: mode === 'default' ? 'auto' : 'hidden',
            }}
        >
            {content}
        </Modal>
    );
};
