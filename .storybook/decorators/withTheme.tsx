import {Provider} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';

export const withTheme: Decorator = (Story, context) => {
    return (
        <Provider
            theme={context.globals.theme}
            direction={context.globals.direction}
            lang={context.globals.lang}
            mobile={context.globals.platform === 'mobile'}
            platform={context.globals.platform}
        >
            <Story key={context.globals.platform} {...context} />
        </Provider>
    );
};
