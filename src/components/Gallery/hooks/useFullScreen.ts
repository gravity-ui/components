import * as React from 'react';

export function useFullScreen() {
    const [fullScreen, setFullScreen] = React.useState(false);

    React.useEffect(() => {
        const handleCloseFullScreen = (event: KeyboardEvent) => {
            if (event.shiftKey && event.code === 'KeyF') {
                setFullScreen((value) => !value);
            }
        };

        document.addEventListener('keydown', handleCloseFullScreen);

        return () => {
            document.removeEventListener('keydown', handleCloseFullScreen);
        };
    }, [fullScreen]);

    return {fullScreen, setFullScreen};
}
