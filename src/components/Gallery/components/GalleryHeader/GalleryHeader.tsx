import * as React from 'react';

import {ArrowLeft, ArrowRight, Xmark} from '@gravity-ui/icons';
import type {ButtonProps} from '@gravity-ui/uikit';
import {ActionTooltip, Button, Flex, Icon, Text, useDirection, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction} from '../../GalleryItem';
import {i18n} from '../../i18n';
import {MobileGalleryHeader} from '../MobileGalleryHeader/MobileGalleryHeader';
import {FullScreenAction} from '../actions';

import './GalleryHeader.scss';

const cnGalleryHeader = block('gallery-header');

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
    const direction = useDirection();
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
        <Flex
            alignItems="start"
            justifyContent="space-between"
            className={cnGalleryHeader({'full-screen': fullScreen})}
        >
            <div className={cnGalleryHeader('active-item-info')}>{itemName}</div>
            {withNavigation && (
                <div className={cnGalleryHeader('navigation')}>
                    <Button size="l" view="flat" onClick={onGoToPrevious}>
                        <Icon data={direction === 'rtl' ? ArrowRight : ArrowLeft} />
                    </Button>
                    <Text color="secondary" variant="body-1">
                        {activeItemIndex + 1}/{itemsLength}
                    </Text>
                    <Button size="l" view="flat" onClick={onGoToNext}>
                        <Icon data={direction === 'rtl' ? ArrowLeft : ArrowRight} />
                    </Button>
                </div>
            )}
            <div className={cnGalleryHeader('actions')}>
                {actions?.map((action) => {
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
                        <ActionTooltip key={action.id} title={action.title} hotkey={action.hotkey}>
                            <Button {...buttonProps} />
                        </ActionTooltip>
                    );
                })}
                <FullScreenAction
                    key="full-screen"
                    fullScreen={fullScreen}
                    onUpdateFullScreen={onUpdateFullScreen}
                />
                <Button size="l" view="flat" aria-label={i18n('close')} onClick={onClose}>
                    <Icon data={Xmark} />
                </Button>
            </div>
        </Flex>
    );
};
