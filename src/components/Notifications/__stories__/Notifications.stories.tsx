/* eslint-disable no-console */
import {Archive, ArrowRotateLeft, CircleCheck, Funnel} from '@gravity-ui/icons';
import {Button, DropdownMenu} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import {delay} from '../../InfiniteScroll/__stories__/utils';
import {NotificationAction} from '../../Notification/NotificationAction';
import {NotificationProps} from '../../Notification/definitions';
import {Notifications} from '../Notifications';
import {generateNotification, mockNotifications} from './mockData';

export default {
    title: 'Components/Notifications',
    component: Notifications,
} as Meta<typeof Notifications>;

const Wrapper = (props: React.PropsWithChildren) => {
    return (
        <div
            style={{
                borderRadius: '8px',
                border: '1px solid var(--g-color-line-generic)',
                margin: '4px',
                width: '350px',
                height: '470px',
                overflowY: 'auto',
            }}
        >
            {props.children}
        </div>
    );
};

type BooleanMap = Record<string, boolean | undefined>;

export const Default: StoryFn = () => {
    const [unreadNotifications, setUnreadNotifications] = React.useState<BooleanMap>({
        tracker: true,
        samurai: true,
    });

    const [archivedNotifications, setArchivedNotifications] = React.useState<BooleanMap>({});

    const getSideActions = React.useCallback(
        (
            id: NotificationProps['id'],
            unread: boolean | undefined,
            archived: boolean | undefined,
        ) => (
            <>
                <NotificationAction
                    action={{
                        icon: unread ? CircleCheck : ArrowRotateLeft,
                        text: `Mark as ${unread ? 'read' : 'unread'}`,
                        onClick: () =>
                            setUnreadNotifications((current) => ({...current, [id]: !unread})),
                    }}
                />
                <NotificationAction
                    action={{
                        icon: Archive,
                        text: 'Archive',
                        onClick: () =>
                            setArchivedNotifications((current) => ({...current, [id]: !archived})),
                    }}
                />
            </>
        ),
        [],
    );

    const notifications = React.useMemo<NotificationProps[]>(
        () =>
            mockNotifications.map((notification: NotificationProps) => {
                const id = notification.id;
                const unread = unreadNotifications[id];
                const archived = archivedNotifications[id];

                return {
                    ...notification,
                    unread,
                    archived,
                    sideActions: getSideActions(id, unread, archived),
                };
            }),
        [unreadNotifications, archivedNotifications],
    );

    const actions = (
        <>
            <NotificationAction
                action={{
                    icon: Archive,
                    text: 'Remove all from archive',
                    onClick: () => setArchivedNotifications({}),
                }}
            />
            <DropdownMenu
                switcher={
                    <NotificationAction
                        action={{
                            icon: Funnel,
                            text: 'Filter',
                            onClick: () => console.log('FILTER'),
                        }}
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

    return (
        <Wrapper>
            <Notifications notifications={notifications} actions={actions} />
        </Wrapper>
    );
};

export const LoadByScrolling: StoryFn = () => {
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const areAllNotificationsLoaded = notifications.length >= 40;

    const onLoadMoreNotifications = async () => {
        await delay(1500);

        const newNotifications = Array.from({length: 10}).map((_, i) =>
            generateNotification(1 + notifications.length + i),
        );

        setNotifications((value) => [...value, ...newNotifications]);
    };

    return (
        <Wrapper>
            <Notifications
                notifications={notifications}
                onLoadMoreNotifications={onLoadMoreNotifications}
                areAllNotificationsLoaded={areAllNotificationsLoaded}
            />
        </Wrapper>
    );
};

export const Loading: StoryFn = () => {
    return (
        <Wrapper>
            <Notifications notifications={[]} isLoading={true} />
        </Wrapper>
    );
};

export const Error: StoryFn = () => {
    return (
        <Wrapper>
            <Notifications
                notifications={[]}
                errorContent={
                    <>
                        <div>Some error occurred</div>
                        <div style={{marginTop: '16px'}}>
                            <Button>Reload</Button>
                        </div>
                    </>
                }
            />
        </Wrapper>
    );
};

export const Empty: StoryFn = () => {
    return (
        <Wrapper>
            <Notifications
                notifications={[]}
                emptyContent={'You have not received any notifications'}
            />
        </Wrapper>
    );
};
