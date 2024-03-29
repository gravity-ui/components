import {DropdownMenuItem} from '@gravity-ui/uikit';
import groupBy from 'lodash/groupBy';

import {ActionItem} from '../../types';

import {VisibilityMap} from './types';

type UseDropdownActionsArg = {
    buttonActions: ActionItem[];
    restActions: ActionItem[];
    visibilityMap: VisibilityMap;
};

export const useDropdownActions = ({
    buttonActions,
    restActions,
    visibilityMap,
}: UseDropdownActionsArg) => {
    const actions = [
        ...buttonActions.filter((action) => !visibilityMap[action.id]),
        ...restActions,
    ];
    const groups = groupBy(actions, (action) => action.dropdown.group);

    const usedGroups = new Set<string>();
    const dropdownItems: (DropdownMenuItem | DropdownMenuItem[])[] = [];

    for (const action of actions) {
        const group = action.dropdown.group;
        if (typeof group === 'undefined') {
            dropdownItems.push(action.dropdown.item);
            continue;
        }
        if (usedGroups.has(group)) {
            continue;
        }
        usedGroups.add(group);
        dropdownItems.push(groups[group].map((groupedAction) => groupedAction.dropdown.item));
    }

    return dropdownItems;
};
