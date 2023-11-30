import React from 'react';

import {useMobile} from '@gravity-ui/uikit';
import type {DecoratorFn} from '@storybook/react';

export const withMobile: DecoratorFn = (Story, context) => {
    const mobileValue = context.globals.platform === 'mobile';

    const [, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        setMobile(mobileValue);
    }, [mobileValue]);

    return <Story {...context} />;
};
