import React from 'react';

import {Bell} from '@gravity-ui/icons';
import {Button, Checkbox, Flex, Icon, Popup} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

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
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: false,
                        selector: 'button[aria-labelledby]',
                    },
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'link-in-text-block',
                        enabled: false,
                    },
                ],
            },
        },
    },
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
    const {showNotificationsActions, showNotificationActions, renderControls} =
        useNotificationsVariationsControl();

    const {notifications, actions} = useNotificationsWithActions({
        showNotificationsActions,
        showNotificationActions,
    });

    return (
        <Flex gap={4}>
            <Wrapper>
                <Notifications notifications={notifications} actions={actions} />
            </Wrapper>
            {renderControls()}
        </Flex>
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
    const {notifications, actions} = useNotificationsWithActions();
    const [isOpen, setIsOpen] = React.useState(false);
    const ref = React.useRef(null);

    return (
        <React.Fragment>
            <Button onClick={() => setIsOpen(!isOpen)} ref={ref}>
                <Icon data={Bell} />
            </Button>
            <Popup open={isOpen} anchorRef={ref}>
                <NotificationsPopupWrapper>
                    <Notifications notifications={notifications} actions={actions} />
                </NotificationsPopupWrapper>
            </Popup>
        </React.Fragment>
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
                    <React.Fragment>
                        <div>Some error occurred</div>
                        <div style={{marginTop: '16px'}}>
                            <Button>Reload</Button>
                        </div>
                    </React.Fragment>
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

function useNotificationsVariationsControl() {
    const [showNotificationsActions, setShowNotificationsActions] = React.useState(true);
    const [showNotificationActions, setShowNotificationActions] = React.useState(true);

    return {
        showNotificationsActions,
        showNotificationActions,
        renderControls: () => (
            <Flex gap={2} direction="column">
                <Checkbox
                    title=""
                    checked={showNotificationsActions}
                    onUpdate={(updated) => setShowNotificationsActions(updated)}
                >
                    Notifications actions
                </Checkbox>
                <Checkbox
                    checked={showNotificationActions}
                    onUpdate={(updated) => setShowNotificationActions(updated)}
                >
                    Notification actions
                </Checkbox>
            </Flex>
        ),
    };
}

function useNotificationsWithActions({
    showNotificationsActions = true,
    showNotificationActions = true,
} = {}) {
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
        ) =>
            showNotificationActions ? (
                <React.Fragment>
                    {notificationSideActions.read(Boolean(unread), () =>
                        setUnreadNotifications((current) => ({...current, [id]: !unread})),
                    )}
                    {notificationSideActions.archive(() =>
                        setArchivedNotifications((current) => ({...current, [id]: !archived})),
                    )}
                </React.Fragment>
            ) : null,
        [showNotificationActions],
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
        [unreadNotifications, archivedNotifications, getSideActions],
    );

    const actions = showNotificationsActions ? (
        <React.Fragment>
            {notificationsMockActions.unarchive(() => setArchivedNotifications({}))}
            {notificationsMockActions.filter()}
        </React.Fragment>
    ) : null;

    return {notifications, actions};
}
