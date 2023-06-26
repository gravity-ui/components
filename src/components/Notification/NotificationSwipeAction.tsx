import {Icon, IconData} from '@gravity-ui/uikit';
import React from 'react';
import {block} from '../utils/cn';
import './Notification.scss';

const b = block('notification');

type Props = {
    icon: IconData;
    text?: React.ReactNode;
    theme?: 'base' | 'warning' | 'danger';
    action?: () => void;
};

export const NotificationSwipeAction = React.memo(function NotificationSwipeAction(props: Props) {
    const {icon, text, theme = 'base', action} = props;

    return (
        <div className={b('swipe-action', {theme})} onClick={action}>
            <span className={b('swipe-action-icon')}>
                <Icon data={icon} size={16} />
            </span>
            <span className={b('swipe-action-text')}>{text}</span>
        </div>
    );
});
