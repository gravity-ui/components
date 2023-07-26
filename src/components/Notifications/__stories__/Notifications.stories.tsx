/* eslint-disable no-console */
import {Bell} from '@gravity-ui/icons';
import {Button, Icon, Popup} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';
import React from 'react';
import {delay} from '../../InfiniteScroll/__stories__/utils';
import {NotificationProps} from '../../Notification/definitions';
import {Notifications} from '../Notifications';
import {NotificationsPopupWrapper} from '../NotificationsPopupWrapper';
import {
    generateNotification,
    mockNotifications,
    notificationSideActions,
    notificationsMockActions,
} from './mockData';

export default {
    title: 'Components/Notifications',
    component: Notifications,
} as Meta<typeof Notifications>;

const wrapperStyles = {
    borderRadius: '8px',
    border: '1px solid var(--g-color-line-generic)',
    background: 'var(--g-color-base-background)',
    margin: '4px',
};

const Wrapper = (props: React.PropsWithChildren) => {
    return (
        <NotificationsPopupWrapper style={wrapperStyles}>
            {props.children}
        </NotificationsPopupWrapper>
    );
};

type BooleanMap = Record<string, boolean | undefined>;

export const Default: StoryFn = () => {
    const {notifications, actions} = getNotificationsWithActions();

    return (
        <Wrapper>
            <Notifications notifications={notifications} actions={actions} />
        </Wrapper>
    );
};

export const LoadByScrolling: StoryFn = () => {
    const [notifications, setNotifications] = React.useState<NotificationProps[]>([]);
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

export const InsideAPopup: StoryFn = () => {
    const {notifications, actions} = getNotificationsWithActions();
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = React.useRef(null);

    return (
        <>
            <Button onClick={() => setIsOpen(!isOpen)} ref={ref}>
                <Icon data={Bell} />
            </Button>
            <Popup open={isOpen} anchorRef={ref}>
                <NotificationsPopupWrapper>
                    <Notifications notifications={notifications} actions={actions} />
                </NotificationsPopupWrapper>
            </Popup>
        </>
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

function getNotificationsWithActions() {
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
                {notificationSideActions.read(Boolean(unread), () =>
                    setUnreadNotifications((current) => ({...current, [id]: !unread})),
                )}
                {notificationSideActions.archive(() =>
                    setArchivedNotifications((current) => ({...current, [id]: !archived})),
                )}
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
            {notificationsMockActions.unarchive(() => setArchivedNotifications({}))}
            {notificationsMockActions.filter()}
        </>
    );

    return {notifications, actions};
}
