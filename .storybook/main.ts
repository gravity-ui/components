import type {StorybookConfig} from '@storybook/react-webpack5';

const {join} = require('path');

const config: StorybookConfig = {
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },

    stories: ['../src/**/*.stories.@(ts|tsx)'],

    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        './theme-addon/register.tsx',
        '@storybook/addon-webpack5-compiler-babel',
        '@storybook/addon-a11y',
    ],

    webpackFinal: (storybookBaseConfig) => {
        storybookBaseConfig?.module?.rules.push({
            test: /\.md$/,
            include: [join(__dirname, '../src')],
            use: [{loader: 'markdown-loader'}],
        });

        // to turn fileName in context.parameters into path form number in production bundle
        if (storybookBaseConfig?.optimization) {
            storybookBaseConfig.optimization.moduleIds = 'named';
        }

        return storybookBaseConfig;
    },
};

export default config;
