import React from 'react';

import {configure} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';
import {settings} from '@gravity-ui/date-utils';

export const withLang: Decorator = (Story, context) => {
    const lang = context.globals.lang;
    configure({lang});

    React.useEffect(() => {
        (async () => {
            await settings.loadLocale(lang);
            settings.setLocale(lang);
        })();
    }, [lang]);

    return <Story key={lang} {...context} />;
};
