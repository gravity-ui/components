import * as React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import type {ThemeProviderProps} from '@gravity-ui/uikit';

import {GalleryItem} from '../../components';
import type {GalleryItemProps, GalleryProps} from '../../components';

import {AsyncGallery} from './AsyncGallery';
import {GalleryContext} from './GalleryContext';
import type {GalleryContextType} from './GalleryContext';

export type GalleryProviderProps = React.PropsWithChildren<
    Pick<GalleryProps, 'container' | 'className' | 'emptyMessage'>
> &
    Pick<ThemeProviderProps, 'theme'>;

export const GalleryProvider = ({
    children,
    container,
    emptyMessage,
    theme,
    className,
}: GalleryProviderProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [{items, initialItemIndex}, setGalleryProps] = React.useState<{
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
                    <ThemeProvider theme={theme}>
                        <AsyncGallery
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            container={container}
                            className={className}
                            emptyMessage={emptyMessage}
                            initialItemIndex={initialItemIndex}
                        >
                            {items.map((file, index) => (
                                <GalleryItem key={index} {...file} />
                            ))}
                        </AsyncGallery>
                    </ThemeProvider>
                </React.Suspense>
            )}
        </GalleryContext.Provider>
    );
};
