import * as React from 'react';

import {ArrowRotateLeft} from '@gravity-ui/icons';
import {ActionTooltip, Button, Icon} from '@gravity-ui/uikit';
import type {ButtonProps} from '@gravity-ui/uikit';

import type {GalleryItemAction} from '../GalleryItem';
import {useGalleryContext} from '../contexts/GalleryContext';
import type {TProps} from '../i18n';

type GetGalleryItemRotateLeftActionArgs = {
    /** Custom icon for the rotate-left button. Defaults to ArrowRotateLeft. */
    icon?: React.ReactNode;
};

type RotateLeftButtonProps = {
    buttonProps: ButtonProps;
    icon?: React.ReactNode;
    title: string;
};

const RotateLeftButton = ({buttonProps, icon, title}: RotateLeftButtonProps) => {
    const {rotateLeft} = useGalleryContext();
    return (
        <ActionTooltip title={title}>
            <Button {...buttonProps} onClick={rotateLeft}>
                {icon ?? <Icon data={ArrowRotateLeft} />}
            </Button>
        </ActionTooltip>
    );
};

export function getGalleryItemRotateLeftAction({
    icon,
}: GetGalleryItemRotateLeftActionArgs = {}): GalleryItemAction {
    return {
        id: 'rotate-left',
        title: 'rotate-left',
        __titleT: ({t}) => t('rotate-left'),
        icon: icon ?? <Icon data={ArrowRotateLeft} />,
        __renderT: (buttonProps: ButtonProps, {t}: TProps) => (
            <RotateLeftButton buttonProps={buttonProps} icon={icon} title={t('rotate-left')} />
        ),
    };
}
