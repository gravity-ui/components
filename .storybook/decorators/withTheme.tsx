import React from 'react';
import {useTheme} from '@gravity-ui/uikit';

import type {DecoratorFn} from '@storybook/react';

export const withTheme: DecoratorFn = (Story, context) => {
    const themeValue = context.globals.theme;
    const [theme, setTheme] = useTheme();

    React.useEffect(() => {
        if (theme !== themeValue) {
            setTheme(themeValue);
        }
    }, [theme, themeValue, setTheme]);

    return <Story {...context} />;
};
