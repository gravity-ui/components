import * as React from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {ActionTooltip, Button, Icon} from '@gravity-ui/uikit';
import type {ButtonButtonProps} from '@gravity-ui/uikit';

import {i18n} from './i18n';

export type FullScreenActionProps = {
    fullScreen: boolean;
    onUpdateFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
} & Omit<ButtonButtonProps, 'onClick'>;

export const FullScreenAction = React.memo(
    ({fullScreen, onUpdateFullScreen, ...buttonProps}: FullScreenActionProps) => {
        const {t} = i18n.useTranslation();

        const handleToggleFullScreen = React.useCallback(() => {
            onUpdateFullScreen((value) => !value);
        }, [onUpdateFullScreen]);

        return (
            <ActionTooltip
                title={fullScreen ? t('exit-full-screen') : t('enter-full-screen')}
                hotkey="Shift+F"
            >
                <Button
                    type="button"
                    size="l"
                    view="flat"
                    onClick={handleToggleFullScreen}
                    aria-label={fullScreen ? t('exit-full-screen') : t('enter-full-screen')}
                    {...buttonProps}
                >
                    <Icon data={fullScreen ? ChevronsCollapseUpRight : ChevronsExpandUpRight} />
                </Button>
            </ActionTooltip>
        );
    },
);

FullScreenAction.displayName = 'FullScreenAction';
