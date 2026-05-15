import * as React from 'react';

import {ArrowRotateRight} from '@gravity-ui/icons';
import {ActionTooltip, Button, Icon} from '@gravity-ui/uikit';
import type {ButtonProps} from '@gravity-ui/uikit';

import type {GalleryItemAction} from '../GalleryItem';
import {useGalleryContext} from '../contexts/GalleryContext';
import type {TProps} from '../i18n';

type GetGalleryItemRotateRightActionArgs = {
    /** Custom icon for the rotate-right button. Defaults to ArrowRotateRight. */
    icon?: React.ReactNode;
};

type RotateRightButtonProps = {
    buttonProps: ButtonProps;
    icon?: React.ReactNode;
    title: string;
};

const RotateRightButton = ({buttonProps, icon, title}: RotateRightButtonProps) => {
    const {rotateRight} = useGalleryContext();
    return (
        <ActionTooltip title={title}>
            <Button {...buttonProps} onClick={rotateRight}>
                {icon ?? <Icon data={ArrowRotateRight} />}
            </Button>
        </ActionTooltip>
    );
};

export function getGalleryItemRotateRightAction({
    icon,
}: GetGalleryItemRotateRightActionArgs = {}): GalleryItemAction {
    return {
        id: 'rotate-right',
        title: 'rotate-right',
        __titleT: ({t}) => t('rotate-right'),
        icon: icon ?? <Icon data={ArrowRotateRight} />,
        __renderT: (buttonProps: ButtonProps, {t}: TProps) => (
            <RotateRightButton buttonProps={buttonProps} icon={icon} title={t('rotate-right')} />
        ),
    };
}
