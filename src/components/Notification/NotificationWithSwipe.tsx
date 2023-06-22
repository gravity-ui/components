import clamp from 'lodash/clamp';
import React, {useState} from 'react';
import TinyGesture from 'tinygesture';
import {block} from '../utils/cn';
import {Notification} from './Notification';
import './Notification.scss';
import {NotificationProps, NotificationSwipeActionProps} from './definitions';

const b = block('notification');
const notificationWrapperCls = b('notification-wrapper');
const swipeActionContainerCls = b('swipe-action-container');

type Props = {notification: NotificationProps; swipeThreshold?: number};

export const NotificationWithSwipe = React.memo(function NotificationWithSwipe(props: Props) {
    const swipeThreshold = props.swipeThreshold ?? 0.4;

    if (swipeThreshold < 0 || swipeThreshold > 1) {
        throw new Error('Invalid value for swipeThreshold');
    }

    const ref = React.useRef<HTMLDivElement>(null);
    const notification = props.notification;
    const swipeActions = notification.swipeActions;
    const leftAction = swipeActions && 'left' in swipeActions ? swipeActions.left : undefined;
    const rightAction = swipeActions && 'right' in swipeActions ? swipeActions.right : undefined;

    const [position, setPosition] = useState<'left-action' | 'notification' | 'right-action'>(
        'notification',
    );

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;

        const actionsElements = Array.from(element.querySelectorAll(`.${swipeActionContainerCls}`));
        const notificationWrapperElement: HTMLElement | null = element.querySelector(
            `.${notificationWrapperCls}`,
        );
        const leftActionElement = leftAction ? actionsElements[0] : undefined;
        const rightActionElement = rightAction
            ? actionsElements[1] ?? actionsElements[0]
            : undefined;

        if (!notificationWrapperElement) return () => {};

        const leftActionWidth = leftActionElement?.getBoundingClientRect()?.width ?? 0;
        const rightActionWidth = rightActionElement?.getBoundingClientRect()?.width ?? 0;

        //          |                  |                  |                |
        //          | <- rightActionX  | <- notificationX | <- leftActionX |
        //          |                  |                  |                |
        //  example | -200             | -100             | 0              |
        const leftActionX = 0;
        const notificationX = -leftActionWidth;
        const rightActionX = -leftActionWidth - rightActionWidth;

        const leftActionThresholdX = notificationX + leftActionWidth * swipeThreshold;
        const rightActionThresholdX = notificationX - rightActionWidth * swipeThreshold;

        let startX: number;
        if (position === 'left-action') startX = leftActionX;
        else if (position === 'notification') startX = notificationX;
        else startX = rightActionX;

        const gesture = new TinyGesture(element, {
            velocityThreshold: 10,
            mouseSupport: true,
            diagonalSwipes: false,
        });

        element.style.transform = `translateX(${startX}px)`;

        gesture.on('panstart', () => {
            notificationWrapperElement.style.opacity = `0.5`;
            element.style.transition = 'transform 0s';
        });

        gesture.on('panmove', () => {
            const x = getX();
            if (x === undefined) return;

            element.style.transform = `translateX(${x}px)`;
        });

        gesture.on('panend', () => {
            element.style.transition = 'transform 0.2s';

            const x = getX();
            if (x === undefined) {
                if (position === 'notification') {
                    notificationWrapperElement.style.opacity = `1`;
                }
                return;
            }

            if (x >= leftActionThresholdX && leftAction) {
                setPosition('left-action');
                leftAction.onSwipe?.();
                element.style.transform = `translateX(${leftActionX}px)`;
            } else if (x <= rightActionThresholdX && rightAction) {
                setPosition('right-action');
                rightAction.onSwipe?.();
                element.style.transform = `translateX(${rightActionX}px)`;
            } else {
                setPosition('notification');
                element.style.transform = `translateX(${notificationX}px)`;
                notificationWrapperElement.style.opacity = `1`;
            }
        });

        function getX() {
            if (!gesture.touchMoveX) return undefined;

            return clamp(startX + gesture.touchMoveX, rightActionX, leftActionX);
        }

        return () => {
            gesture.destroy();
        };
    }, [position]);

    return (
        <div className={b('swipe-wrap')}>
            <div
                ref={ref}
                className={b('swipe', {
                    ['has-left']: Boolean(leftAction),
                    ['has-right']: Boolean(rightAction),
                    position,
                })}
            >
                {leftAction ? renderAction(leftAction) : null}
                <div className={notificationWrapperCls}>
                    <Notification {...props} />
                </div>
                {rightAction ? renderAction(rightAction) : null}
            </div>
        </div>
    );
});

function renderAction(action: NotificationSwipeActionProps) {
    return <div className={swipeActionContainerCls}>{action.content}</div>;
}
