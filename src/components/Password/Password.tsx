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

import './Password.scss';

const b = block('password');

export type PasswordProps = Required<Pick<TextInputProps, 'onUpdate' | 'value'>> &
    Omit<TextInputProps, 'rightContent' | 'type'> & {
        showCopyButton?: boolean;
    };

export const Password: React.FC<PasswordProps> = (props) => {
    const {autoComplete, value, showCopyButton} = props;

    const [hideValue, setHideValue] = React.useState(true);

    const additionalRightContent = React.useMemo(() => {
        const onClick = () => {
            setHideValue((hideValue) => !hideValue);
        };

        return (
            <div className={b()}>
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
                <Button view="flat-secondary" onClick={onClick} className={b('button')} size="s">
                    <Icon data={hideValue ? Eye : EyeSlash} size={14} />
                </Button>
            </div>
        );
    }, [hideValue, value, showCopyButton]);

    return (
        <TextInput
            {...props}
            type={hideValue ? 'password' : 'text'}
            rightContent={additionalRightContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
        />
    );
};
