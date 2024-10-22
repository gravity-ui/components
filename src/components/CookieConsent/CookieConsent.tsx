import React from 'react';

import {block} from '../utils/cn';

import {Consents} from './ConsentManager';
import {ConsentNotification} from './components/ConsentNotification/ConsentNotification';
import {ConsentPopup} from './components/ConsentPopup/ConsentPopup';
import {ConsentPopupStep} from './components/ConsentPopup/types';
import {SimpleConsent} from './components/SimpleConsent/SimpleConsent';
import {CookieConsentProps} from './types';

const b = block('analytics');

export const CookieConsent = ({
    consentManager,
    onConsentPopupClose,
    manageCookies,
    ...popupProps
}: CookieConsentProps) => {
    const [isOpened, setIsOpened] = React.useState(false);

    React.useEffect(() => {
        // Show banner after some timeout so that the user has time to see the service content
        const timeoutId = setTimeout(() => {
            if (consentManager.isConsentNotDefined()) {
                setIsOpened(true);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [consentManager]);

    const onConsentPopupAction = (values: Consents | 'All' | 'OnlyNecessary') => {
        consentManager.setConsents(values);
        setIsOpened(false);
        onConsentPopupClose?.();
    };

    const onClose = () => {
        setIsOpened(false);
        onConsentPopupClose?.();
    };
    const view = manageCookies ? 'manage' : consentManager.mode;

    if (isOpened || manageCookies) {
        switch (view) {
            case 'manage':
                return (
                    <ConsentPopup
                        {...popupProps}
                        className={b()}
                        rootClassName={b('root')}
                        step={manageCookies ? ConsentPopupStep.Manage : ConsentPopupStep.Main}
                        onAction={onConsentPopupAction}
                        onClose={onClose}
                        consentManager={consentManager}
                    />
                );
            case 'notification':
                return (
                    <ConsentNotification
                        {...popupProps}
                        className={b()}
                        onAction={onConsentPopupAction}
                        consentManager={consentManager}
                    />
                );
            case 'base':
                return (
                    <SimpleConsent
                        {...popupProps}
                        className={b()}
                        onAction={onConsentPopupAction}
                        consentManager={consentManager}
                    />
                );
        }
    }

    return null;
};
