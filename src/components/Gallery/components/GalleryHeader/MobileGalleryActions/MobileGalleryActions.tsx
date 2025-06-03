import * as React from 'react';

import {List, Sheet, Text} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import type {GalleryItemProps} from '../../../GalleryItem';

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

        actions.forEach((action) => {
            items.push({
                id: action.id,
                title: action.title,
                icon: action.icon,
                onClick: action.onClick,
            });
        });

        return items;
    }, [actions]);

    return (
        <Sheet className={cnMobileGalleryActions()} visible={open} onClose={onClose}>
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
