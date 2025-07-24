import {ThemeProvider} from '@gravity-ui/uikit';
import type {Decorator} from '@storybook/react';

export const withTheme: Decorator = (Story, context) => {
    return (
        <ThemeProvider theme={context.globals.theme} direction={context.globals.direction}>
            <Story {...context} />
        </ThemeProvider>
    );
};
