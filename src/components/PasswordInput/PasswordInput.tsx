import React from 'react';

import {Eye, EyeSlash} from '@gravity-ui/icons';
import {Button, ClipboardButton, Icon, TextInput, TextInputProps, Tooltip} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n';
import {getCopyButtonSizeAndIconSize} from './utils';

import './PasswordInput.scss';

const b = block('password-input');

export type PasswordInputProps = Required<Pick<TextInputProps, 'onUpdate' | 'value'>> &
    Omit<TextInputProps, 'type'> & {
        /** Show copy button */
        showCopyButton?: boolean;
        /** Show reveal button */
        showRevealButton?: boolean;
        /** Disable the tooltip for the copy button. The tooltip will not be displayed */
        hasCopyTooltip?: boolean;
        /** Disable the tooltip for the reveal button. The tooltip will not be displayed */
        hasRevealTooltip?: boolean;
    };

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const {
        autoComplete,
        value,
        showCopyButton,
        rightContent,
        showRevealButton,
        size = 'm',
        hasCopyTooltip = true,
        hasRevealTooltip = true,
        controlProps,
    } = props;

    const [hideValue, setHideValue] = React.useState(true);

    const additionalRightContent = React.useMemo(() => {
        if (!showRevealButton && !showCopyButton) {
            return <React.Fragment>{rightContent}</React.Fragment>;
        }

        const onClick = () => {
            setHideValue((hideValue) => !hideValue);
        };

        const {copyButtonSize, iconSize} = getCopyButtonSizeAndIconSize(size);

        return (
            <div className={b('additional-right-content')}>
                {rightContent}
                {value && showCopyButton ? (
                    <ClipboardButton
                        text={value}
                        hasTooltip={hasRevealTooltip}
                        size={iconSize}
                        className={b('copy-button')}
                    />
                ) : null}
                {showRevealButton ? (
                    <Tooltip
                        disabled={!hasCopyTooltip}
                        content={
                            hideValue ? i18n('label_show-password') : i18n('label_hide-password')
                        }
                    >
                        <Button
                            view="flat-secondary"
                            onClick={onClick}
                            size={copyButtonSize}
                            extraProps={{
                                'aria-label': hideValue
                                    ? i18n('label_show-password')
                                    : i18n('label_hide-password'),
                            }}
                        >
                            <Icon data={hideValue ? Eye : EyeSlash} size={iconSize} />
                        </Button>
                    </Tooltip>
                ) : null}
            </div>
        );
    }, [
        showRevealButton,
        showCopyButton,
        rightContent,
        value,
        hasRevealTooltip,
        hasCopyTooltip,
        hideValue,
        size,
    ]);

    return (
        <TextInput
            {...props}
            type={hideValue ? 'password' : 'text'}
            rightContent={additionalRightContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
            controlProps={{
                ...controlProps,
                className: b('input-control', controlProps?.className),
            }}
        />
    );
};
