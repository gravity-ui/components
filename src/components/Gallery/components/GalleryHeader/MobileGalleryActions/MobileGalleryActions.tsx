import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Icon, List, Sheet, Text} from '@gravity-ui/uikit';
import type {SheetProps} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import type {GalleryItemProps} from '../../../GalleryItem';
import {i18n} from '../../../i18n';

import './MobileGalleryActions.scss';

const cnMobileGalleryActions = block('mobile-gallery-actions');

export type MobileGalleryActionsProps = {
    open: boolean;
    actions?: GalleryItemProps['actions'];
    onClose: () => void;
};

interface ActionItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export const MobileGalleryActions = ({open, actions = [], onClose}: MobileGalleryActionsProps) => {
    // TODO: remove
    const handleSheetClose = React.useCallback<NonNullable<SheetProps['onClose']>>(() => {
        onClose();
    }, [onClose]);

    const renderListItem = React.useCallback((item: ActionItem) => {
        return (
            <div className={cnMobileGalleryActions('list-item')}>
                {item.icon}
                <Text variant="body-2" title={item.title} ellipsis>
                    {item.title}
                </Text>
            </div>
        );
    }, []);

    const handleItemClick = React.useCallback(
        (item: ActionItem) => {
            item.onClick?.();
            onClose();
        },
        [onClose],
    );

    const listItems: ActionItem[] = React.useMemo(() => {
        const items: ActionItem[] = [];

        // Add custom actions
        actions.forEach((action) => {
            items.push({
                id: action.id,
                title: action.title,
                icon: action.icon,
                onClick: action.onClick,
            });
        });

        // TODO: remove
        // Add close action
        items.push({
            id: 'close',
            title: i18n('close'),
            icon: <Icon data={Xmark} />,
        });

        return items;
    }, [actions]);

    return (
        <Sheet className={cnMobileGalleryActions()} visible={open} onClose={handleSheetClose}>
            <List
                items={listItems}
                filterable={false}
                renderItem={renderListItem}
                itemHeight={44}
                virtualized={false}
                onItemClick={handleItemClick}
            />
        </Sheet>
    );
};
