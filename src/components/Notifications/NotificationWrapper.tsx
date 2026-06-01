import * as React from 'react';

import {useMobile} from '@gravity-ui/uikit';

import {Notification} from '../Notification';
import {NotificationWithSwipe} from '../Notification/NotificationWithSwipe';
import {NotificationProps} from '../Notification/definitions';
import {block} from '../utils/cn';

import './Notifications.scss';

const b = block('notifications');

export const NotificationWrapper = (props: {
    notification: NotificationProps;
    swipeThreshold?: number;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const {notification, swipeThreshold} = props;
    const mobile = useMobile();
    const [wrapperMaxHeight, setWrapperMaxHeight] = React.useState<number | undefined>(undefined);
    const [isRemoved, setIsRemoved] = React.useState(false);

    const measureWrapperHeight = React.useCallback(() => {
        const element = ref.current;

        if (!element || notification.archived) {
            return;
        }

        element.style.transition = 'none';
        element.style.maxHeight = 'none';

        setWrapperMaxHeight(element.getBoundingClientRect().height);
    }, [notification.archived]);

    React.useEffect(() => {
        const element = ref.current;

        if (!element) {
            if (!notification.archived && isRemoved) {
                setIsRemoved(false);
            }
            return () => {};
        }

        if (notification.archived) {
            const listener = (event: TransitionEvent) => {
                if (event.propertyName === 'max-height') {
                    setIsRemoved(true);
                    element.removeEventListener('transitionend', listener);
                }
            };

            element.addEventListener('transitionend', listener);

            element.style.transition = 'max-height 0.3s';
            setWrapperMaxHeight(0);

            return () => {
                element.removeEventListener('transitionend', listener);
            };
        }

        setIsRemoved(false);

        const timeoutId = window.setTimeout(measureWrapperHeight, 0);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [notification.archived, isRemoved, measureWrapperHeight]);

    const style = wrapperMaxHeight === undefined ? {} : {maxHeight: `${wrapperMaxHeight}px`};

    if (isRemoved) {
        return null;
    }

    return (
        <li key={notification.id} className={b('item')}>
            <div
                className={b('notification-wrapper', {
                    archived: notification.archived,
                    unread: notification.unread,
                    active: Boolean(notification.onClick),
                })}
                ref={ref}
                style={style}
            >
                {mobile && notification.swipeActions ? (
                    <NotificationWithSwipe
                        notification={notification}
                        swipeThreshold={swipeThreshold}
                        rootRef={ref}
                        onResize={measureWrapperHeight}
                    />
                ) : (
                    <Notification
                        notification={notification}
                        rootRef={ref}
                        onResize={measureWrapperHeight}
                    />
                )}
            </div>
        </li>
    );
};
