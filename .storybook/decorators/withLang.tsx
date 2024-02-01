import React from 'react';

import {configure as uiKitConfigure} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';

import {configure} from '../../src';

export const withLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    uiKitConfigure({lang});
    configure({lang});

    return <Story key={lang} {...context} />;
};
