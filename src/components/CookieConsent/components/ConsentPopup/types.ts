import type {ConsentType, Consents} from '../../ConsentManager';
import {CookieConsentBaseProps} from '../../types';
import {FoldableListItem} from '../FoldableList/types';

export enum ConsentPopupStep {
    /* Step with base info */
    Main = 'main',
    /* Step with cookies settings */
    Manage = 'manage',
}

export interface ConsentPopupCookieListItem extends Pick<FoldableListItem, 'titleLabel' | 'link'> {
    type: `${ConsentType}`;
    title?: string;
    text?: string;
}

export interface ConsentPopupData {
    /* Content */
    text?: string;
    /* Link to the privacy policy */
    policyLink?: string;
    /* Text for the link to the privacy policy */
    policyLinkText?: string;
    /* Text on the consent acceptance button */
    buttonAcceptText?: string;
    /* Text on the reject button of the consent */
    buttonDeclineText?: string;
    /* Text on the button for accepting required cookies */
    buttonNecessaryText?: string;
    /* Text on the button to confirm the choice */
    buttonConfirmText?: string;
    /* Text about cookie management */
    manageLabelText?: string;
    cookieList?: ConsentPopupCookieListItem[];
    onClose: () => void;
}

export type ConsentPopupProps = ConsentPopupData &
    CookieConsentBaseProps & {
        /* Active step */
        step?: `${ConsentPopupStep}`;
        rootClassName?: string;
    };

export interface HeaderProps {
    /* Active step */
    currentStep: `${ConsentPopupStep}`;
    /* Initial step */
    initialStep: `${ConsentPopupStep}`;
    onClose: () => void;
    onChangeStep: (step: `${ConsentPopupStep}`) => () => void;
    /* Is mobile view */
    isMobile?: boolean;
}

export interface FooterProps {
    /* Active step */
    currentStep: `${ConsentPopupStep}`;
    /* Text on the consent acceptance button */
    buttonAcceptText?: string;
    /* Text on the button for accepting required cookies */
    buttonNecessaryText?: string;
    /* Text on the button to confirm the choice */
    buttonConfirmText?: string;
    onAction: (consents: Consents | 'All' | 'OnlyNecessary') => void;
    /* Current consent */
    currentConsents: Consents;
}
