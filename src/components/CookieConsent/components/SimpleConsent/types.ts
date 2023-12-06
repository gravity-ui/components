import {CookieConsentBaseProps} from '../../types';

export interface SimpleConsentData {
    /* Content */
    text?: string;
    /* Text on the consent acceptance button */
    buttonAcceptText?: string;
    /* Text on the reject button of the consent */
    buttonDeclineText?: string;
}

export type SimpleConsentProps = SimpleConsentData & CookieConsentBaseProps;
