import * as React from 'react';

import {Provider} from '@gravity-ui/uikit';
import {render} from '@testing-library/react';
import type {RenderOptions} from '@testing-library/react';

function Providers({children}: {children: React.ReactNode}) {
    return <Provider theme="light">{children}</Provider>;
}

function createWrapper(Component: React.JSXElementConstructor<{children: React.ReactNode}>) {
    return function Wrapper({children}: {children: React.ReactNode}) {
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
