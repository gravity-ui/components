import type {ButtonSize, InputControlSize} from '@gravity-ui/uikit';

export const getActionButtonSizeAndIconSize = (
    textInputSize: InputControlSize,
): {actionButtonSize: ButtonSize; iconSize: number} => {
    let actionButtonSize: ButtonSize = 's';
    let iconSize = 16;

    switch (textInputSize) {
        case 's': {
            actionButtonSize = 'xs';
            iconSize = 12;
            break;
        }
        case 'l': {
            actionButtonSize = 'm';
            break;
        }
        case 'xl': {
            actionButtonSize = 'l';
        }
    }

    return {actionButtonSize, iconSize};
};
