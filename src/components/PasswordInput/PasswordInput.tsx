import React from 'react';

import {Eye, EyeSlash} from '@gravity-ui/icons';
import {
    ActionTooltip,
    Button,
    ClipboardButton,
    Icon,
    TextInput,
    TextInputProps,
} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {i18n} from './i18n';
import {getActionButtonSizeAndIconSize} from './utils';

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

export const PasswordInput = (props: PasswordInputProps) => {
    const {
        autoComplete,
        value,
        showCopyButton,
        rightContent,
        endContent,
        showRevealButton,
        size = 'm',
        hasCopyTooltip = true,
        hasRevealTooltip = true,
        controlProps,
    } = props;

    const [hideValue, setHideValue] = React.useState(true);

    const additionalEndContent = React.useMemo(() => {
        if (!showRevealButton && !showCopyButton) {
            return <React.Fragment>{endContent || rightContent}</React.Fragment>;
        }

        const onClick = () => {
            setHideValue((hideValue) => !hideValue);
        };

        const {actionButtonSize, iconSize} = getActionButtonSizeAndIconSize(size);

        return (
            <div className={b('additional-right-content')}>
                {endContent || rightContent}
                {value && showCopyButton ? (
                    <ClipboardButton
                        view="flat-secondary"
                        text={value}
                        hasTooltip={hasRevealTooltip}
                        size={actionButtonSize}
                        className={b('copy-button')}
                    />
                ) : null}
                {showRevealButton ? (
                    <ActionTooltip
                        disabled={!hasCopyTooltip}
                        title={
                            hideValue ? i18n('label_show-password') : i18n('label_hide-password')
                        }
                    >
                        <Button
                            view="flat-secondary"
                            onClick={onClick}
                            size={actionButtonSize}
                            extraProps={{
                                'aria-label': hideValue
                                    ? i18n('label_show-password')
                                    : i18n('label_hide-password'),
                            }}
                        >
                            <Icon data={hideValue ? Eye : EyeSlash} size={iconSize} />
                        </Button>
                    </ActionTooltip>
                ) : null}
            </div>
        );
    }, [
        showRevealButton,
        showCopyButton,
        endContent,
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
            endContent={additionalEndContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
            controlProps={{
                ...controlProps,
                className: b('input-control', controlProps?.className),
            }}
        />
    );
};
