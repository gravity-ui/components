import React from 'react';

import {Text} from '@gravity-ui/uikit';

import {b} from '../utils';

interface GroupLabelProps {
    label: string;
}

export function GroupLabel({label}: GroupLabelProps) {
    return (
        <div className={b('subheader')}>
            <Text variant="subheader-1" color="complementary">
                {label}
            </Text>
        </div>
    );
}
