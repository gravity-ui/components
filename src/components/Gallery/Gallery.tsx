import * as React from 'react';

import {ArrowLeft, ArrowRight, Xmark} from '@gravity-ui/icons';
import type {ButtonProps, ModalProps} from '@gravity-ui/uikit';
import {ActionTooltip, Button, Icon, Modal, Text, useDirection} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import type {GalleryItemProps} from './GalleryItem';
import {GalleryFallbackText} from './components/FallbackText';
import {NavigationButton} from './components/NavigationButton/NavigationButton';
import {FullScreenAction} from './components/actions';
import {useFullScreen} from './hooks/useFullScreen';
import type {UseNavigationProps} from './hooks/useNavigation';
import {useNavigation} from './hooks/useNavigation';
import {i18n} from './i18n';

import './Gallery.scss';

const cnGallery = block('gallery');

const emptyItems: GalleryItemProps[] = [];

export type GalleryProps = {
    className?: string;
    children?: React.ReactElement<GalleryItemProps>[];
    emptyMessage?: string;
} & Pick<ModalProps, 'open' | 'container' | 'onOpenChange'> &
    Pick<UseNavigationProps, 'initialItemIndex'>;

export const Gallery = ({
    initialItemIndex,
    open,
    onOpenChange,
    container,
    className,
    children,
    emptyMessage,
}: GalleryProps) => {
    const direction = useDirection();

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

    return (
        <Modal
            container={container}
            className={cnGallery({mode: fullScreen ? 'full-screen' : 'default'}, className)}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <div className={cnGallery('content')}>
                <div className={cnGallery('header')}>
                    <div className={cnGallery('active-item-info')}>{activeItem?.name}</div>
                    {items.length > 0 && (
                        <div className={cnGallery('navigation')}>
                            <Button size="l" view="flat" onClick={handleGoToPrevious}>
                                <Icon data={direction === 'rtl' ? ArrowRight : ArrowLeft} />
                            </Button>
                            <Text color="secondary" variant="body-1">
                                {activeItemIndex + 1}/{items.length}
                            </Text>
                            <Button size="l" view="flat" onClick={handleGoToNext}>
                                <Icon data={direction === 'rtl' ? ArrowLeft : ArrowRight} />
                            </Button>
                        </div>
                    )}
                    <div className={cnGallery('actions')}>
                        {activeItem?.actions?.map((action) => {
                            const buttonProps: ButtonProps = {
                                type: 'button',
                                size: 'l',
                                view: 'flat',
                                onClick: action.onClick,
                                href: action.href,
                                target: '__blank',
                                'aria-label': action.title,
                                children: action.icon,
                            };

                            return action.render ? (
                                <React.Fragment key={action.id}>
                                    {action.render(buttonProps)}
                                </React.Fragment>
                            ) : (
                                <ActionTooltip
                                    key={action.id}
                                    title={action.title}
                                    hotkey={action.hotkey}
                                >
                                    <Button {...buttonProps} />
                                </ActionTooltip>
                            );
                        })}
                        <FullScreenAction
                            key="full-screen"
                            fullScreen={fullScreen}
                            onUpdateFullScreen={setFullScreen}
                        />
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
                        <GalleryFallbackText>
                            {emptyMessage ?? i18n('no-items')}
                        </GalleryFallbackText>
                    )}
                    {activeItem?.view}
                    {activeItem && !activeItem.interactive && (
                        <React.Fragment>
                            <NavigationButton onClick={handleGoToPrevious} position="start" />
                            <NavigationButton onClick={handleGoToNext} position="end" />
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
                    </div>
                )}
            </div>
        </Modal>
    );
};
