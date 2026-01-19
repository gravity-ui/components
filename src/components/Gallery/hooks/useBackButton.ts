import * as React from 'react';

import {useMobile} from '@gravity-ui/uikit';
import {noop} from 'lodash';

export type UseBackButtonProps = {
    callback: () => void;
};

export function useBackButton({callback}: UseBackButtonProps) {
    const isMobile = useMobile();

    React.useEffect(() => {
        if (!isMobile) {
            return noop;
        }

        const handlePopState = () => {
            callback();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isMobile, callback]);
}
