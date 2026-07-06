import * as React from 'react';

import {useDirection} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';

import './NavigationButton.scss';

const cnNavigationButton = block('gallery-navigation-button');

export type NavigationButtonProps = {
    position: 'start' | 'end';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const NavigationButton = ({position, onClick}: NavigationButtonProps) => {
    const direction = useDirection();
    const {t} = i18n.useTranslation();

    return (
        <button
            onClick={onClick}
            type="button"
            aria-label={position === 'start' ? t('previous') : t('next')}
            className={cnNavigationButton({position, direction})}
        />
    );
};
