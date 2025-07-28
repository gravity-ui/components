import * as React from 'react';

import {useDirection} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import './NavigationButton.scss';

const cnNavigationButton = block('gallery-navigation-button');

export type NavigationButtonProps = {
    position: 'start' | 'end';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const NavigationButton = ({position, onClick}: NavigationButtonProps) => {
    const direction = useDirection();

    return (
        <button
            onClick={onClick}
            type="button"
            className={cnNavigationButton({position, direction})}
        />
    );
};
