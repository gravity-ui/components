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
    defaultChecked?: boolean;
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
    /* Title text for manage cookies step */
    manageTitleText?: string;
    /* Title text for main step */
    mainTitleText?: string;
    /* Hide subtitle in manage cookies step */
    noSubtitle?: boolean;
    cookieList?: ConsentPopupCookieListItem[];
    onClose: () => void;
    /* Disable modal animation */
    disableHeightTransition?: boolean;
}

export type ConsentPopupProps = ConsentPopupData &
    CookieConsentBaseProps & {
        /* Active step */
        step?: `${ConsentPopupStep}`;
        /* Class for the root Modal node */
        modalClassName?: string;
    };

export interface HeaderProps {
    /* Active step */
    currentStep: `${ConsentPopupStep}`;
    /* Initial step */
    initialStep: `${ConsentPopupStep}`;
    onClose: () => void;
    /* Is mobile view */
    isMobile?: boolean;
    /* Title text for manage cookies step */
    manageTitleText?: string;
    /* Title text for main step */
    mainTitleText?: string;
}

export interface FooterProps {
    /* Active step */
    currentStep: `${ConsentPopupStep}`;
    initialStep: `${ConsentPopupStep}`;
    /* Text on the consent acceptance button */
    buttonAcceptText?: string;
    /* Text on the button for accepting required cookies */
    buttonNecessaryText?: string;
    /* Text on the button to confirm the choice */
    buttonConfirmText?: string;
    onAction: (consents: Consents | 'All' | 'OnlyNecessary') => void;
    /* Current consent */
    currentConsents: Consents;
    onChangeStep: (step: `${ConsentPopupStep}`) => void;
}
