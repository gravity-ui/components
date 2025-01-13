import * as React from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {StoriesMediaBlockStyle, StoriesTextBlockStyle} from '../../Stories';
import {StoriesGroup} from '../StoriesGroup';
import type {StoriesGroupProps} from '../StoriesGroup';
import type {StoriesGroupItem} from '../types';

export default {
    title: 'Components/unstable/StoriesGroup',
    component: StoriesGroup,
} as Meta;

const baseGroups: StoriesGroupItem[] = new Array(12).fill(0).map((_, index) => {
    return {
        items: [
            {
                title: 'New navigation',
                textBlockStyle: StoriesTextBlockStyle.Card,
                mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
                description:
                    'At the top of the panel is the service navigation for each service. ' +
                    'Below are common navigation elements: a component for switching between accounts ' +
                    'and organizations, settings, help center, search, notifications, favorites.',
                url: 'https://yandex.eu',
                media: {
                    type: 'image',
                    url: `https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-${(index % 3) + 5}.png`,
                },
            },
            {
                title: 'New navigation (2)',
                textBlockStyle: StoriesTextBlockStyle.Transparent,
                mediaBlockStyle: StoriesMediaBlockStyle.HalfSizeWithMargins,
                description: 'A little more about the new navigation',
                media: {
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
                    type: 'video',
                },
            },
        ],
    };
});

const groups: StoriesGroupItem[] = [
    {
        items: [
            {
                title: 'New navigation',
                textBlockStyle: StoriesTextBlockStyle.Card,
                mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
                firstAction: {
                    children: 'First button',
                    view: 'action',
                },
                secondAction: {
                    children: 'Second button',
                    view: 'normal',
                },
                description:
                    'At the top of the panel is the service navigation for each service. ' +
                    'Below are common navigation elements: a component for switching between accounts ' +
                    'and organizations, settings, help center, search, notifications, favorites.',
                url: 'https://yandex.eu',
                media: {
                    type: 'image',
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
                },
            },
            {
                title: 'New navigation',
                textBlockStyle: StoriesTextBlockStyle.Transparent,
                mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
                description:
                    'At the top of the panel is the service navigation for each service. ' +
                    'Below are common navigation elements: a component for switching between accounts ' +
                    'and organizations, settings, help center, search, notifications, favorites.',
                url: 'https://yandex.eu',
                media: {
                    type: 'image',
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
                },
            },
            {
                title: 'New navigation (2)',
                textBlockStyle: StoriesTextBlockStyle.Transparent,
                mediaBlockStyle: StoriesMediaBlockStyle.HalfSizeWithMargins,
                firstAction: {
                    children: 'First button',
                    view: 'action',
                },
                secondAction: {
                    children: 'Second button',
                    view: 'normal',
                },
                description: 'A little more about the new navigation',
                media: {
                    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
                    type: 'video',
                },
            },
        ],
    },
    ...baseGroups,
];

const DefaultTemplate: StoryFn<StoriesGroupProps> = (props: StoriesGroupProps) => {
    const [visible, setVisible] = React.useState(props.open);

    React.useEffect(() => {
        setVisible(props.open);
    }, [props.open]);

    return (
        <React.Fragment>
            <div>
                <Button
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Open
                </Button>
            </div>
            <StoriesGroup
                {...props}
                open={visible}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    initialStoryIndex: [0, 0],
    open: false,
    groups: groups.slice(0, 2),
};
Default.argTypes = {};

export const MoreGroups = DefaultTemplate.bind({});

MoreGroups.args = {
    initialStoryIndex: [0, 0],
    open: false,
    groups,
};
MoreGroups.argTypes = {};
