import React from 'react';

export function useFullScreen() {
    const [fullScreen, setFullScreen] = React.useState(false);

    const handleSwitchFullScreenMode = React.useCallback(() => {
        setFullScreen((value) => !value);
    }, []);

    React.useEffect(() => {
        const handleCloseFullScreen = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setFullScreen(false);
            } else if (event.shiftKey && event.code === 'KeyF') {
                handleSwitchFullScreenMode();
            }
        };

        document.addEventListener('keyup', handleCloseFullScreen);

        return () => {
            document.removeEventListener('keyup', handleCloseFullScreen);
        };
    }, [fullScreen, handleSwitchFullScreenMode]);

    return {
        fullScreen,
        handleSwitchFullScreenMode,
    };
}
