import * as React from 'react';

import {ChevronLeft, Ellipsis} from '@gravity-ui/icons';
import {Button, Flex, Icon, Text} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction} from '../../GalleryItem';
import {i18n} from '../../i18n';
import {MOBILE_ICON_SIZE} from '../GalleryHeader/constants';
import {MobileGalleryActions} from '../MobileGalleryActions/MobileGalleryActions';

import './MobileGalleryHeader.scss';

const cnGalleryHeaderMobile = block('gallery-header-mobile');
export type MobileGalleryHeaderProps = {
    itemName?: React.ReactNode;
    actions?: GalleryItemAction[];
    withNavigation: boolean;
    activeItemIndex: number;
    itemsLength: number;
    onBackClick: () => void;
    hidden?: boolean;
    interactive?: boolean;
};

export const MobileGalleryHeader = ({
    itemName,
    actions,
    withNavigation,
    activeItemIndex,
    itemsLength,
    onBackClick,
    hidden,
    interactive,
}: MobileGalleryHeaderProps) => {
    const [mobileActionsOpen, setMobileActionsOpen] = React.useState(false);

    const handleMobileActionClose = React.useCallback(() => {
        setMobileActionsOpen(false);
    }, []);

    const handleMobileActionClick = React.useCallback(() => {
        setMobileActionsOpen(true);
    }, []);

    const isPanelsHidden = hidden && !interactive;

    return (
        <React.Fragment>
            <div
                className={cnGalleryHeaderMobile('header', {
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

            <Flex
                alignItems="center"
                justifyContent="center"
                className={cnGalleryHeaderMobile('footer', {
                    hidden: isPanelsHidden,
                    interactive,
                })}
            >
                {itemName}
            </Flex>

            {mobileActionsOpen && (
                <MobileGalleryActions
                    open={mobileActionsOpen}
                    actions={actions}
                    onClose={handleMobileActionClose}
                />
            )}
        </React.Fragment>
    );
};
