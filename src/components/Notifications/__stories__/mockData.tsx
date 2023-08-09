/* eslint-disable no-console */
import React from 'react';

import {Archive, Funnel, PencilToSquare, Plus, TrashBin} from '@gravity-ui/icons';
import {DropdownMenu} from '@gravity-ui/uikit';

import {NotificationAction} from '../../Notification/NotificationAction';
import {NotificationSwipeAction} from '../../Notification/NotificationSwipeAction';
import {NotificationProps, NotificationSwipeActionsProps} from '../../Notification/definitions';

import {
    svgCloudStoryIcon,
    svgReactStoryIcon,
    svgTrackerStoryIcon,
    svgYandexStoryIcon,
} from './storyIcons';

export const notificationsMockActions: JSX.Element = (
    <>
        <NotificationAction action={{icon: Plus, text: 'Add', onClick: () => console.log('ADD')}} />
        <DropdownMenu
            switcher={
                <NotificationAction
                    action={{icon: Funnel, text: 'Filter', onClick: () => console.log('FILTER')}}
                />
            }
            items={[
                {text: 'Any', action: () => console.log('any')},
                {text: 'Tracker', action: () => console.log('tracker')},
                {text: 'Cloud', action: () => console.log('cloud')},
                {text: 'You can put any popup here', action: () => console.log('cloud')},
            ]}
        />
    </>
);

export const notificationsMockSwipeActions: NotificationSwipeActionsProps = {
    left: {
        content: (
            <NotificationSwipeAction
                icon={TrashBin}
                text="Delete"
                theme="danger"
                action={() => console.log('DELETE')}
            />
        ),
        onSwipe: () => console.log('LEFT ACTION (DELETE) SHOWN'),
    },
    right: {
        content: (
            <NotificationSwipeAction
                icon={Archive}
                text="Archive"
                theme="base"
                action={() => console.log('ARCHIVE')}
            />
        ),
        onSwipe: () => console.log('RIGHT ACTION (ARCHIVE) SHOWN'),
    },
};

export const notificationSideActions: JSX.Element = (
    <>
        <NotificationAction
            action={{icon: PencilToSquare, text: 'Edit', onClick: () => console.log('FILTER')}}
        />
        <NotificationAction
            action={{icon: TrashBin, text: 'Delete', onClick: () => console.log('DELETE')}}
        />
    </>
);

export const notificationBottomActions: JSX.Element = (
    <>
        <NotificationAction
            action={{text: 'Confirm', view: 'normal', onClick: () => console.log('CONFIRM')}}
        />
        <NotificationAction
            action={{text: 'Deny', view: 'normal', onClick: () => console.log('DENY')}}
        />
    </>
);

export const mockNotifications: NotificationProps[] = [
    {
        id: 'tracker',
        title: 'An unread notification',
        content: 'No one has read this notification yet...',
        formattedDate: 'just now',
        source: {
            title: 'Tracker',
            icon: svgTrackerStoryIcon,
            href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        unread: true,
        sideActions: notificationSideActions,
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'samurai',
        content: <i>A samurai has no goal, only a path</i>,
        formattedDate: '12 seconds ago',
        unread: true,
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'minimum',
        content: <i>Bare minimum</i>,
    },
    {
        id: 'ninja',
        content: <i>Reaction of a cat, speed of a mongoose</i>,
        formattedDate: '28 seconds ago',
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'yandex',
        content: (
            <>
                You can put <b>any</b> <code>ReactNode</code> <i>here</i>
            </>
        ),
        formattedDate: '30 seconds ago',
        source: {
            title: 'Yandex',
            icon: svgYandexStoryIcon,
            href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        unread: false,
        theme: 'info',
        sideActions: notificationSideActions,
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'one',
        title: 'An extremely long title without any need being that long',
        content:
            'Chat-GPT says: Cloud finance has revolutionized the way businesses manage their financial operations. With the ability to access financial data and tools from anywhere, at any time, cloud finance has made it easier than ever for businesses to stay on top of their finances and make informed decisions. Additionally, the scalability and flexibility of cloud finance solutions have made them an attractive option for businesses of all sizes.',
        formattedDate: '5 minutes ago',
        source: {
            title: 'Billing',
            icon: svgCloudStoryIcon,
            href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        theme: 'success',
        bottomActions: notificationBottomActions,
        swipeActions: {...notificationsMockSwipeActions, left: undefined},
    },
    {
        id: 'three',
        title: 'Update is required',
        content: 'React 18 is now deprecated! Please, update to React 18.0.1',
        source: {
            title: 'React',
            icon: svgReactStoryIcon,
            href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        formattedDate: 'ethernity ago',
        theme: 'danger',
        swipeActions: {...notificationsMockSwipeActions, right: undefined},
    },
];
