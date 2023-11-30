import {CookieConsentBaseProps} from '../../types';

export interface ConsentNotificationData {
    /* Content */
    text?: string;
    /* Link to the privacy policy */
    policyLink?: string;
    /* Text for the link to the privacy policy */
    policyLinkText?: string;
    /* Text on the consent acceptance button */
    buttonOkText?: string;
}

export type ConsentNotificationProps = ConsentNotificationData & CookieConsentBaseProps;
