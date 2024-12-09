import React from 'react';

import {Button, Flex, Text} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import type {StoriesProps} from '../Stories';
import {Stories} from '../Stories';
import type {StoriesItem} from '../types';
import {StoriesMediaBlockStyle, StoriesTextBlockStyle} from '../types';

export default {
    title: 'Components/Stories',
    component: Stories,
} as Meta;

const items: StoriesItem[] = [
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
            'and organizations, settings, help center, search, notifications, favorites.' +
            'At the top of the panel is the service navigation for each service. ' +
            'Below are common navigation elements: a component for switching between accounts ' +
            'and organizations, settings, help center, search, notifications, favorites.' +
            'At the top of the panel is the service navigation for each service. ' +
            'Below are common navigation elements: a component for switching between accounts ' +
            'and organizations, settings, help center, search, notifications, favorites.' +
            'At the top of the panel is the service navigation for each service. ' +
            'Below are common navigation elements: a component for switching between accounts ' +
            'and organizations, settings, help center, search, notifications, favorites.' +
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
        description: 'A little more about the new navigation',
        textBlockStyle: StoriesTextBlockStyle.Transparent,
        mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
        firstAction: {
            children: 'First button',
            view: 'action',
        },
        secondAction: {
            children: 'Second button',
            view: 'normal',
        },
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
            type: 'image',
        },
    },
    {
        title: 'New navigation (2)',
        description: 'A little more about the new navigation',
        textBlockStyle: StoriesTextBlockStyle.Transparent,
        mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            type: 'video',
        },
    },
    {
        title: 'New navigation (2)',
        description: 'A little more about the new navigation',
        textBlockStyle: StoriesTextBlockStyle.Card,
        mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
        media: {
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            type: 'video',
        },
    },
    {
        title: 'New navigation (3)',
        description: 'Switch to the new navigation right now',
        textBlockStyle: StoriesTextBlockStyle.Transparent,
        mediaBlockStyle: StoriesMediaBlockStyle.HalfSizeWithMargins,
        media: {
            type: 'image',
            url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-7.png',
        },
    },
];

const BaseStory = ({description, items}: {description: string; items: StoriesProps['items']}) => {
    const [visible, setVisible] = React.useState(false);

    return (
        <Flex direction="column">
            <Text>{description}</Text>
            <Button
                style={{width: 'fit-content'}}
                onClick={() => {
                    setVisible(true);
                }}
            >
                Open
            </Button>

            <Stories
                items={items}
                open={visible}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </Flex>
    );
};

