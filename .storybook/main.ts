import type {StorybookConfig} from '@storybook/react-webpack5';

const {join} = require('path');

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: ['../src/**/*.stories.@(ts|tsx)'],

    addons: [
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.s?css$/i,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ],
            },
        },
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        './theme-addon/register.tsx',
        '@storybook/addon-a11y',
        '@storybook/addon-webpack5-compiler-babel',
    ],

    webpackFinal: (storybookBaseConfig) => {
        storybookBaseConfig?.module?.rules?.push({
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
