/* eslint-disable no-console */
import {Archive, Funnel, PencilToSquare, Plus, Trash} from '@gravity-ui/icons';
import {DropdownMenu, Icon} from '@gravity-ui/uikit';
import React from 'react';
import {NotificationAction} from '../../Notification/NotificationAction';
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

const baseSwipeActionWrapperStyles = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'var(--yc-color-base-danger)',
    flex: '1',
};

const baseSwipeActionIconStyles = {
    background: 'var(--yc-color-base-danger-heavy)',
    padding: '8px',
    borderRadius: '100%',
    color: 'var(--yc-color-base-background)',
};

export const notificationsMockSwipeActions: NotificationSwipeActionsProps = {
    left: {
        content: (
            <div style={baseSwipeActionWrapperStyles}>
                <span style={baseSwipeActionIconStyles}>
                    <Icon data={Trash} size={16} />
                </span>
                <span style={{color: 'var(--yc-color-base-danger-heavy)', fontSize: '16px'}}>
                    Delete
                </span>
            </div>
        ),
        onActivate: () => console.log('LEFT'),
    },
    right: {
        content: (
            <div style={{...baseSwipeActionWrapperStyles, background: 'var(--yc-color-base-misc)'}}>
                <span
                    style={{
                        ...baseSwipeActionIconStyles,
                        background: 'var(--yc-color-text-misc)',
                    }}
                >
                    <Icon data={Archive} size={16} />
                </span>
                <span style={{color: 'var(--yc-color-text-misc)', fontSize: '16px'}}>Archive</span>
            </div>
        ),
        onActivate: () => console.log('RIGHT'),
    },
};

export const notificationSideActions: JSX.Element = (
    <>
        <NotificationAction
            action={{icon: PencilToSquare, text: 'Edit', onClick: () => console.log('FILTER')}}
        />
        <NotificationAction
            action={{icon: Trash, text: 'Delete', onClick: () => console.log('DELETE')}}
        />
    </>
);

export const notificationBottomActions: JSX.Element = (
    <>
        <NotificationAction
            action={{text: 'Confirm', view: 'normal', onClick: () => console.log('Confirm')}}
        />
        <NotificationAction
            action={{text: 'Deny', view: 'normal', onClick: () => console.log('Deny')}}
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
        swipeActions: notificationsMockSwipeActions,
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
        swipeActions: notificationsMockSwipeActions,
    },
];
