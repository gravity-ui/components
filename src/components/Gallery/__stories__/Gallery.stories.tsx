import * as React from 'react';

import {ArrowUpRightFromSquare, Link} from '@gravity-ui/icons';
import {
    ActionTooltip,
    Button,
    CopyToClipboard,
    FilePreview,
    Icon,
    Text,
    ThemeProvider,
} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {
    Gallery,
    GalleryItem,
    GalleryItemAction,
    getGalleryItemDocument,
    getGalleryItemImage,
    getGalleryItemVideo,
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

    const handleToggle = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery open={open} onOpenChange={handleToggle}>
                {images.map((image, index) => (
                    <GalleryItem key={index} {...getGalleryItemImage({src: image, name: image})} />
                ))}
            </Gallery>
        </React.Fragment>
    );
};

export const ImagesGallery = ImagesGalleryTemplate.bind({});

const getGalleryItemFile = (file: GalleryFile) => {
    switch (file.type) {
        case 'image':
            return getGalleryItemImage({src: file.url, name: file.name});
        case 'video':
            return getGalleryItemVideo({src: file.url, name: file.name});
        case 'document':
            return getGalleryItemDocument({
                src: file.url,
                file: {name: file.name, type: file.type} as File,
            });
        case 'text':
            return {
                thumbnail: (
                    <FilePreview view="compact" file={{name: file.name, type: file.type} as File} />
                ),
                view: <Text variant="body-1">{file.text}</Text>,
                name: file.name,
            };
    }
};

const FilesGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);

    const handleToggle = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const renderActions = React.useCallback((file: GalleryFile) => {
        const result: GalleryItemAction[] = [
            {
                id: 'clipboard',
                title: file.type === 'text' ? 'Copy text' : 'Copy link',
                icon: <Icon data={Link} />,
                render: (buttonProps) => (
                    <CopyToClipboard
                        onCopy={() => alert(file.type === 'text' ? 'Text copied!' : 'Link copied!')}
                        text={file.type === 'text' ? file.text : file.url}
                    >
                        {() => (
                            <div>
                                <ActionTooltip
                                    title={file.type === 'text' ? 'Copy text' : 'Copy link'}
                                >
                                    <Button {...buttonProps} />
                                </ActionTooltip>
                            </div>
                        )}
                    </CopyToClipboard>
                ),
            },
        ];

        if (file.type !== 'text') {
            result.push({
                id: 'new-tab',
                title: 'Open in new tab',
                icon: <Icon data={ArrowUpRightFromSquare} />,
                href: file.url,
            });
        }

        return result;
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <ThemeProvider theme="dark">
                <Gallery open={open} onOpenChange={handleToggle}>
                    {files.map((file, index) => (
                        <GalleryItem
                            key={index}
                            {...getGalleryItemFile(file)}
                            actions={renderActions(file)}
                            interactive={file.interactive}
                        />
                    ))}
                </Gallery>
            </ThemeProvider>
        </React.Fragment>
    );
};

export const FilesGallery = FilesGalleryTemplate.bind({});

const EmptyGalleryTemplate: StoryFn<GalleryProps> = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <ThemeProvider theme="dark">
                <Gallery open={open} onOpenChange={setOpen} />
            </ThemeProvider>
        </React.Fragment>
    );
};

export const EmptyGallery = EmptyGalleryTemplate.bind({});
