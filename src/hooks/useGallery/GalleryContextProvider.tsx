import * as React from 'react';

import {GalleryItemProps} from '../../components';

import {GalleryContext, type GalleryContextType} from './GalleryContext';
import {GalleryWithThemeProps} from './GalleryWithTheme/GalleryWithTheme';
import {GalleryWithTheme} from './GalleryWithTheme/GalleryWithTheme.lazy';

export type GalleryContextProviderProps = React.PropsWithChildren<
    Pick<GalleryWithThemeProps, 'container' | 'className' | 'emptyMessage' | 'theme'>
>;

export const GalleryContextProvider = ({
    children,
    container,
    emptyMessage,
    theme,
    className,
}: GalleryContextProviderProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [galleryProps, setGalleryProps] = React.useState<{
        items: GalleryItemProps[];
        initialItemIndex: number;
    }>({items: [], initialItemIndex: 0});

    const contextValue = React.useMemo<GalleryContextType>(
        () => ({
            openGallery: (items, initialFileIndex) => {
                setGalleryProps({
                    items,
                    initialItemIndex: initialFileIndex ?? 0,
                });
                setIsOpen(true);
            },
        }),
        [],
    );

    return (
        <GalleryContext.Provider value={contextValue}>
            {children}
            {isOpen && (
                <React.Suspense fallback={null}>
                    <GalleryWithTheme
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        theme={theme}
                        container={container}
                        className={className}
                        emptyMessage={emptyMessage}
                        {...galleryProps}
                    />
                </React.Suspense>
            )}
        </GalleryContext.Provider>
    );
};
