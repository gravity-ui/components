import React from 'react';

import {CircleExclamation, Link, Xmark} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';

import {FilePreview, FilePreviewProps} from '../FilePreview';
import {FileType} from '../types';

export default {
    title: 'Components/FilePreview',
    component: FilePreview,
} as Meta<typeof FilePreview>;

const CollageTemplate: StoryFn<FilePreviewProps> = () => {
    return (
        <div
            style={{
                display: 'grid',
                justifyItems: 'center',
                alignItems: 'center',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: 10,
                width: 500,
            }}
        >
            {Object.values(FileType).map((fileType) => (
                <FilePreview
                    key={fileType}
                    file={{name: fileType, type: fileType} as File}
                    onClick={() => alert(`You clicked on the file: ${fileType}`)}
                    actions={[
                        {
                            icon: Link,
                            title: 'open on drive',
                            onClick: () => window.open('https://disk.yandex.com', '_blank'),
                        },
                        {
                            icon: Xmark,
                            title: 'delete a file',
                            onClick: () => alert('Are you sure you want to delete the file?'),
                        },
                    ]}
                />
            ))}
            <FilePreview
                file={{name: 'my-image-from-thailand.jpg', type: 'image/png'} as File}
                previewSrc="https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png"
                actions={[{icon: CircleExclamation, title: 'some hint'}]}
            />
        </div>
    );
};

export const Collage = CollageTemplate.bind({});

const DefaultTemplate: StoryFn<FilePreviewProps> = (args) => {
    return <FilePreview {...args} />;
};

export const Default = DefaultTemplate.bind({});

Default.args = {
    file: {name: 'my-file.docs', type: 'text/docs'} as File,
    onClick: () => {
        window.open('https://disk.yandex.com', '_blank');
    },
    actions: [
        {
            icon: Xmark,
            onClick: () => alert('Are you sure you want to delete the file?'),
        },
    ],
};
