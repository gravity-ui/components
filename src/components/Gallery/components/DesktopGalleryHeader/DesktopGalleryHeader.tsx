import * as React from 'react';

import {ArrowLeft, ArrowRight, Xmark} from '@gravity-ui/icons';
import type {ButtonProps} from '@gravity-ui/uikit';
import {ActionTooltip, Button, Flex, Icon, Text, useDirection} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction} from '../../GalleryItem';
import {i18n} from '../../i18n';
import {FullScreenAction} from '../actions';

import './DesktopGalleryHeader.scss';

const cnDesktopGalleryHeader = block('desktop-gallery-header');

export type DesktopGalleryHeaderProps = {
    itemName?: React.ReactNode;
    actions?: GalleryItemAction[];
    withNavigation: boolean;
    activeItemIndex: number;
    itemsLength: number;
    fullScreen: boolean;
    onGoToPrevious: () => void;
    onGoToNext: () => void;
    onUpdateFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
};

export const DesktopGalleryHeader = ({
    itemName,
    actions,
    withNavigation,
    activeItemIndex,
    itemsLength,
    fullScreen,
    onGoToPrevious,
    onGoToNext,
    onUpdateFullScreen,
    onClose,
}: DesktopGalleryHeaderProps) => {
    const direction = useDirection();
    const {t} = i18n.useTranslation();

    return (
        <Flex
            alignItems="start"
            justifyContent="space-between"
            className={cnDesktopGalleryHeader({'full-screen': fullScreen})}
        >
            <div className={cnDesktopGalleryHeader('active-item-info')}>{itemName}</div>
            {withNavigation && (
                <div className={cnDesktopGalleryHeader('navigation')}>
                    <Button size="l" view="flat" onClick={onGoToPrevious}>
                        <Icon data={direction === 'rtl' ? ArrowRight : ArrowLeft} />
                    </Button>
                    <Text color="secondary" variant="body-1">
                        {activeItemIndex + 1} / {itemsLength}
                    </Text>
                    <Button size="l" view="flat" onClick={onGoToNext}>
                        <Icon data={direction === 'rtl' ? ArrowLeft : ArrowRight} />
                    </Button>
                </div>
            )}
            <div className={cnDesktopGalleryHeader('actions')}>
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
                <Button size="l" view="flat" aria-label={t('close')} onClick={onClose}>
                    <Icon data={Xmark} />
                </Button>
            </div>
        </Flex>
    );
};
