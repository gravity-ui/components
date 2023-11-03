import React, {useCallback, useMemo, useState} from 'react';

import {Table} from '@gravity-ui/uikit';
import type {TableProps} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {TableWithGroupActions, columns, data} from './utils';
import type {DataItem} from './utils';

export default {
    title: 'Components/TableHOCs',
    component: Table,
    args: {
        columns,
        data,
    },
} as Meta<TableProps<DataItem>>;

// ---------------------------------
const WithTableSelectionTemplate: StoryFn<TableProps<DataItem>> = (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleClose = useCallback(() => setSelectedIds([]), []);

    const showMessage = useCallback(
        () => alert(`Are you sure you want to delete ${selectedIds.join(', ')}?`),
        [selectedIds],
    );

    const groupActions = useMemo(
        () => [
            {
                id: 'delete',
                button: {
                    props: {children: 'Delete', onClick: showMessage},
                },
                dropdown: {
                    item: {text: 'Delete', action: showMessage},
                },
            },
        ],
        [showMessage],
    );

    return (
        <TableWithGroupActions
            {...args}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            formatTitle={(selected) => `${selected} Items`}
            groupActions={groupActions}
            onGroupActionsClose={handleClose}
        />
    );
};
export const HOCWithTableGroupActions = WithTableSelectionTemplate.bind({});
