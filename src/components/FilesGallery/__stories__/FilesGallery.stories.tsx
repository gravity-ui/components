import React from 'react';

import {ArrowDownToLine, Link} from '@gravity-ui/icons';
import {
    ActionTooltip,
    Button,
    CopyToClipboard,
    Icon,
    Text,
    usePortalContainer,
} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {FilesGallery, FilesGalleryProps} from '../FilesGallery';
import {DocumentFileView} from '../components/DocumentFileView/DocumentFileView';
import {ImageFileView} from '../components/ImageFileView/ImageFileView';
import {VideoFileView} from '../components/VideoFileView/VideoFileView';
import {GalleryFileBase} from '../types';

export default {
    title: 'Components/FilesGallery',
    component: FilesGallery,
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
} as Meta<typeof FilesGallery>;

type GalleryFile = GalleryFileBase &
    (
        | {
              type: 'image' | 'video' | 'document';
              url: string;
          }
        | {type: 'text'; text: string}
    );

const files: GalleryFile[] = [
    {
        type: 'image',
        url: 'https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg',
        imageSrc: 'https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg',
        data: {
            name: 'Corgi image',
            type: 'image/jpeg',
        } as File,
    },
    {
        type: 'video',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        data: {
            name: 'Bunny Film',
            type: 'video/mp4',
        } as File,
    },
    {
        type: 'text',
        text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum',
        data: {
            name: 'Some text',
            type: 'text',
        } as File,
    },
    {
        type: 'document',
        url: 'https://preview.gravity-ui.com/icons',
        data: {
            name: 'Pdf file',
            type: 'pdf',
        } as File,
    },
];

const FilesGalleryShowcaseTemplate: StoryFn<FilesGalleryProps<GalleryFile>> = () => {
    const [open, setOpen] = React.useState(false);

    const container = usePortalContainer();

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const renderBody = React.useCallback((activeFile: GalleryFile) => {
        switch (activeFile.type) {
            case 'image': {
                return <ImageFileView src={activeFile.url} />;
            }
            case 'video': {
                return <VideoFileView src={activeFile.url} />;
            }
            case 'document': {
                return <DocumentFileView name={activeFile.data.name} src={activeFile.url} />;
            }
            case 'text': {
                return <Text variant="body-1">{activeFile.text}</Text>;
            }
        }
    }, []);

    const renderActions = React.useCallback((activeFile: GalleryFile) => {
        return (
            <React.Fragment>
                <CopyToClipboard text={'url' in activeFile ? activeFile.url : activeFile.text}>
                    {() => (
                        <div>
                            <ActionTooltip title="Copy link">
                                <Button
                                    size="l"
                                    view="flat"
                                    extraProps={{
                                        'aria-label': 'Copy link',
                                    }}
                                >
                                    <Icon data={Link} />
                                </Button>
                            </ActionTooltip>
                        </div>
                    )}
                </CopyToClipboard>
                {'url' in activeFile && (
                    <ActionTooltip title="Download">
                        <Button
                            size="l"
                            view="flat"
                            extraProps={{
                                'aria-label': 'download',
                            }}
                            onClick={(event) => event.stopPropagation()}
                            href={`${activeFile.url}?inline=false`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon data={ArrowDownToLine} />
                        </Button>
                    </ActionTooltip>
                )}
            </React.Fragment>
        );
    }, []);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <FilesGallery<GalleryFile>
                theme="dark"
                open={open}
                onClose={handleClose}
                container={container || undefined}
                items={files}
                renderBody={renderBody}
                renderActions={renderActions}
            />
        </React.Fragment>
    );
};

export const FilesGalleryShowcase = FilesGalleryShowcaseTemplate.bind({});
