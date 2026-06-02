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
    const [isRemoved, setIsRemoved] = React.useState(false);

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

            element.style.maxHeight = `${element.scrollHeight}px`;
            element.style.transition = 'max-height 0.3s';

            // Firefox batches style changes made within a single frame, so setting maxHeight
            // to scrollHeight and then to 0px in the same frame skips the transition entirely.
            // Two nested requestAnimationFrame calls guarantee the browser commits the initial
            // maxHeight in one frame before applying 0px in the next, so the animation runs.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    element.style.maxHeight = '0px';
                });
            });

            return () => {
                element.removeEventListener('transitionend', listener);
            };
        }

        setIsRemoved(false);

        return () => {};
    }, [notification.archived, isRemoved]);

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
            >
                {mobile && notification.swipeActions ? (
                    <NotificationWithSwipe
                        notification={notification}
                        swipeThreshold={swipeThreshold}
                        wrapperRef={ref}
                    />
                ) : (
                    <Notification notification={notification} wrapperRef={ref} />
                )}
            </div>
        </li>
    );
};
