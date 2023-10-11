import React from 'react';

import {Eye, EyeSlash} from '@gravity-ui/icons';
import {Button, ClipboardButton, TextInput, TextInputProps, Tooltip} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n';

import './PasswordInput.scss';

const b = block('password-input');

export type PasswordInputProps = Required<Pick<TextInputProps, 'onUpdate' | 'value'>> &
    Omit<TextInputProps, 'type'> & {
        /** Show copy button */
        showCopyButton?: boolean;
        /** Show reveal button */
        showRevealButton?: boolean;
        /** Disable tooltip. Tooltip won't be shown */
        hasTooltip?: boolean;
    };

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const {
        autoComplete,
        value,
        showCopyButton,
        rightContent,
        showRevealButton,
        size = 'm',
        hasTooltip = true,
    } = props;

    const [hideValue, setHideValue] = React.useState(true);

    const additionalRightContent = React.useMemo(() => {
        if (!showRevealButton && !showCopyButton) {
            return <React.Fragment>{rightContent}</React.Fragment>;
        }

        const onClick = () => {
            setHideValue((hideValue) => !hideValue);
        };

        return (
            <div className={b('additional-right-content')}>
                {rightContent}
                {value && showCopyButton ? (
                    <ClipboardButton
                        text={value}
                        hasTooltip={hasTooltip}
                        size={16}
                        className={b('copy-button')}
                    />
                ) : null}
                {showRevealButton ? (
                    <Tooltip
                        disabled={!hasTooltip}
                        content={
                            hideValue ? i18n('label_show-password') : i18n('label_hide-password')
                        }
                    >
                        <Button
                            view="flat-secondary"
                            onClick={onClick}
                            size={size}
                            extraProps={{
                                'aria-label': hideValue
                                    ? i18n('label_show-password')
                                    : i18n('label_hide-password'),
                            }}
                        >
                            <Button.Icon>{hideValue ? <Eye /> : <EyeSlash />}</Button.Icon>
                        </Button>
                    </Tooltip>
                ) : null}
            </div>
        );
    }, [showRevealButton, showCopyButton, rightContent, value, hasTooltip, hideValue, size]);

    return (
        <TextInput
            {...props}
            type={hideValue ? 'password' : 'text'}
            rightContent={additionalRightContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
            controlProps={{
                className: b(),
            }}
        />
    );
};
