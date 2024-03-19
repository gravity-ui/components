import React from 'react';

import {settings} from '@gravity-ui/date-utils';
import {Button, Lang, configure} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {ChangelogDialog} from '../ChangelogDialog';
import type {ChangelogDialogProps} from '../ChangelogDialog';
import type {ChangelogItem} from '../types';

export default {
    title: 'Components/ChangelogDialog',
    component: ChangelogDialog,
    argTypes: {
        onStoryClick: {
            action: 'onStoryClick',
        },
        locale: {
            name: 'Date locale',
            options: ['en', 'ru'],
            control: {type: 'radio'},
        },
    },
} as Meta;

const items: ChangelogItem[] = [
    {
        date: '2022-07-03',
        isNew: true,
        title: 'New navigation',
        image: {
            src: 'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-1.png',
            alt: 'New navigation',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId1',
        link: 'https://github.com/gravity-ui/uikit',
    },
    {
        date: '2022-06-23',
        isNew: true,
        title: 'New components',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        link: 'https://github.com/gravity-ui/uikit',
    },
    {
        date: '2022-06-15',
        title: 'Dark theme is now available',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
    {
        date: '2022-05-12',
        title: 'Minor fixes',
        image: {
            src: 'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId2',
    },
    {
        date: '2022-05',
        title: 'New features',
        image: {
            src: 'broken-url',
            ratio: 240 / 516,
        },
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
        storyId: 'someStoryId3',
        link: 'https://github.com/gravity-ui/uikit',
    },
    {
        date: '2022',
        title: 'Fix basis components behavior',
        description:
            'At the top of the panel is the service navigation for each service. Below are common navigation elements: a component for switching between accounts and organizations, settings, help center, search, notifications, favorites.',
    },
];

const DefaultTemplate: StoryFn<ChangelogDialogProps & {locale: string}> = (
    props: ChangelogDialogProps & {locale: string},
) => {
    const [currentLocale, setCurrentLocale] = React.useState('');
    const [visible, setVisible] = React.useState(props.open);

    React.useEffect(() => {
        (async () => {
            await settings.loadLocale(props.locale);
            settings.setLocale(props.locale);
            configure({lang: props.locale as Lang});
            setCurrentLocale(settings.getLocale());
        })();
    }, [props.locale]);

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
            <ChangelogDialog
                {...props}
                key={currentLocale}
                open={visible}
                onClose={(event, reason) => {
                    setVisible(false);
                    props.onClose?.(event, reason);
                }}
            />
        </React.Fragment>
    );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
    locale: 'en',
    open: false,
    items,
    onStoryClick: (storyId) => {
        console.log('story click', storyId);
    },
    onLinkClick: (link) => {
        console.log('link click', link);
    },
    onClose: () => {
        console.log('close');
    },
    onRetryClick: () => {
        console.log('retry');
    },
};

export const Loading = DefaultTemplate.bind({});
Loading.args = {
    ...Default.args,
    open: true,
    loading: true,
};

export const Error = DefaultTemplate.bind({});
Error.args = {
    ...Default.args,
    open: true,
    error: true,
};
