import React from 'react';
import Swipe from 'swipejs';
import {block} from '../utils/cn';
import {Notification} from './Notification';
import './Notification.scss';
import {NotificationProps} from './definitions';

const b = block('notification');

type Props = {notification: NotificationProps; isMobile?: boolean};

export const NotificationWithSwipe = React.memo(function NotificationWithSwipe(props: Props) {
    const ref = React.useRef<HTMLDivElement>(null);
    const notification = props.notification;
    const swipeActions = notification.swipeActions;

    const startSlide = React.useMemo(
        () => (swipeActions && 'left' in swipeActions ? 1 : 0),
        [swipeActions],
    );

    const callback = React.useCallback(
        (index: number) => {
            if (!swipeActions) return;

            if ('left' in swipeActions) {
                if (index === 0) {
                    swipeActions.left.onActivate();
                } else if ('right' in swipeActions && index === 2) {
                    swipeActions.right.onActivate();
                }
            } else if ('right' in swipeActions && index === 1) {
                swipeActions.right.onActivate();
            }
        },
        [swipeActions],
    );

    React.useEffect(() => {
        if (!ref.current) return undefined;

        const swipe = new Swipe(ref.current, {
            startSlide,
            callback,

            speed: 100,
            draggable: true,
            continuous: false,
            disableScroll: false,
            stopPropagation: true,
            autoRestart: false,
        });

        return () => {
            swipe.kill();
        };
    }, [callback, startSlide]);

    return (
        <div className={b('swipe')} ref={ref}>
            <div className={b('swipe-wrap')}>
                {notification.swipeActions && 'left' in notification.swipeActions ? (
                    <div className={b('swipe-action')}>
                        {notification.swipeActions.left.content}
                    </div>
                ) : null}
                <Notification {...props} />
                {notification.swipeActions && 'right' in notification.swipeActions ? (
                    <div className={b('swipe-action')}>
                        {notification.swipeActions.right.content}
                    </div>
                ) : null}
            </div>
        </div>
    );
});
