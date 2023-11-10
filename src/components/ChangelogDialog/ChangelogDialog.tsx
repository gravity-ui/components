import React, {Fragment} from 'react';

import {ArrowUpRightFromSquare} from '@gravity-ui/icons';
import type {DialogProps} from '@gravity-ui/uikit';
import {Dialog, Icon, Link} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {Item} from './components/Item/Item';
import {ItemSkeleton} from './components/ItemSkeleton/ItemSkeleton';
import i18n from './i18n';
import type {ChangelogItem} from './types';

import './ChangelogDialog.scss';

const b = block('changelog-dialog');

export interface ChangelogDialogProps {
    open: boolean;
    title?: string;
    fullListLink?: string;
    items: ChangelogItem[];
    disableBodyScrollLock?: boolean;
    disableOutsideClick?: boolean;
    onClose: DialogProps['onClose'];
    onLinkClick?: (link: string) => void;
    onStoryClick?: (storyId: string) => void;
    loading?: boolean;
}

let nextId = 1;
function getNextId() {
    return nextId++;
}

export function ChangelogDialog({
    open,
    title = i18n('title'),
    fullListLink,
    items,
    disableBodyScrollLock = true,
    disableOutsideClick,
    onClose,
    onStoryClick,
    onLinkClick,
    loading = true,
}: ChangelogDialogProps) {
    const idRef = React.useRef<number>();
    idRef.current = idRef.current || getNextId();
    const dialogCaptionId = `changelog-dialog-title-${idRef.current}`;

    return (
        <Dialog
            className={b()}
            open={open}
            onClose={onClose}
            disableBodyScrollLock={disableBodyScrollLock}
            disableOutsideClick={disableOutsideClick}
            aria-labelledby={dialogCaptionId}
        >
            <Dialog.Header caption={title} id={dialogCaptionId} />
            {fullListLink ? (
                <Dialog.Body key="full-list-link">
                    <Link href={fullListLink} target="_blank">
                        <span>{i18n('link_full_list')}</span>
                        <span className={b('full-list-link-icon')}>
                            <Icon data={ArrowUpRightFromSquare} size={14} />
                        </span>
                    </Link>
                </Dialog.Body>
            ) : null}
            <Dialog.Body key="items" className={b('items-container')}>
                {loading && (
                    <Fragment>
                        <ItemSkeleton className={b('item')} withImage withDescription withLink />
                        <ItemSkeleton className={b('item')} isNew withDescription withLink />
                    </Fragment>
                )}
                {!loading &&
                    (items.length > 0 ? (
                        items.map((item, index) => (
                            <Item
                                key={index}
                                className={b('item')}
                                data={item}
                                onStoryClick={onStoryClick}
                                onLinkClick={onLinkClick}
                            />
                        ))
                    ) : (
                        <div className={b('empty-placeholder')}>{i18n('label_empty')}</div>
                    ))}
            </Dialog.Body>
        </Dialog>
    );
}
