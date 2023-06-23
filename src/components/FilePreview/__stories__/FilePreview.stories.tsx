import React from 'react';
import type {MouseEvent} from 'react';

import {CircleExclamation, Link, Xmark} from '@gravity-ui/icons';
import {Meta, Story} from '@storybook/react';

import {FilePreview, FilePreviewProps, FileType} from '../FilePreview';

export default {
    title: 'Components/FilePreview',
    component: FilePreview,
} as Meta;

const CollageTemplate: Story = () => {
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
                    actions={[
                        {
                            icon: Link,
                            title: 'open on drive',
                            onClick: () => {
                                alert('The file was opened on disk');
                            },
                        },
                        {
                            icon: Xmark,
                            title: 'delete a file',
                            onClick: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
                                e.preventDefault();
                                confirm('Are you sure you want to delete the file?');
                            },
                        },
                    ]}
                />
            ))}
            <FilePreview
                file={{name: 'my-image-from-thailand.jpg', type: 'image/png'} as File}
                actions={[{icon: CircleExclamation, title: 'some hint'}]}
            />
        </div>
    );
};

export const Collage = CollageTemplate.bind({});

const DefaultTemplate: Story<FilePreviewProps> = (args) => {
    return <FilePreview {...args} />;
};

export const Default = DefaultTemplate.bind({});

Default.args = {
    file: {name: 'my-file.docs', type: 'text/docs'} as File,
    onClick: () => {
        alert('The file was opened on disk');
    },
    actions: [
        {
            icon: Xmark,
            onClick: (e) => {
                e.stopPropagation();
                confirm('Are you sure you want to delete the file?');
            },
        },
    ],
};
