# CookieConsent

## Usage ConsentMode.Base

```tsx
import React from 'react';
import {CookieConsent} from '@gravity-ui/components';

const consentManager = new ConsentManager('base');

const Analytics = () => {
  const onUpdateConsent = (consents: Consents) => {
    // do something: e.g. sent events to analytics
  };

  React.useEffect(() => {
    consentManager.subscribe(onUpdateConsent);
  }, []);

  return <CookieConsent consentManager={consentManager} />;
};
```

## Usage ConsentMode.Manage

```tsx
import React from 'react';
import {CookieConsent} from '@gravity-ui/components';

const consentManager = new ConsentManager('manage');

const Analytics = () => {
  const onUpdateConsent = (consents: Consents) => {
    // do something: e.g. sent events to analytics
  };

  const cookieList = useMemo(() => {
    return ['necessary', 'analytics'].map((type) => {
      return {
        type,
        titleLabel: type === 'necessary' ? i18n('necessary_cookie_title_label') : undefined,
        link: {href: 'https://google.com'},
      };
    });
  }, [i18n]);

  React.useEffect(() => {
    consentManager.subscribe(onUpdateConsent);
  }, []);

  return (
    <CookieConsent
      consentManager={consentManager}
      cookieList={cookieList}
      onConsentPopupClose={props.onClose}
      modalClassName={'unique-class-name-for-adblockers'}
    />
  );
};
```

## Props

```ts
type CookieConsentComponentProps =
    | ConsentNotificationData
    | ConsentPopupData
    | SimpleConsentData;

type CookieConsentProps = CookieConsentComponentProps & {
    consentManager: IConsentManager;
    onConsentPopupClose?: () => void;
    /* To open popup for managing cookies settings */
    manageCookies?: boolean;
};

type ConsentNotificationData {
    /* Content */
    text?: string;
    /* Link to the privacy policy */
    policyLink?: string;
    /* Text for the link to the privacy policy */
    policyLinkText?: string;
    /* Text on the consent acceptance button */
    buttonOkText?: string;
}

type ConsentPopupData {
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
}

type SimpleConsentData {
    /* Content */
    text?: string;
    /* Text on the consent acceptance button */
    buttonAcceptText?: string;
    /* Text on the reject button of the consent */
    buttonDeclineText?: string;
}

interface IConsentManager {
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
```
