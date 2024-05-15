import React from 'react';

import {Ellipsis} from '@gravity-ui/icons';
import {Button, DropdownMenu, Icon} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';
import i18n from '../i18n';
import {ActionItem} from '../types';

import {OBSERVER_TARGET_ATTR, useCollapseActions} from './hooks';

import './CollapseActions.scss';

const b = block('actions-panel-collapse');

type Props = {
    actions: ActionItem[];
};

export const CollapseActions = ({actions}: Props) => {
    const {buttonActions, dropdownItems, parentRef, offset, visibilityMap} =
        useCollapseActions(actions);

    const showDropdown = Object.keys(visibilityMap).length > 0 && dropdownItems.length > 0;

    return (
        <div className={b()}>
            <div className={b('container')} ref={parentRef}>
                {buttonActions.map((action) => {
                    const {id} = action;
                    const attr = {[OBSERVER_TARGET_ATTR]: id};
                    const invisible = visibilityMap[id] === false;
                    const switcher = (
                        <Button view="flat-contrast" size="m" {...action.button.props} />
                    );

                    const node = Array.isArray(action.dropdown.item.items) ? (
                        <DropdownMenu
                            size="s"
                            items={action.dropdown.item.items}
                            switcher={switcher}
                        />
                    ) : (
                        switcher
                    );
                    return (
                        <div className={b('button-action-wrapper', {invisible})} {...attr} key={id}>
                            {node}
                        </div>
                    );
                })}
            </div>
            {showDropdown && (
                <React.Fragment>
                    <div className={b('menu-placeholder')} />
                    <div className={b('menu-wrapper')} style={{insetInlineStart: offset}}>
                        <DropdownMenu
                            size="s"
                            items={dropdownItems}
                            switcher={
                                <Button
                                    view="flat-contrast"
                                    size="m"
                                    extraProps={{
                                        'aria-label': i18n('label_more'),
                                    }}
                                >
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
