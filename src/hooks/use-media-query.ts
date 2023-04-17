import React from 'react';

const maxMobileWidth = '(max-width: 480px)';

export function useMediaQuery(query: string) {
    const [subscribe, getSnapshot] = React.useMemo(() => {
        const matchMedia = window.matchMedia(query);

        return [
            (notify: () => void) => {
                matchMedia.addEventListener('change', notify);

                return () => {
                    matchMedia.removeEventListener('change', notify);
                };
            },
            () => matchMedia.matches,
        ];
    }, [query]);

    return React.useSyncExternalStore(subscribe, getSnapshot);
}

export function useIsMobile() {
    return useMediaQuery(maxMobileWidth);
}
