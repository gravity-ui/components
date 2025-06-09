import * as React from 'react';

import {ArrowLeft, ArrowRight, ChevronLeft, Ellipsis, Xmark} from '@gravity-ui/icons';
import type {ButtonProps} from '@gravity-ui/uikit';
import {
    ActionTooltip,
    Button,
    Flex,
    Icon,
    Text,
    spacing,
    useDirection,
    useMobile,
} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction} from '../../GalleryItem';
import {i18n} from '../../i18n';
import {FullScreenAction} from '../actions';

import {MobileGalleryActions} from './MobileGalleryActions/MobileGalleryActions';

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

const MOBILE_ICON_SIZE = 20;

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

    const [mobileActionsOpen, setMobileActionsOpen] = React.useState(false);

    if (isMobile) {
        const handleMobileActionClose = () => {
            setMobileActionsOpen(false);
        };

        const handleMobileActionClick = () => {
            setMobileActionsOpen(true);
        };

        const isPanelsHidden = hidden && !interactive;

        return (
            <React.Fragment>
                <div
                    className={cnGalleryHeader('mobile-header', {
                        hidden: isPanelsHidden,
                        interactive,
                    })}
                >
                    <Button
                        size="xl"
                        view="flat"
                        onClick={onBackClick}
                        aria-label={i18n('back')}
                        color="primary"
                    >
                        <Icon size={MOBILE_ICON_SIZE} data={ChevronLeft} />
                    </Button>

                    {withNavigation && (
                        <Text color="primary" variant="subheader-2">
                            {activeItemIndex + 1}/{itemsLength}
                        </Text>
                    )}

                    {actions?.length && (
                        <Button
                            size="xl"
                            view="flat"
                            onClick={handleMobileActionClick}
                            aria-label={i18n('close')}
                            color="primary"
                        >
                            <Icon size={MOBILE_ICON_SIZE} data={Ellipsis} />
                        </Button>
                    )}
                </div>
                {withNavigation && (
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        className={cnGalleryHeader('mobile-footer', {
                            hidden: isPanelsHidden,
                            interactive,
                        })}
                    >
                        {itemName}
                    </Flex>
                )}
                {mobileActionsOpen && (
                    <MobileGalleryActions
                        open={mobileActionsOpen}
                        actions={actions}
                        onClose={handleMobileActionClose}
                    />
                )}
            </React.Fragment>
        );
    }

    return (
        <Flex
            alignItems="start"
            justifyContent="space-between"
            className={spacing({py: 2, pr: 3, pl: 5})}
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
