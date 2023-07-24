import {useMobile} from '@gravity-ui/uikit';
import React from 'react';
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
    const [mobile] = useMobile();
    const [wrapperMaxHeight, setWrapperMaxHeight] = React.useState<number | undefined>(undefined);
    const [isRemoved, setIsRemoved] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current) {
            if (!notification.archived && isRemoved) {
                setIsRemoved(false);
            }
            return () => {};
        }

        if (notification.archived) {
            const listener = (event: TransitionEvent) => {
                if (event.propertyName === 'max-height') {
                    setIsRemoved(true);
                    ref.current?.removeEventListener('transitionend', listener);
                }
            };

            ref.current.addEventListener('transitionend', listener);

            ref.current.style.transition = 'max-height 0.3s';
            setWrapperMaxHeight(0);

            return () => {
                ref.current?.removeEventListener('transitionend', listener);
            };
        } else {
            setIsRemoved(false);

            setTimeout(() => {
                if (!ref.current) return;

                ref.current.style.transition = 'none';
                ref.current.style.maxHeight = 'none';

                const maxHeight = ref.current?.getBoundingClientRect().height ?? 0;
                setWrapperMaxHeight(maxHeight);
            }, 0);

            return () => {};
        }
    }, [ref, notification.archived, isRemoved]);

    const style = wrapperMaxHeight === undefined ? {} : {maxHeight: `${wrapperMaxHeight}px`};

    if (isRemoved) {
        return <></>;
    }

    return (
        <div
            className={b('notification-wrapper', {
                archived: notification.archived,
                unread: notification.unread,
            })}
            ref={ref}
            style={style}
        >
            {mobile && notification.swipeActions ? (
                <NotificationWithSwipe
                    notification={notification}
                    swipeThreshold={swipeThreshold}
                />
            ) : (
                <Notification notification={notification} />
            )}
        </div>
    );
};
