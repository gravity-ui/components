import React from 'react';

import {block} from '../utils/cn';
import {StatusIcon} from './StatusIcon';

import './StatusMessage.scss';
import {Status} from './types';

const b = block('status-message');

export interface StatusMessageProps {
    text?: React.ReactNode;
    size?: number;
    className?: string;
    type?: Status;
    children?: React.ReactNode;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
    type = 'info',
    text,
    size = 16,
    className,
    children,
}) => {
    return (
        <div className={b(null, className)}>
            {type && (
                <div className={b('icon')}>
                    <StatusIcon status={type} size={size} />
                </div>
            )}
            <div className={b('text')}>{text || children}</div>
        </div>
    );
};
