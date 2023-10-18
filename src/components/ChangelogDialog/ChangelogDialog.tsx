import React, {useCallback, useEffect, useRef} from 'react';

import {ArrowUpRightFromSquare} from '@gravity-ui/icons';
import type {DialogProps} from '@gravity-ui/uikit';
import {Dialog, Icon, Link} from '@gravity-ui/uikit';

import {Metrica} from '../../types';
import {block} from '../utils/cn';

import {Item} from './components/Item/Item';
import {Goals} from './constants';
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
    onStoryClick?: (storyId: string) => void;
    service?: string;
    metrica?: Metrica;
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
    service,
    metrica,
}: ChangelogDialogProps) {
    const idRef = React.useRef<number>();
    idRef.current = idRef.current || getNextId();
    const dialogCaptionId = `changelog-dialog-title-${idRef.current}`;
    const refActionCount = useRef(0);

    useEffect(() => {
        if (!service || !metrica || !open) return () => {};
        refActionCount.current = 0;

        metrica.reachGoal(Goals.Show, {service});

        let fired = false;
        const timeoutId = window.setTimeout(() => {
            fired = true;
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
            if (!fired && !refActionCount.current) {
                metrica.reachGoal(Goals.Bounce, {service});
            }
            metrica.reachGoal(Goals.Hide, {service});
        };
    }, [open, service, metrica]);

    const handleStoryClick = useCallback(
        (storyId: string) => {
            refActionCount.current++;
            if (service && metrica) {
                metrica.reachGoal(Goals.Click, {service, action: storyId});
            }
            if (onStoryClick) {
                onStoryClick(storyId);
            }
        },
        [onStoryClick, service, metrica],
    );

    const handleLinkClick = useCallback(
        (link: string) => {
            refActionCount.current++;
            if (service && metrica) {
                metrica.reachGoal(Goals.Click, {service, action: link});
            }
        },
        [service, metrica],
    );

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
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <Item
                            key={index}
                            className={b('item')}
                            data={item}
                            onStoryClick={handleStoryClick}
                            onLinkClick={handleLinkClick}
                        />
                    ))
                ) : (
                    <div className={b('empty-placeholder')}>{i18n('label_empty')}</div>
                )}
            </Dialog.Body>
        </Dialog>
    );
}
