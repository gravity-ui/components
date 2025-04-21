import * as React from 'react';

import {Archive, ArrowRotateLeft, CircleCheck, Funnel, TrashBin} from '@gravity-ui/icons';
import {Avatar, DropdownMenu, Icon, Link} from '@gravity-ui/uikit';

import {NotificationAction} from '../../Notification/NotificationAction';
import {NotificationSwipeAction} from '../../Notification/NotificationSwipeAction';
import {NotificationProps, NotificationSwipeActionsProps} from '../../Notification/definitions';

import {
    svgCloudStoryIcon,
    svgReactStoryIcon,
    svgTrackerStoryIcon,
    svgYandexStoryIcon,
    trackerUserIcon,
} from './storyIcons';

const LINK = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export const notificationsMockActions = {
    unarchive: (onClick: () => void) => (
        <NotificationAction action={{icon: Archive, text: 'Remove all from archive', onClick}} />
    ),
    filter: () => (
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
    ),
};

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

export const notificationSideActions = {
    read: (unread: boolean, onClick: () => void) => (
        <NotificationAction
            action={{
                icon: unread ? CircleCheck : ArrowRotateLeft,
                text: `Mark as ${unread ? 'read' : 'unread'}`,
                onClick,
            }}
        />
    ),
    archive: (onClick: () => void) => (
        <NotificationAction action={{icon: Archive, text: 'Archive', onClick}} />
    ),
};

export const notificationBottomActions: JSX.Element = (
    <React.Fragment>
        <NotificationAction
            action={{text: 'Confirm', view: 'normal', onClick: () => console.log('CONFIRM')}}
        />
        <NotificationAction
            action={{text: 'Deny', view: 'normal', onClick: () => console.log('DENY')}}
        />
    </React.Fragment>
);

export const mockNotifications: NotificationProps[] = [
    {
        id: 'tracker',
        title: 'An unread notification',
        content: (
            <div style={{position: 'relative', paddingInlineEnd: '16px'}}>
                Shrek desperately wants your attention in this{' '}
                <Link target={'_blank'} href={LINK}>
                    ticket
                </Link>
            </div>
        ),
        formattedDate: 'just now',
        source: {
            title: 'Tracker',
            custom: (
                <div style={{position: 'relative'}}>
                    <Avatar imgUrl={trackerUserIcon} />
                    <div style={{position: 'absolute', right: '0', bottom: '0'}}>
                        <Icon size={14} data={svgTrackerStoryIcon} />
                    </div>
                </div>
            ),
            href: LINK,
        },
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'samurai',
        content: <i>A samurai has no goal, only a path</i>,
        formattedDate: '12 seconds ago',
        swipeActions: notificationsMockSwipeActions,
    },
    {
        id: 'minimum',
        content: <i>Bare minimum</i>,
        formattedDate: '13 seconds ago',
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
            <React.Fragment>
                You can put <b>any</b> <code>ReactNode</code> <i>here</i>
            </React.Fragment>
        ),
        formattedDate: '30 seconds ago',
        source: {
            title: 'Yandex',
            icon: svgYandexStoryIcon,
            href: LINK,
        },
        theme: 'info',
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
            href: LINK,
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
            href: LINK,
        },
        formattedDate: 'ethernity ago',
        theme: 'danger',
        swipeActions: {...notificationsMockSwipeActions, right: undefined},
    },
];

export function generateNotification(index: number): NotificationProps {
    return {
        id: `notification-${index}`,
        title: `We are number ${index}`,
        content: `You're viewing notification #${index}`,
        formattedDate: `${Math.round(index / 2) + 2} minutes ago`,
    };
}
