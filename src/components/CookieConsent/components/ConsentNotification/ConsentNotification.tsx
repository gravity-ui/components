import * as React from 'react';

import {Alert, Button, Link, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';

import {ConsentNotificationProps} from './types';

import './ConsentNotification.scss';

const b = block('consent-notification');

export const ConsentNotification = (props: ConsentNotificationProps) => {
    const {t} = i18n.useTranslation();

    const {
        policyLink,
        onAction,
        className,
        policyLinkText = t('label_policy'),
        text = t('label_text'),
        buttonOkText = t('button_OK'),
    } = props;

    const mobile = useMobile();
    const onClick = () => {
        onAction('All');
    };
    const message = (
        <React.Fragment>
            <span className={b('text')}>{text}</span>
            {policyLink ? (
                <span className={b('text')}>
                    {t('details_text')}{' '}
                    <Link href={policyLink} target="_blank">
                        {policyLinkText}
                    </Link>
                    .
                </span>
            ) : null}
        </React.Fragment>
    );
    const actions = (
        <Button className={b('button')} onClick={onClick} size="l" view="action">
            {buttonOkText}
        </Button>
    );

    return (
        <Alert
            className={b({type: mobile ? 'mobile' : 'default'}, className)}
            theme="normal"
            view="filled"
            message={message}
            actions={actions}
        />
    );
};
