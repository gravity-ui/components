import type {ButtonSize, InputControlSize} from '@gravity-ui/uikit';

export const getCopyButtonSizeAndIconButtonSize = (
    textInputSize: InputControlSize,
): {copyButtonSize: ButtonSize; iconSize: number} => {
    let copyButtonSize: ButtonSize = 's';
    let iconSize = 16;

    switch (textInputSize) {
        case 's': {
            copyButtonSize = 'xs';
            iconSize = 12;
            break;
        }
        case 'l': {
            copyButtonSize = 'm';
            break;
        }
        case 'xl': {
            copyButtonSize = 'l';
            iconSize = 20;
        }
    }

    return {copyButtonSize, iconSize};
};
