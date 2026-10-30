import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import type {ThemeProviderProps} from '@gravity-ui/uikit';

import {GalleryItem} from '../../components';
import type {GalleryItemProps, GalleryModalProps} from '../../components';

import {AsyncGallery} from './AsyncGallery';
import {GalleryContext} from './GalleryContext';
import type {GalleryContextType, GalleryOpenOptions} from './GalleryContext';

export type GalleryProviderProps = React.PropsWithChildren<
    Pick<GalleryModalProps, 'container' | 'className' | 'emptyMessage'>
> &
    Pick<ThemeProviderProps, 'theme'>;

export const GalleryProvider = ({
    children,
    container,
    emptyMessage,
    theme,
    className,
}: GalleryProviderProps) => {
    const [gallery, setGallery] = React.useState<{
        items: GalleryItemProps[];
        initialItemIndex: number;
    } | null>(null);
    const isOpen = gallery !== null;

    const sessionRef = React.useRef<GalleryOpenOptions | null>(null);

    const closeGallery = React.useCallback(() => {
        const session = sessionRef.current;
        if (!session) return;

        sessionRef.current = null;
        setGallery(null);

        session.onOpenChange?.(false);
    }, []);

    const handleOpenChange = React.useCallback(
        (open: boolean) => {
            if (!open) closeGallery();
        },
        [closeGallery],
    );

    const contextValue = React.useMemo<GalleryContextType>(
        () => ({
            openGallery: (galleryItems, initialFileIndex, options) => {
                const previous = sessionRef.current;
                const onOpenChange = options?.onOpenChange;
                const session: GalleryOpenOptions = {};
                sessionRef.current = session;
                setGallery({
                    items: galleryItems,
                    initialItemIndex: initialFileIndex ?? 0,
                });
                try {
                    previous?.onOpenChange?.(false);
                } finally {
                    if (sessionRef.current === session) {
                        // A pending session must not send a close event.
                        session.onOpenChange = onOpenChange;
                        onOpenChange?.(true);
                    }
                }
            },
            closeGallery,
            open: isOpen,
        }),
        [isOpen, closeGallery],
    );

    return (
        <GalleryContext.Provider value={contextValue}>
            {children}
            {gallery && (
                <React.Suspense fallback={null}>
                    <ThemeProvider theme={theme}>
                        <AsyncGallery
                            open={isOpen}
                            onOpenChange={handleOpenChange}
                            container={container}
                            className={className}
                            emptyMessage={emptyMessage}
                            initialItemIndex={gallery.initialItemIndex}
                        >
                            {gallery.items.map((file, index) => (
                                <GalleryItem key={index} {...file} />
                            ))}
                        </AsyncGallery>
                    </ThemeProvider>
                </React.Suspense>
            )}
        </GalleryContext.Provider>
    );
};
