import * as React from 'react';

import {ActionItem} from '../../types';

import {useDropdownActions} from './useDropdownActions';
import {useObserveIntersection} from './useObserveIntersection';

const MAX_BUTTON_ACTIONS = 4;

export const useCollapseActions = (actions: ActionItem[]) => {
    const updateObserveKey = React.useMemo(() => actions.map(({id}) => id).join('/'), [actions]);

    const [buttonActions, restActions] = React.useMemo(() => {
        const buttonItems: ActionItem[] = [];
        const restItems: ActionItem[] = [];

        actions.forEach((action) => {
            if (buttonItems.length < MAX_BUTTON_ACTIONS && !action.collapsed) {
                buttonItems.push(action);
            } else {
                restItems.push(action);
            }
        });

        return [buttonItems, restItems];
    }, [actions]);

    const {parentRef, visibilityMap, offset} = useObserveIntersection(updateObserveKey);

    const dropdownItems = useDropdownActions({buttonActions, restActions, visibilityMap});

    return {
        buttonActions,
        dropdownItems,
        parentRef,
        offset,
        visibilityMap,
    };
};
