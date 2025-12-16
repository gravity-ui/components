import * as React from 'react';

export type GalleryContextValue = {
    /**
     * Tap handler for mobile views.
     * Should be called by the view on single tap when view is in interactive state.
     */
    onTap: React.TouchEventHandler;
    /** Callback to notify Gallery about view interaction state changes. */
    onViewInteractionChange: (isInteracting: boolean) => void;
};

const GalleryContext = React.createContext<GalleryContextValue>({
    onTap: () => {},
    onViewInteractionChange: () => {},
});

export const GalleryContextProvider: React.FunctionComponent<
    React.PropsWithChildren<GalleryContextValue>
> = function GalleryContextProvider({children, onViewInteractionChange, onTap}) {
    const value: GalleryContextValue = React.useMemo(
        () => ({
            onTap,
            onViewInteractionChange,
        }),
        [onTap, onViewInteractionChange],
    );
    return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

/**
 * Context for communication between Gallery and its child views.
 * Provides callbacks for view interaction events.
 */
export const useGalleryContext = () => React.useContext(GalleryContext);
