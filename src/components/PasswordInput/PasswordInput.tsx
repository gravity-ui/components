import React from 'react';

import {Copy, CopyCheck, Eye, EyeSlash} from '@gravity-ui/icons';
import {
    Button,
    CopyToClipboard,
    CopyToClipboardStatus,
    Icon,
    TextInput,
    TextInputProps,
} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import './PasswordInput.scss';

const b = block('password-input');

export type PasswordInputProps = Required<Pick<TextInputProps, 'onUpdate' | 'value'>> &
    Omit<TextInputProps, 'type'> & {
        /** Show copy button */
        showCopyButton?: boolean;
        /** Show visibility button */
        showVisibilityButton?: boolean;
    };

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    const {autoComplete, value, showCopyButton, rightContent, showVisibilityButton, className} =
        props;

    const [hideValue, setHideValue] = React.useState(true);

    const additionalRightContent = React.useMemo(() => {
        if (!showVisibilityButton && !showCopyButton) {
            return <React.Fragment>{rightContent}</React.Fragment>;
        }

        const onClick = () => {
            setHideValue((hideValue) => !hideValue);
        };

        return (
            <div className={b('additional-right-content')}>
                {rightContent}
                {value && showCopyButton ? (
                    <CopyToClipboard text={String(value)} timeout={500}>
                        {(state) => (
                            <Button view="flat-secondary" className={b('button')} size="s">
                                <Icon
                                    size={14}
                                    data={
                                        state === CopyToClipboardStatus.Pending ? Copy : CopyCheck
                                    }
                                />
                            </Button>
                        )}
                    </CopyToClipboard>
                ) : null}
                {showVisibilityButton ? (
                    <Button
                        view="flat-secondary"
                        onClick={onClick}
                        className={b('button')}
                        size="s"
                    >
                        <Icon data={hideValue ? Eye : EyeSlash} size={14} />
                    </Button>
                ) : null}
            </div>
        );
    }, [rightContent, value, showCopyButton, showVisibilityButton, hideValue]);

    return (
        <TextInput
            {...props}
            type={hideValue ? 'password' : 'text'}
            rightContent={additionalRightContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
            className={b('input', className)}
        />
    );
};
