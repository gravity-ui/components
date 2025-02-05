import * as React from 'react';

import {Link} from '@gravity-ui/icons';
import {
    ActionTooltip,
    Button,
    CopyToClipboard,
    FilePreview,
    Icon,
    Text,
    usePortalContainer,
} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {
    FullScreenAction,
    Gallery,
    GalleryItem,
    getDefaultGalleryItemDocument,
    getDefaultGalleryItemImage,
    getDefaultGalleryItemVideo,
} from '../';
import type {GalleryProps} from '../';

import {files, images} from './mockData';
import type {GalleryFile} from './mockData';

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

    const handleToggle = React.useCallback(() => {
        setOpen(false);
        setFullScreen(false);
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
                onOpenChange={handleToggle}
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
                thumbnail: <FilePreview file={{name: file.name, type: file.type} as File} />,
                view: <Text variant="body-1">{file.text}</Text>,
                meta: file.name,
            };
    }
};

const FilesGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);

    const container = usePortalContainer();

    const handleToggle = React.useCallback(() => {
        setOpen(false);
        setFullScreen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const renderActions = React.useCallback(
        (file: GalleryFile) => {
            return [
                <FullScreenAction
                    key="full-screen"
                    fullScreen={fullScreen}
                    onUpdateFullScreen={setFullScreen}
                />,
                <CopyToClipboard
                    key="clipboard"
                    onCopy={() => alert(file.type === 'text' ? 'Text copied!' : 'Link copied!')}
                    text={file.type === 'text' ? file.text : file.url}
                >
                    {() => (
                        <div>
                            <ActionTooltip title={file.type === 'text' ? 'Copy text' : 'Copy link'}>
                                <Button size="l" view="flat">
                                    <Icon data={Link} />
                                </Button>
                            </ActionTooltip>
                        </div>
                    )}
                </CopyToClipboard>,
            ];
        },
        [fullScreen],
    );

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery
                invertTheme
                open={open}
                onOpenChange={handleToggle}
                container={container || undefined}
                fullScreen={fullScreen}
            >
                {files.map((file, index) => (
                    <GalleryItem
                        key={index}
                        {...getGalleryItemFile(file)}
                        actions={renderActions(file)}
                        interactive={file.interactive}
                    />
                ))}
            </Gallery>
        </React.Fragment>
    );
};

export const FilesGallery = FilesGalleryTemplate.bind({});

const EmptyGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);

    const container = usePortalContainer();

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery
                invertTheme
                open={open}
                onOpenChange={setOpen}
                container={container || undefined}
            />
        </React.Fragment>
    );
};

export const EmptyGallery = EmptyGalleryTemplate.bind({});
