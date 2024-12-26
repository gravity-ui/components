import React from 'react';

import {FullScreenActionProps} from '../FullScreenAction';

export type UseFullScreenHotkeysProps = Pick<
    FullScreenActionProps,
    'fullScreen' | 'onUpdateFullScreen'
>;

export function useFullScreenHotkeys({fullScreen, onUpdateFullScreen}: UseFullScreenHotkeysProps) {
    React.useEffect(() => {
        const handleCloseFullScreen = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onUpdateFullScreen(false);
            } else if (event.shiftKey && event.code === 'KeyF') {
                onUpdateFullScreen((value) => !value);
            }
        };

        document.addEventListener('keyup', handleCloseFullScreen);

        return () => {
            document.removeEventListener('keyup', handleCloseFullScreen);
        };
    }, [fullScreen, onUpdateFullScreen]);
}
