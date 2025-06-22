import * as React from 'react';

import {Button, ButtonProps, Flex, List, Sheet} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction, GalleryItemProps} from '../../GalleryItem';

import './MobileGalleryActions.scss';

const cnMobileGalleryActions = block('mobile-gallery-actions');

export type MobileGalleryActionsProps = {
    open: boolean;
    actions?: GalleryItemProps['actions'];
    onClose: () => void;
};

export const MobileGalleryActions = ({open, actions = [], onClose}: MobileGalleryActionsProps) => {
    const renderListItem = React.useCallback((item: GalleryItemAction) => {
        const buttonProps: ButtonProps = {
            type: 'button',
            size: 'xl',
            view: 'flat',
            onClick: item.onClick,
            href: item.href,
            target: '__blank',
            'aria-label': item.title,
            className: cnMobileGalleryActions('list-item'),
            width: 'max',
            children: (
                <Flex alignItems="center" gap={3} className={cnMobileGalleryActions('custom-item')}>
                    {item.icon}
                    {item.title}
                </Flex>
            ),
        };

        return (
            <React.Fragment>
                {item.render ? (
                    <React.Fragment key={item.id}>{item.render(buttonProps)}</React.Fragment>
                ) : (
                    <Button {...buttonProps} />
                )}
            </React.Fragment>
        );
    }, []);

    return (
        <Sheet className={cnMobileGalleryActions()} visible={open} onClose={onClose}>
            <List
                items={actions}
                filterable={false}
                renderItem={renderListItem}
                itemHeight={44}
                virtualized={false}
                onItemClick={onClose}
            />
        </Sheet>
    );
};
