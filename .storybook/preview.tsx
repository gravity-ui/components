// eslint-disable-next-line import/order
import './styles.scss';
// eslint-disable-next-line import/order
import '@gravity-ui/uikit/styles/styles.css';

import {MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import type {Preview} from '@storybook/react';

import {withLang} from './decorators/withLang';
import {withMobile} from './decorators/withMobile';
import {withStrictMode} from './decorators/withStrictMode';
import {withTheme} from './decorators/withTheme';

const preview: Preview = {
    decorators: [withLang, withMobile, withTheme, withStrictMode],
    parameters: {
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
    },
    globalTypes: {
        theme: {
            name: 'Theme',
            defaultValue: 'light',
            toolbar: {
                icon: 'mirror',
                items: [
                    {value: 'light', right: '☼', title: 'Light'},
                    {value: 'dark', right: '☾', title: 'Dark'},
                    {value: 'light-hc', right: '☼', title: 'Light (high contrast)'},
                    {value: 'dark-hc', right: '☾', title: 'Dark (high contrast)'},
                ],
                dynamicTitle: true,
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
                dynamicTitle: true,
            },
        },
        direction: {
            defaultValue: 'ltr',
            toolbar: {
                title: 'Direction',
                icon: 'menu',
                items: [
                    {value: 'ltr', title: 'Left to Right', icon: 'arrowrightalt'},
                    {value: 'rtl', title: 'Right to Left', icon: 'arrowleftalt'},
                ],
                dynamicTitle: true,
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
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