const DefaultTemplate: StoryFn<StoriesProps> = () => {
    const itemsFirst: StoriesProps['items'] = [
        {
            title: 'Default story with simple text',
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSizeWithMargins,
            description:
                'This story has default value for props textBlockStyle = "card" and mediaBlockStyle = "half-size-with-margins" ',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-7.png',
            },
        },
        {
            title: 'Story without margins in media block',
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
            description:
                'Props value: textBlockStyle = "card", mediaBlockStyle = "half-size-with-margins" and media type = "image"',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-7.png',
            },
        },
        {
            title: 'Story with full-size media block',
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
            description:
                'Props value: textBlockStyle = "card", mediaBlockStyle = "full-size" and media type = "image"',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
            },
        },
        {
            title: 'Story with full-size media block and transparent text-block',
            textBlockStyle: StoriesTextBlockStyle.Transparent,
            mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
            description:
                'Props value: textBlockStyle = "transparent", mediaBlockStyle = "full-size" and media type = "image"',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
            },
        },
    ];

    const itemsSecond: StoriesProps['items'] = [
        {
            title: 'Story with video half-size',
            textBlockStyle: StoriesTextBlockStyle.Transparent,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
            description:
                'Props value: textBlockStyle = "transparent", mediaBlockStyle = "half-size" and media type = "video"',
            media: {
                type: 'video',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            },
        },
        {
            title: 'Story with video half-size with margins and extra actions',
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSizeWithMargins,
            firstAction: {
                children: 'First button',
                view: 'action',
            },
            secondAction: {
                children: 'Second button',
                view: 'normal',
            },
            description:
                'Props value: textBlockStyle = "card", mediaBlockStyle = "half-size-with-margins" and media type = "video"',
            media: {
                type: 'video',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            },
        },
        {
            title: 'Story with video full-size',
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
            description:
                'Props value: textBlockStyle = "card", mediaBlockStyle = "full-size" and media type = "video"',
            media: {
                type: 'video',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            },
        },
    ];

    const itemsThird: StoriesProps['items'] = [
        {
            title: 'Story with full-size image, extra actions, long text and default text colors',
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
                'Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc at parturient tristique senectus class duis eget per taciti. Eu rutrum est euismod risus aliquet in. Vehicula habitant nostra enim quis blandit consequat. Blandit ex ut purus; vestibulum accumsan duis? Porttitor accumsan at molestie integer nulla habitant? Egestas urna suscipit eleifend tortor mauris montes vulputate primis?Tempor viverra vitae tempus consectetur egestas? Quam dolor dictumst pellentesque porta; pulvinar conubia placerat risus. Leo at elementum vivamus fermentum erat taciti. Turpis ipsum faucibus primis purus, montes curae eu vel. Lacus metus sagittis dictumst diam libero imperdiet rhoncus neque. Natoque nullam inceptos porttitor integer porttitor nascetur a interdum. Imperdiet scelerisque rutrum congue massa eleifend torquent nisi. Sociosqu libero volutpat nisl orci viverra. Tristique egestas auctor conubia; etiam lectus scelerisque ligula. Magnis ultrices venenatis vivamus hac taciti inceptos leo. Interdum magnis sollicitudin elementum placerat montes. Lacinia platea netus nascetur ornare sociosqu. Inceptos taciti iaculis interdum nisl sodales in eros fermentum. Justo maecenas elementum condimentum feugiat consectetur semper sollicitudin. Primis sodales posuere facilisis donec ipsum efficitur. Faucibus accumsan lectus bibendum rhoncus maecenas, eget aliquam netus. Lectus torquent ut sodales fringilla natoque.',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-6.png',
            },
        },
        {
            title: 'Story with full-size image, transparent text-block and long content with extra actions and custom text colors',
            textBlockStyle: StoriesTextBlockStyle.Transparent,
            mediaBlockStyle: StoriesMediaBlockStyle.FullSize,
            textColorStyles: {
                titleColor: 'var(--g-color-text-brand)',
                counterColor: 'var(--g-color-text-brand)',
                descriptionColor: 'var(--g-color-text-inverted-primary)',
            },
            firstAction: {
                children: 'First button',
                view: 'action',
            },
            secondAction: {
                children: 'Second button',
                view: 'normal-contrast',
            },
            description:
                'Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc at parturient tristique senectus class duis eget per taciti. Eu rutrum est euismod risus aliquet in. Vehicula habitant nostra enim quis blandit consequat. Blandit ex ut purus; vestibulum accumsan duis? Porttitor accumsan at molestie integer nulla habitant? Egestas urna suscipit eleifend tortor mauris montes vulputate primis?Tempor viverra vitae tempus consectetur egestas? Quam dolor dictumst pellentesque porta; pulvinar conubia placerat risus. Leo at elementum vivamus fermentum erat taciti. Turpis ipsum faucibus primis purus, montes curae eu vel. Lacus metus sagittis dictumst diam libero imperdiet rhoncus neque. Natoque nullam inceptos porttitor integer porttitor nascetur a interdum. Imperdiet scelerisque rutrum congue massa eleifend torquent nisi. Sociosqu libero volutpat nisl orci viverra. Tristique egestas auctor conubia; etiam lectus scelerisque ligula. Magnis ultrices venenatis vivamus hac taciti inceptos leo. Interdum magnis sollicitudin elementum placerat montes. Lacinia platea netus nascetur ornare sociosqu. Inceptos taciti iaculis interdum nisl sodales in eros fermentum. Justo maecenas elementum condimentum feugiat consectetur semper sollicitudin. Primis sodales posuere facilisis donec ipsum efficitur. Faucibus accumsan lectus bibendum rhoncus maecenas, eget aliquam netus. Lectus torquent ut sodales fringilla natoque.',
            media: {
                type: 'image',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-7.png',
            },
        },
        {
            title: 'Story with full-size video, extra actions, long text and default text colors',
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
                'Lorem ipsum odor amet, consectetuer adipiscing elit. Nunc at parturient tristique senectus class duis eget per taciti. Eu rutrum est euismod risus aliquet in. Vehicula habitant nostra enim quis blandit consequat. Blandit ex ut purus; vestibulum accumsan duis? Porttitor accumsan at molestie integer nulla habitant? Egestas urna suscipit eleifend tortor mauris montes vulputate primis?Tempor viverra vitae tempus consectetur egestas? Quam dolor dictumst pellentesque porta; pulvinar conubia placerat risus. Leo at elementum vivamus fermentum erat taciti. Turpis ipsum faucibus primis purus, montes curae eu vel. Lacus metus sagittis dictumst diam libero imperdiet rhoncus neque. Natoque nullam inceptos porttitor integer porttitor nascetur a interdum. Imperdiet scelerisque rutrum congue massa eleifend torquent nisi. Sociosqu libero volutpat nisl orci viverra. Tristique egestas auctor conubia; etiam lectus scelerisque ligula. Magnis ultrices venenatis vivamus hac taciti inceptos leo. Interdum magnis sollicitudin elementum placerat montes. Lacinia platea netus nascetur ornare sociosqu. Inceptos taciti iaculis interdum nisl sodales in eros fermentum. Justo maecenas elementum condimentum feugiat consectetur semper sollicitudin. Primis sodales posuere facilisis donec ipsum efficitur. Faucibus accumsan lectus bibendum rhoncus maecenas, eget aliquam netus. Lectus torquent ut sodales fringilla natoque.',
            media: {
                type: 'video',
                url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
            },
        },
    ];

    const exampleDescription = [
        'Stories with different text and media block styles',
        'Stories with video content',
        'Stories with all features',
    ];

    return (
        <Flex gap={5} direction="column">
            {[itemsFirst, itemsSecond, itemsThird].map((items, index) => {
                return (
                    <BaseStory key={index} items={items} description={exampleDescription[index]} />
                );
            })}
        </Flex>
    );
};
export const Default = DefaultTemplate.bind({});
Default.args = {
    open: false,
    items,
};
Default.argTypes = {
    onPreviousClick: {action: 'onPreviousClick'},
    onNextClick: {action: 'onNextClick'},
};

export const Single = DefaultTemplate.bind({});
Single.args = {
    open: false,
    items: [items[0]],
};

export const WithCustomAction = DefaultTemplate.bind({});
WithCustomAction.args = {
    open: false,
    items: [items[0]],
};

export const WithSyncInTabs = DefaultTemplate.bind({});
WithSyncInTabs.args = {
    open: true,
    syncInTabsKey: 'test-story',
    items: [items[0]],
};
