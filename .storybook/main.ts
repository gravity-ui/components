import type {StorybookConfig} from '@storybook/core-common';

const {join} = require('path');


const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        './theme-addon/register.tsx',
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

module.exports = config;
