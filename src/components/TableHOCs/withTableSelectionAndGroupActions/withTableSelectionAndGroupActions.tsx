import React, {useMemo} from 'react';
import type {ComponentType, FC} from 'react';

import {withTableSelection} from '@gravity-ui/uikit';
import type {TableDataItem, TableProps, WithTableSelectionProps} from '@gravity-ui/uikit';

import {ActionsPanel, ActionsPanelProps} from '../../ActionsPanel';
import {block} from '../../utils/cn';

import './withTableSelectionAndGroupActions.scss';

const b = block('with-table-group-actions');

type ActionItem = ActionsPanelProps['actions'][number];

export interface WithTableSelectionAndGroupActionsProps {
    groupActions: ActionItem[];
    formatTitle: (selected: number) => string;
    onGroupActionsClose?: () => void;
}

export function withTableSelectionAndGroupActions<I extends TableDataItem, E extends {} = {}>(
    TableComponent: ComponentType<TableProps<I> & E>,
): ComponentType<
    TableProps<I> & WithTableSelectionProps<I> & WithTableSelectionAndGroupActionsProps & E
> {
    let componentName = TableComponent.displayName || TableComponent.name || 'Component';

    if (componentName.includes('withTableSelection(')) {
        throw new Error(
            'You should use withTableSelectionAndGroupActions instead of withTableSelection HOC.',
        );
    }

    const TableComponentWithSelection = withTableSelection(TableComponent);

    componentName = TableComponentWithSelection.displayName || TableComponent.name || 'Component';

    const TableWithGroupActions: FC<
        TableProps<I> & WithTableSelectionProps<I> & WithTableSelectionAndGroupActionsProps & E
    > = ({groupActions, formatTitle, onGroupActionsClose, ...props}) => {
        const selected = props.selectedIds.length;
        const renderTitle = useMemo(() => () => formatTitle(selected), [formatTitle, selected]);

        return (
            <>
                <TableComponentWithSelection
                    {...(props as TableProps<I> & WithTableSelectionProps<I> & E)}
                />
                {selected > 0 && (
                    <ActionsPanel
                        actions={groupActions}
                        onClose={onGroupActionsClose}
                        renderNote={renderTitle}
                        className={b('panel')}
                    />
                )}
            </>
        );
    };

    TableWithGroupActions.displayName = `withTableGroupActions(${componentName})`;

    return TableWithGroupActions;
}
