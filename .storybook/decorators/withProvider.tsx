import * as React from 'react';

import {settings} from '@gravity-ui/date-utils';
import {Provider, configure} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';

export const withProvider: Decorator = (Story, context) => {
    const lang = context.globals.lang;

    configure({lang});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        (async () => {
            await settings.loadLocale(lang);
            settings.setLocale(lang);
        })();
    }, [lang]);

    return (
        <Provider
            key={lang}
            lang={lang}
            theme={context.globals.theme}
            direction={context.globals.direction}
            mobile={context.globals.platform === 'mobile'}
            platform={context.globals.platform}
        >
            <Story key={context.globals.platform} {...context} />
        </Provider>
    );
};
