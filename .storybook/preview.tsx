import './styles.scss';
import '@gravity-ui/uikit/styles/styles.css';

import React from 'react';
import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {DecoratorFn} from '@storybook/react';
import {ThemeProvider, MobileProvider, Lang, configure as uiKitConfigure} from '@gravity-ui/uikit';
import {configure} from '../src';
import {withMobile} from './decorators/withMobile';
import {withLang} from './decorators/withLang';
import {Docs} from './docs';

configure({
    lang: Lang.En,
});
uiKitConfigure({
    lang: Lang.En,
});

const withContextProvider: DecoratorFn = (Story, context) => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={context.globals.theme}>
                <MobileProvider>
                    <Story {...context} />
                </MobileProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export const decorators = [withMobile, withLang, withContextProvider];

export const parameters = {
    docs: {
        page: Docs,
    },
    jsx: {showFunctions: true},
    viewport: {
        viewports: MINIMAL_VIEWPORTS,
    },
    options: {
        storySort: {
            order: ['Theme', 'Components', ['Basic']],
            method: 'alphabetical',
        },
    },
};

export const globalTypes = {
    theme: {
        name: 'Theme',
        defaultValue: 'light',
        toolbar: {
            icon: 'mirror',
            items: [
                {value: 'light', right: '☼', title: 'Light'},
                {value: 'dark', right: '☾', title: 'Dark'},
                {value: 'light-hc', right: '☼', title: 'High Contrast Light (beta)'},
                {value: 'dark-hc', right: '☾', title: 'High Contrast Dark (beta)'},
            ],
        },
    },
    lang: {
        name: 'Language',
        defaultValue: 'en',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'en', right: '🇬🇧', title: 'En'},
                {value: 'ru', right: '🇷🇺', title: 'Ru'},
            ],
        },
    },
    platform: {
        name: 'Platform',
        defaultValue: 'desktop',
        toolbar: {
            items: [
                {value: 'desktop', title: 'Desktop', icon: 'browser'},
                {value: 'mobile', title: 'Mobile', icon: 'mobile'},
            ],
        },
    },
};
