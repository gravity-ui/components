import React from 'react';

import {
    CircleXmarkFill,
    CircleMinusFill,
    CircleInfoFill,
    CircleCheckFill,
    CircleArrowUpFill,
    CircleExclamationFill,
} from '@gravity-ui/icons';
import block from 'bem-cn-lite';
import type {Status} from './types';

const iconsByStatus: {
    [key in Status]: {
        IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        color: string;
    };
} = {
    success: {IconComponent: CircleCheckFill, color: '#3bc935'},
    info: {IconComponent: CircleInfoFill, color: '#147ceb'},
    warning: {IconComponent: CircleExclamationFill, color: '#ffb100'},
    error: {IconComponent: CircleXmarkFill, color: '#ef3125'},
    failure: {IconComponent: CircleMinusFill, color: '#ef3125'},
    upload: {IconComponent: CircleArrowUpFill, color: '#147ceb'},
    inactive: {IconComponent: CircleXmarkFill, color: ''},
};

export interface StatusIconProps {
    status: Status;
    size?: number;
    className?: string;
}

const b = block('status-icon');

export function StatusIcon({status, size = 16, className}: StatusIconProps) {
    const iconSettings = iconsByStatus[status];

    if (!iconSettings) {
        return null;
    }

    const {IconComponent, color} = iconSettings;

    return <IconComponent color={color} width={size} height={size} className={b({}, className)} />;
}
