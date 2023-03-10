import '@gravity-ui/uikit/styles/styles.css';

import React from 'react';
import {MobileProvider, ThemeProvider} from '@gravity-ui/uikit';

import {withMobile} from './decorators/withMobile';
import {withTheme} from './decorators/withTheme';

import type { DecoratorFn } from '@storybook/react';

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

export const decorators = [withMobile, withTheme, withContextProvider];

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
