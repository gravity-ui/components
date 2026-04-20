import * as React from 'react';

export type GalleryImageRotationContextValue = {
    rotation: number;
    rotateLeft: () => void;
    rotateRight: () => void;
};

const GalleryImageRotationContext = React.createContext<GalleryImageRotationContextValue>({
    rotation: 0,
    rotateLeft: () => {},
    rotateRight: () => {},
});

export type GalleryImageRotationProviderProps =
    React.PropsWithChildren<GalleryImageRotationContextValue>;

export const GalleryImageRotationProvider: React.FunctionComponent<GalleryImageRotationProviderProps> =
    function GalleryImageRotationProvider({children, rotation, rotateLeft, rotateRight}) {
        const value = React.useMemo(
            () => ({rotation, rotateLeft, rotateRight}),
            [rotation, rotateLeft, rotateRight],
        );
        return (
            <GalleryImageRotationContext.Provider value={value}>
                {children}
            </GalleryImageRotationContext.Provider>
        );
    };

export const useGalleryImageRotationContext = () => React.useContext(GalleryImageRotationContext);
