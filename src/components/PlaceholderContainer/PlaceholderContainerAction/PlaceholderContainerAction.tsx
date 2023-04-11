import React from 'react';

import {Button, ButtonSize, ButtonView} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import './PlaceholderContainerAction.scss';

const b = block('placeholder-container-action');

export interface Action {
    text: string;
    loading?: boolean;
    disabled?: boolean;
    view?: ButtonView;
    size?: ButtonSize;
    handler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
}

interface PlaceholderContainerActionProps {
    action: Action;
}

export const PlaceholderContainerAction = ({action}: PlaceholderContainerActionProps) => {
    const {text, handler, loading, disabled, view = 'normal', size = 'm', href} = action;

    return (
        <div className={b('button')}>
            <Button
                className={b('action-btn')}
                view={view}
                size={size}
                loading={loading}
                disabled={disabled}
                onClick={handler}
                href={href}
            >
                {text}
            </Button>
        </div>
    );
};
