import React from 'react';

import {ThemeContext} from '@gravity-ui/uikit';
import type {ThemeContextProps} from '@gravity-ui/uikit';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';

const themeContextValue: ThemeContextProps = {
    direction: 'ltr',
    theme: 'light',
    themeValue: 'light',
};

function Providers({children}: {children: React.ReactElement}) {
    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
}

function createWrapper(Component: React.JSXElementConstructor<{children: React.ReactElement}>) {
    return function Wrapper({children}: {children: React.ReactElement}) {
        return (
            <Providers>
                <Component>{children}</Component>
            </Providers>
        );
    };
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
    const wrapper = options?.wrapper ? createWrapper(options.wrapper) : Providers;
    return render(ui, {...options, wrapper});
}

export * from '@testing-library/react';
export {customRender as render};
