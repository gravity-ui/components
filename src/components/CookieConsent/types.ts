import type {ConsentMode, ConsentType, Consents, CookieSettings} from './ConsentManager';
import type {ConsentNotificationData} from './components/ConsentNotification';
import type {ConsentPopupData} from './components/ConsentPopup';
import type {SimpleConsentData} from './components/SimpleConsent';

export interface CookieConsentBaseProps {
    onAction: (consents: Consents | 'All' | 'OnlyNecessary') => void;
    className?: string;
    consentManager: IConsentManager;
}

export type CookieConsentComponentProps =
    | ConsentNotificationData
    | ConsentPopupData
    | SimpleConsentData;

export type Subscriber = (changedConsents: Consents, allConsents: Consents) => void;

export interface IConsentManager {
    /* Mode for managing cookies and showing component. 'notification' | 'base' | 'manage' */
    mode: `${ConsentMode}`;
    /* Types of cookies */
    cookies: ConsentType[];
    /* See CookieSetOptions from universal-cookie */
    cookiesSettings: CookieSettings;
    /* Get current consents */
    getConsents: () => Consents;
    /* To subscribe a component to update consents; e.g, to send actual consents to ga */
    subscribe: (handler: Subscriber) => () => void;
    /* Set new consent values */
    setConsents: (values: Consents | 'All' | 'OnlyNecessary') => void;
    /* Check conditions for showing consent component */
    isConsentNotDefined: () => boolean;
}

export type CookieConsentProps = CookieConsentComponentProps & {
    consentManager: IConsentManager;
    onConsentPopupClose?: () => void;
    /* To open popup for managing cookies settings */
    manageCookies?: boolean;
};
