import * as React from 'react';

export type GalleryContextValue = {
    /**
     * Tap handler for mobile views.
     * Should be called by the view on single tap when view is in interactive state.
     */
    onTap: React.TouchEventHandler;
    /** Callback to notify Gallery about view interaction state changes. */
    onViewInteractionChange: (isInteracting: boolean) => void;
    /** Current image rotation in degrees. */
    rotation: number;
    /** Rotate the active image counter-clockwise by one step. */
    rotateLeft: () => void;
    /** Rotate the active image clockwise by one step. */
    rotateRight: () => void;
};

const GalleryContext = React.createContext<GalleryContextValue>({
    onTap: () => {},
    onViewInteractionChange: () => {},
    rotation: 0,
    rotateLeft: () => {},
    rotateRight: () => {},
});

export const GalleryContextProvider: React.FunctionComponent<
    React.PropsWithChildren<GalleryContextValue>
> = function GalleryContextProvider({
    children,
    onViewInteractionChange,
    onTap,
    rotation,
    rotateLeft,
    rotateRight,
}) {
    const value: GalleryContextValue = React.useMemo(
        () => ({
            onTap,
            onViewInteractionChange,
            rotation,
            rotateLeft,
            rotateRight,
        }),
        [onTap, onViewInteractionChange, rotation, rotateLeft, rotateRight],
    );
    return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};

/**
 * Context for communication between Gallery and its child views.
 * Provides callbacks for view interaction events and image rotation state.
 *
 * @returns Current GalleryContext value.
 */
export const useGalleryContext = () => React.useContext(GalleryContext);
