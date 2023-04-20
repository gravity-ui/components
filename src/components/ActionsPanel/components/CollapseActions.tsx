import React from 'react';
import noop from 'lodash/noop';
import {Button, DropdownMenu, DropdownMenuItem, Icon} from '@gravity-ui/uikit';
import {Ellipsis} from '@gravity-ui/icons';
import {block} from '../../utils/cn';
import {ActionItem} from '../types';
import {useCollapseActions, OBSERVER_TARGET_ATTR} from './useCollapseActions';

import './CollapseActions.scss';

const b = block('actions-panel-collapse');
const MAX_BUTTON_ACTIONS = 4;

type Props = {
    actions: ActionItem[];
};

export const CollapseActions = ({actions}: Props) => {
    const [buttonActions, restActions] = React.useMemo(
        () => [actions.slice(0, MAX_BUTTON_ACTIONS), actions.slice(MAX_BUTTON_ACTIONS)],
        [actions],
    );

    const {parentRef, visibilityMap, offset} = useCollapseActions(buttonActions);

    const dropdownItems: DropdownMenuItem[] = [
        ...buttonActions.map((action) => ({
            action: action.handler || noop,
            text: action.renderContent('dropdown'),
            hidden: visibilityMap[action.id],
        })),
        ...restActions.map((action) => ({
            action: action.handler || noop,
            text: action.renderContent('dropdown'),
            hidden: false,
        })),
    ];

    const showDropdown = dropdownItems.some((item) => !item.hidden);

    return (
        <div className={b()}>
            <div className={b('container')} ref={parentRef}>
                {buttonActions.map((action) => {
                    const {id} = action;
                    const attr = {[OBSERVER_TARGET_ATTR]: id};
                    const invisible = !visibilityMap[id];
                    return (
                        <div className={b('button-action-wrapper', {invisible})} {...attr} key={id}>
                            <Button view="flat-contrast" size="m" onClick={action.handler}>
                                {action.renderContent('button')}
                            </Button>
                        </div>
                    );
                })}
            </div>
            {showDropdown && (
                <React.Fragment>
                    <div className={b('menu-placeholder')} />
                    <div className={b('menu-wrapper')} style={{left: offset}}>
                        <DropdownMenu
                            size="s"
                            items={dropdownItems}
                            switcher={
                                <Button view="flat-contrast" size="m">
                                    <Icon data={Ellipsis} />
                                </Button>
                            }
                        />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
