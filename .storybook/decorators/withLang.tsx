import React from 'react';

import {configure} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';

export const withLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;
    configure({lang});

    return <Story key={lang} {...context} />;
};
