import {Button, Portal} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';

import {SimpleConsentProps} from './types';

import './SimpleConsent.scss';

const b = block('simple-consent');
const buttons = ['decline', 'accept'] as const;

export const SimpleConsent = (props: SimpleConsentProps) => {
    const {
        className,
        text = i18n('label_text'),
        buttonAcceptText = i18n('button_accept'),
        buttonDeclineText = i18n('button_decline'),
        onAction,
    } = props;

    const onClick = (isAll: boolean) => {
        return () => {
            onAction(isAll ? 'All' : 'OnlyNecessary');
        };
    };

    return (
        <Portal>
            <div className={b(null, className)}>
                <div className={b('container')}>
                    <span className={b('text')}>{text}</span>
                    <div className={b('buttons')}>
                        {buttons.map((button) => (
                            <Button
                                key={button}
                                className={b('button')}
                                onClick={onClick(button === 'accept')}
                                size="xl"
                                view={button === 'accept' ? 'action' : 'outlined'}
                            >
                                {button === 'accept' ? buttonAcceptText : buttonDeclineText}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
