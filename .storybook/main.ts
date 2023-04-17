import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import type {StorybookConfig} from '@storybook/core-common';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        './theme-addon/register.tsx',
    ],
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.plugins = [
                ...(config.resolve.plugins || []),
                new TsConfigPathsPlugin({
                    baseUrl: '.',
                    extensions: config.resolve.extensions,
                }),
            ];
        }

        return config;
    },
};

module.exports = config;
