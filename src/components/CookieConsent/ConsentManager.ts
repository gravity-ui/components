import pick from 'lodash/pick';
import Cookies from 'universal-cookie';
import type {CookieSetOptions} from 'universal-cookie';

import type {IConsentManager, Subscriber} from './types';

export const COOKIE_NAME = 'analyticsConsents';
export const CONSENT_COOKIE_SETTINGS: CookieSettings = {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    secure: true,
    sameSite: true,
};

export enum ConsentType {
    Necessary = 'necessary',
    Analytics = 'analytics',
    Marketing = 'marketing',
    Functional = 'functional',
}

export enum ConsentMode {
    Notification = 'notification',
    Manage = 'manage',
    Base = 'base',
}

export enum AdditionalConsentParams {
    Closed = 'closed',
    Edition = 'edition',
}

export type Consents = {
    [k in `${ConsentType | AdditionalConsentParams}`]?: boolean | number;
};

export type CookieSettings = CookieSetOptions;

const cookies = new Cookies();

export class ConsentManager implements IConsentManager {
    protected consents: Consents = {};

    private consentMode: `${ConsentMode}`;
    private consentEdition: number | undefined;
    private projectConsentEdition: number | undefined;

    private closed = false;
    private readonly cookieSettings: CookieSettings;
    private readonly cookiesTypes: Array<ConsentType> = Object.values(ConsentType);
    private readonly subscribers: Subscriber[] = [];

    constructor(
        mode: `${ConsentMode}`,
        edition?: number,
        cookieSettings = CONSENT_COOKIE_SETTINGS,
    ) {
        this.consentMode = mode;
        this.projectConsentEdition = edition;
        this.cookieSettings = cookieSettings;

        this.setInitValues();
    }

    get mode() {
        return this.consentMode;
    }

    get cookies() {
        return this.cookiesTypes;
    }

    get cookiesSettings() {
        return this.cookieSettings;
    }

    getConsents() {
        if (Object.keys(this.consents).length) {
            return this.consents;
        }

        return this.getDefaultConsent();
    }

    subscribe(handler: Subscriber) {
        this.subscribers.push(handler);

        return () => {
            const index = this.subscribers.findIndex((value) => value === handler);
            if (index >= 0) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    setConsents(values: Consents | 'All' | 'OnlyNecessary') {
        const consents: Consents =
            typeof values === 'string' ? this.prepareConsent(values) : values;

        const difference = Object.values(this.cookiesTypes).filter(
            (type) => !consents[type] || consents[type] !== this.consents[type],
        );
        const differenceInVersion = this.consentEdition !== this.projectConsentEdition;
        const shouldClose = this.mode === ConsentMode.Notification && !this.closed;

        if (!difference.length && !differenceInVersion && !shouldClose) {
            return;
        }

        Object.assign(this.consents, consents);

        this.saveNewCookieValue();
        this.handleConsentChange(pick(consents, difference));
    }

    isConsentNotDefined() {
        if (this.mode === ConsentMode.Notification && !this.closed) {
            return true;
        }

        return !this.isAllConsentsDefined() || this.projectConsentEdition !== this.consentEdition;
    }

    protected getDefaultConsent() {
        return this.prepareConsent('OnlyNecessary');
    }

    protected prepareConsent(value: 'All' | 'OnlyNecessary') {
        return this.cookiesTypes.reduce((acc: Consents, type: `${ConsentType}`) => {
            acc[type] = value === 'All' ? true : type === ConsentType.Necessary;

            return acc;
        }, {});
    }

    protected isAllConsentsDefined() {
        return Object.values(this.cookiesTypes).every(
            (type) => typeof this.consents[type] === 'boolean',
        );
    }

    private setInitValues() {
        const value = cookies.get(COOKIE_NAME);

        if (!(typeof value === 'object' && !Array.isArray(value) && value)) {
            return;
        }

        this.consents = {
            ...pick(value, Object.values(ConsentType)),
        };

        if (value[AdditionalConsentParams.Closed]) {
            this.closed = true;
        }

        if (value[AdditionalConsentParams.Edition]) {
            this.consentEdition = value.edition;
        }
    }

    private saveNewCookieValue() {
        const newValue: Consents = {
            ...this.consents,
            [AdditionalConsentParams.Edition]: this.projectConsentEdition,
        };
        this.consentEdition = this.projectConsentEdition;

        if (this.mode === ConsentMode.Notification) {
            newValue[AdditionalConsentParams.Closed] = true;
            this.closed = true;
            this.consents.closed = true;
        }

        cookies.set(COOKIE_NAME, newValue, this.cookieSettings);
    }

    private handleConsentChange(changedConsents: Consents) {
        const allConsents = this.getConsents();
        this.subscribers.forEach((handler) => handler(changedConsents, allConsents));
    }
}
