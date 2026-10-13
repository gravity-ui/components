import * as React from 'react';

import {Button, ButtonProps, Flex, List, Sheet} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {GalleryItemAction, GalleryItemProps} from '../../GalleryItem';
import {i18n} from '../../i18n';

import './MobileGalleryActions.scss';

const cnMobileGalleryActions = block('mobile-gallery-actions');

export type MobileGalleryActionsProps = {
    open: boolean;
    actions?: GalleryItemProps['actions'];
    onClose: () => void;
};

export const MobileGalleryActions = ({open, actions = [], onClose}: MobileGalleryActionsProps) => {
    const {t} = i18n.useTranslation();

    const renderListItem = React.useCallback(
        (item: GalleryItemAction) => {
            const title = item.__titleT ? item.__titleT({t}) : item.title;
            const buttonProps: ButtonProps = {
                type: 'button',
                size: 'xl',
                view: 'flat',
                onClick: item.onClick,
                href: item.href,
                target: '__blank',
                'aria-label': title,
                className: cnMobileGalleryActions('list-item'),
                width: 'max',
                children: (
                    <Flex
                        alignItems="center"
                        gap="spacing-3"
                        className={cnMobileGalleryActions('custom-item')}
                    >
                        {item.icon}
                        {title}
                    </Flex>
                ),
            };

            const render = () => {
                if (item.__renderT) {
                    return (
                        <React.Fragment key={item.id}>
                            {item.__renderT(buttonProps, {t})}
                        </React.Fragment>
                    );
                }

                if (item.render) {
                    return (
                        <React.Fragment key={item.id}>{item.render(buttonProps)}</React.Fragment>
                    );
                }

                return null;
            };

            return render() ?? <Button key={item.id} {...buttonProps} />;
        },
        [t],
    );

    return (
        <Sheet
            className={cnMobileGalleryActions()}
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) onClose();
            }}
        >
            <List
                aria-label={t('actions')}
                role="grid"
                items={actions}
                size="xl"
                getItemTextValue={(item) => (item.__titleT ? item.__titleT({t}) : item.title)}
                renderItem={(ctx, helpers) => (
                    <List.ItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                        <div {...helpers.getCellProps()}>{renderListItem(ctx.item)}</div>
                    </List.ItemView>
                )}
                onItemAction={onClose}
            />
        </Sheet>
    );
};
