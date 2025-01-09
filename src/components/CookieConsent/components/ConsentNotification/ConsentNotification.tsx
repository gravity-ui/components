import * as React from 'react';

import {Alert, Button, Link, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';

import {ConsentNotificationProps} from './types';

import './ConsentNotification.scss';

const b = block('consent-notification');

export const ConsentNotification = ({
    policyLink,
    onAction,
    className,
    policyLinkText = i18n('label_policy'),
    text = i18n('label_text'),
    buttonOkText = i18n('button_OK'),
}: ConsentNotificationProps) => {
    const mobile = useMobile();
    const onClick = () => {
        onAction('All');
    };
    const message = (
        <React.Fragment>
            <span className={b('text')}>{text}</span>
            {policyLink ? (
                <span className={b('text')}>
                    {i18n('details_text')}{' '}
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
