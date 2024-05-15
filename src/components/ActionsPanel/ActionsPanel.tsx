import React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, Text} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {CollapseActions} from './components/CollapseActions';
import i18n from './i18n';
import {ActionsPanelProps} from './types';

import './ActionsPanel.scss';

const b = block('actions-panel');

export const ActionsPanel = ({className, actions, onClose, renderNote}: ActionsPanelProps) => {
    return (
        <div className={b(null, className)}>
            {typeof renderNote === 'function' && (
                <Text
                    className={b('note-wrapper')}
                    as="div"
                    color="light-primary"
                    variant="subheader-2"
                    ellipsis={true}
                >
                    {renderNote()}
                </Text>
            )}
            <CollapseActions actions={actions} />
            {typeof onClose === 'function' && (
                <div className={b('button-close-wrapper')}>
                    <Button
                        view="flat-contrast"
                        size="m"
                        onClick={onClose}
                        extraProps={{
                            'aria-label': i18n('label_close'),
                        }}
                    >
                        <Icon key="icon" data={Xmark} />
                    </Button>
                </div>
            )}
        </div>
    );
};
