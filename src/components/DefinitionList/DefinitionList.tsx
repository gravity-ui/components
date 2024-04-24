import React from 'react';

import {ClipboardButton, QAProps} from '@gravity-ui/uikit';

import {HelpPopover} from '../HelpPopover';
import type {HelpPopoverProps} from '../HelpPopover';
import {block} from '../utils/cn';

import i18n from './i18n';
import {isUnbreakableOver} from './utils';

import './DefinitionList.scss';

type DefinitionListItemNote = string | HelpPopoverProps;

export interface DefinitionListItem {
    name: React.ReactNode;
    content?: React.ReactNode;
    contentTitle?: string;
    nameTitle?: string;
    copyText?: string;
    note?: DefinitionListItemNote;
    multilineName?: boolean;
}

export interface DefinitionListProps extends QAProps {
    items: DefinitionListItem[];
    copyPosition?: 'inside' | 'outside';
    responsive?: boolean;
    nameMaxWidth?: number;
    contentMaxWidth?: number | 'auto';
    className?: string;
    itemClassName?: string;
}

export const b = block('definition-list');

function getTitle(title?: string, content?: React.ReactNode) {
    if (title) {
        return title;
    }

    if (typeof content === 'string' || typeof content === 'number') {
        return String(content);
    }

    return undefined;
}

function getNoteElement(note?: DefinitionListItemNote) {
    let noteElement = null;
    const popoverClassName = b('item-note-tooltip');
    if (note) {
        if (typeof note === 'string') {
            noteElement = (
                <HelpPopover
                    className={popoverClassName}
                    content={note}
                    placement={['bottom', 'top']}
                    buttonProps={{
                        'aria-label': i18n('label_note'),
                    }}
                />
            );
        }

        if (typeof note === 'object') {
            noteElement = (
                <HelpPopover
                    className={popoverClassName}
                    placement={['bottom', 'top']}
                    {...note}
                    buttonProps={{
                        'aria-label': i18n('label_note'),
                        ...(note.buttonProps || {}),
                    }}
                />
            );
        }
    }
    return noteElement;
}

export function DefinitionList({
    items,
    responsive,
    nameMaxWidth,
    contentMaxWidth = 'auto',
    className,
    itemClassName,
    copyPosition = 'outside',
    qa,
}: DefinitionListProps) {
    const keyStyle = nameMaxWidth
        ? {
              flexBasis: nameMaxWidth,
          }
        : {};

    const valueStyle =
        typeof contentMaxWidth === 'number'
            ? {
                  flexBasis: contentMaxWidth,
                  maxWidth: contentMaxWidth,
              }
            : {};
    const normalizedItems = React.useMemo(() => {
        return items.map((value, index) => ({...value, key: index}));
    }, [items]);
    return (
        <dl className={b({responsive}, className)} data-qa={qa}>
            {normalizedItems.map(
                ({name, key, content, contentTitle, nameTitle, copyText, note, multilineName}) => {
                    const definitionContent = content ?? '—';
                    const iconInside = copyPosition === 'inside';
                    const definition = copyText ? (
                        <div className={b('copy-container', {'icon-inside': iconInside})}>
                            <span>{definitionContent}</span>
                            <ClipboardButton
                                size="s"
                                text={copyText}
                                className={b('copy-button')}
                                view={iconInside ? 'raised' : 'flat-secondary'}
                                extraProps={{
                                    'aria-label': i18n('label_copy'),
                                }}
                            />
                        </div>
                    ) : (
                        definitionContent
                    );
                    const noteElement = (
                        <React.Fragment>
                            &nbsp;
                            {getNoteElement(note)}
                        </React.Fragment>
                    );
                    return (
                        <div key={key} className={b('item', itemClassName)}>
                            <dt
                                className={b('term-container', {multiline: multilineName})}
                                style={keyStyle}
                            >
                                <div className={b('term-wrapper')}>
                                    <span title={getTitle(nameTitle, name)}>{name}</span>
                                    {multilineName && noteElement}
                                </div>
                                {!multilineName && noteElement}
                                <div className={b('dots', {'with-note': Boolean(note)})} />
                            </dt>
                            <dd
                                className={b('definition')}
                                title={getTitle(contentTitle, content)}
                                style={{
                                    ...valueStyle,
                                    lineBreak:
                                        typeof content === 'string' &&
                                        isUnbreakableOver(20)(content)
                                            ? 'anywhere'
                                            : undefined,
                                }}
                            >
                                {definition}
                            </dd>
                        </div>
                    );
                },
            )}
        </dl>
    );
}
