import * as React from 'react';

import {Button} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {ConsentManager, ConsentMode, ConsentType} from '../ConsentManager';
import {ConsentPopupCookieListItem} from '../components/ConsentPopup/types';
import {CookieConsent} from '../index';
import type {CookieConsentProps} from '../types';

export default {
    title: 'Components/CookieConsent',
    component: CookieConsent,
    argTypes: {
        consentMode: {
            control: 'select',
            options: Object.values(ConsentMode),
        },
        manageCookies: {
            control: 'boolean',
        },
        text: {
            control: 'text',
        },
        policyLink: {
            control: 'text',
        },
        policyLinkText: {
            control: 'text',
        },
        buttonAcceptText: {
            control: 'text',
        },
        buttonDeclineText: {
            control: 'text',
        },
        buttonNecessaryText: {
            control: 'text',
        },
        buttonConfirmText: {
            control: 'text',
        },
        manageLabelText: {
            control: 'text',
        },
        manageTitleText: {
            control: 'text',
        },
        mainTitleText: {
            control: 'text',
        },
        noSubtitle: {
            control: 'boolean',
        },
        modalClassName: {
            control: 'text',
        },
        className: {
            control: 'text',
        },
        cookieList: {
            control: 'object',
        },
        disableHeightTransition: {
            control: 'boolean',
        },
    },
} as Meta;

const cookieList = [
    ConsentType.Necessary,
    ConsentType.Functional,
    ConsentType.Analytics,
    ConsentType.Marketing,
].map((type) => {
    const result: ConsentPopupCookieListItem = {
        type,
        link: {href: 'https://google.com'},
    };

    if (type === ConsentType.Necessary) {
        result.titleLabel = 'Always active';
    }

    if (type === ConsentType.Functional) {
        result.defaultChecked = true;
    }

    return result;
});

type DefaultTemplateProps = Omit<CookieConsentProps, 'consentManager'> & {
    consentMode: `${ConsentMode}`;
};

const DefaultTemplate: StoryFn<DefaultTemplateProps> = ({consentMode, manageCookies, ...args}) => {
    const [edition, setEdition] = React.useState(1);
    const consentManager = React.useMemo(
        () => new ConsentManager(consentMode, edition),
        [consentMode, edition],
    );
    const [showResetButton, setShowResetButton] = React.useState(
        !consentManager.isConsentNotDefined(),
    );

    const onResetButtonClick = () => {
        setEdition(edition + 1);
        setShowResetButton(false);
    };

    return (
        <React.Fragment>
            {showResetButton && (
                <Button view="action" size="s" onClick={onResetButtonClick}>
                    Reset consent
                </Button>
            )}
            <CookieConsent
                {...args}
                consentManager={consentManager}
                manageCookies={manageCookies && !showResetButton}
                onConsentPopupClose={() => setShowResetButton(true)}
            />
        </React.Fragment>
    );
};

export const SimpleConsent = DefaultTemplate.bind({});
SimpleConsent.args = {
    consentMode: ConsentMode.Base,
} as DefaultTemplateProps;

export const ConsentPopup = DefaultTemplate.bind({});
ConsentPopup.args = {
    consentMode: ConsentMode.Manage,
    policyLink: 'https://google.com',
    cookieList,
    modalClassName: 'unique-class-name-for-adblockers',
} as DefaultTemplateProps;

export const ManageCookies = DefaultTemplate.bind({});
ManageCookies.args = {
    consentMode: ConsentMode.Manage,
    manageCookies: true,
    policyLink: 'https://google.com',
    cookieList,
    modalClassName: 'unique-class-name-for-adblockers',
} as DefaultTemplateProps;

export const ConsentNotification = DefaultTemplate.bind({});
ConsentNotification.args = {
    consentMode: ConsentMode.Notification,
    policyLink: 'https://google.com',
    policyLinkText: 'Cookie Policy',
} as DefaultTemplateProps;
