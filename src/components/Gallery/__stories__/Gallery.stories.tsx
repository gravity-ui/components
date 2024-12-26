import React from 'react';

import {Button, Text, usePortalContainer} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {
    FullScreenAction,
    Gallery,
    GalleryItem,
    GalleryProps,
    getDefaultGalleryItemDocument,
    getDefaultGalleryItemImage,
    getDefaultGalleryItemVideo,
} from '../';
import {FilePreview} from '../../FilePreview';

import {GalleryFile, files, images} from './mockData';

export default {
    title: 'Components/Gallery',
    component: Gallery,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof Gallery>;

const ImagesGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);

    const container = usePortalContainer();

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const renderActions = React.useCallback(() => {
        return [
            <FullScreenAction
                key="full-screen"
                fullScreen={fullScreen}
                onUpdateFullScreen={setFullScreen}
            />,
        ];
    }, [fullScreen]);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery
                open={open}
                onClose={handleClose}
                container={container || undefined}
                fullScreen={fullScreen}
            >
                {images.map((image, index) => (
                    <GalleryItem
                        key={index}
                        {...getDefaultGalleryItemImage({src: image, name: image})}
                        actions={renderActions()}
                    />
                ))}
            </Gallery>
        </React.Fragment>
    );
};

export const ImagesGallery = ImagesGalleryTemplate.bind({});

const getGalleryItemFile = (file: GalleryFile) => {
    switch (file.type) {
        case 'image':
            return getDefaultGalleryItemImage({src: file.url, name: file.name});
        case 'video':
            return getDefaultGalleryItemVideo({src: file.url, name: file.name});
        case 'document':
            return getDefaultGalleryItemDocument({
                src: file.url,
                file: {name: file.name, type: file.type} as File,
            });
        case 'text':
            return {
                thumbnail: (
                    <FilePreview file={{name: file.name, type: file.type} as File} hideName />
                ),
                view: <Text variant="body-1">{file.text}</Text>,
                meta: file.name,
            };
    }
};

const FilesGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);

    const container = usePortalContainer();

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const renderActions = React.useCallback(() => {
        return [
            <FullScreenAction
                key="full-screen"
                fullScreen={fullScreen}
                onUpdateFullScreen={setFullScreen}
            />,
        ];
    }, [fullScreen]);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery
                invertTheme
                open={open}
                onClose={handleClose}
                container={container || undefined}
                fullScreen={fullScreen}
            >
                {files.map((file, index) => (
                    <GalleryItem
                        key={index}
                        {...getGalleryItemFile(file)}
                        actions={renderActions()}
                        interactive={file.interactive}
                    />
                ))}
            </Gallery>
        </React.Fragment>
    );
};

export const FilesGallery = FilesGalleryTemplate.bind({});
