import React from 'react';
import {ActionItem} from '../../types';
import {useObserveIntersection} from './useObserveIntersection';
import {useDropdownActions} from './useDropdownActions';

const MAX_BUTTON_ACTIONS = 4;

export const useCollapseActions = (actions: ActionItem[]) => {
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

    const {parentRef, visibilityMap, offset} = useObserveIntersection(actions);

    const dropdownItems = useDropdownActions({buttonActions, restActions, visibilityMap});

    return {
        buttonActions,
        dropdownItems,
        parentRef,
        offset,
        visibilityMap,
    };
};
