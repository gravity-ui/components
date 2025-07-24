import * as React from 'react';

import {ArrowUpRightFromSquare} from '@gravity-ui/icons';
import type {DialogProps} from '@gravity-ui/uikit';
import {Dialog, Icon, Link, Loader} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {ErrorContainer} from './components/ErrorContainer/ErrorContainer';
import {Item} from './components/Item/Item';
import {i18n} from './i18n';
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
    onRetryClick?: () => void;
    loading?: boolean;
    error?: boolean | {title: string; description: string};
    disableHeightTransition?: boolean;
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
    disableHeightTransition = true,
    disableOutsideClick,
    onClose,
    onStoryClick,
    onLinkClick,
    onRetryClick,
    loading,
    error,
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
            disableHeightTransition={disableHeightTransition}
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
                    <div className={b('loading')}>
                        <Loader size={'m'} />
                    </div>
                )}
                {error && !loading && <ErrorContainer error={error} onRetryClick={onRetryClick} />}
                {!error &&
                    !loading &&
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
