import * as React from 'react';

import {Bell, Funnel, Gear} from '@gravity-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    Icon,
    Popup,
    SegmentedRadioGroup,
    Tab,
    TabList,
    Text,
} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {delay} from '../../InfiniteScroll/__stories__/utils';
import {NotificationAction} from '../../Notification/NotificationAction';
import {NotificationProps, NotificationSourcePlacement} from '../../Notification/definitions';
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
    const {showNotificationsActions, showNotificationActions, sourcePlacement, renderControls} =
        useNotificationsVariationsControl();

    const {notifications, actions} = useNotificationsWithActions({
        showNotificationsActions,
        showNotificationActions,
        sourcePlacement,
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

export const CustomHeader: StoryFn = () => {
    return (
        <Wrapper>
            <NotificationsWithCustomHeader />
        </Wrapper>
    );
};

function NotificationsWithCustomHeader() {
    const [activeTab, setActiveTab] = React.useState('first');

    return (
        <Notifications
            renderCustomHeader={({title}) => (
                <CustomHeaderComponent
                    title={title}
                    activeTab={activeTab}
                    onTabUpdate={setActiveTab}
                />
            )}
            notifications={activeTab === 'first' ? mockNotifications : []}
        />
    );
}

interface CustomHeaderComponentProps {
    title: React.ReactNode;
    activeTab: string;
    onTabUpdate?: (tab: string) => void;
}

function CustomHeaderComponent({title, activeTab, onTabUpdate}: CustomHeaderComponentProps) {
    return (
        <div>
            <div
                style={{
                    padding: '16px 16px 0 16px',
                }}
            >
                {title}
            </div>
            <div style={{position: 'relative'}}>
                <TabList value={activeTab} onUpdate={onTabUpdate}>
                    <Tab style={{marginLeft: '16px'}} value="first">
                        First tab
                    </Tab>
                    <Tab value="second">Second tab</Tab>
                </TabList>
                <Flex
                    style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                    gap={1}
                >
                    <NotificationAction action={{icon: Funnel, text: 'Filter'}} />
                    {activeTab === 'second' && (
                        <NotificationAction action={{icon: Gear, text: 'Settings'}} />
                    )}
                </Flex>
            </div>
        </div>
    );
}

function useNotificationsVariationsControl() {
    const [showNotificationsActions, setShowNotificationsActions] = React.useState(true);
    const [showNotificationActions, setShowNotificationActions] = React.useState(true);
    const [sourcePlacement, setSourcePlacement] =
        React.useState<NotificationSourcePlacement>('bottom');

    return {
        showNotificationsActions,
        showNotificationActions,
        sourcePlacement,
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
                <Flex direction="column" gap={1}>
                    <Text>Source/date placement</Text>
                    <SegmentedRadioGroup<NotificationSourcePlacement>
                        value={sourcePlacement}
                        onUpdate={setSourcePlacement}
                        options={[
                            {value: 'bottom', content: 'Bottom'},
                            {value: 'top', content: 'Top'},
                        ]}
                    />
                </Flex>
            </Flex>
        ),
    };
}

function useNotificationsWithActions({
    showNotificationsActions = true,
    showNotificationActions = true,
    sourcePlacement = 'bottom',
}: {
    showNotificationsActions?: boolean;
    showNotificationActions?: boolean;
    sourcePlacement?: NotificationSourcePlacement;
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
                    sourcePlacement,
                };
            }),
        [archivedNotifications, unreadNotifications, sourcePlacement, getSideActions],
    );

    const actions = showNotificationsActions ? (
        <React.Fragment>
            {notificationsMockActions.unarchive(() => setArchivedNotifications({}))}
            {notificationsMockActions.filter()}
        </React.Fragment>
    ) : null;

    return {notifications, actions};
}
