import * as React from 'react';

import {Loader} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import './Notifications.scss';

const b = block('notifications');

export const NotificationsLoadingState = React.memo(function NotificationsEmptyState() {
    return (
        <div className={b('empty')}>
            <Loader size={'l'} />
        </div>
    );
});
