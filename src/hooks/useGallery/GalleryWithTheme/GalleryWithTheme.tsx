import {ThemeProvider, ThemeProviderProps} from '@gravity-ui/uikit';

import {
    Gallery as GalleryComponent,
    GalleryItem,
    GalleryItemProps,
    GalleryProps,
} from '../../../components';

export type GalleryWithThemeProps = Pick<
    GalleryProps,
    'onOpenChange' | 'open' | 'initialItemIndex' | 'emptyMessage' | 'container' | 'className'
> & {
    items: GalleryItemProps[];
    theme?: ThemeProviderProps['theme'];
};

export const GalleryWithTheme = ({
    theme = 'dark',
    onOpenChange,
    open,
    items,
    container,
    className,
    emptyMessage,
    initialItemIndex,
}: GalleryWithThemeProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GalleryComponent
                open={open}
                onOpenChange={onOpenChange}
                container={container}
                className={className}
                emptyMessage={emptyMessage}
                initialItemIndex={initialItemIndex}
            >
                {items.map((file, index) => (
                    <GalleryItem key={index} {...file} />
                ))}
            </GalleryComponent>
        </ThemeProvider>
    );
};
