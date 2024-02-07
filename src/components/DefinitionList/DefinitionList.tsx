import React from 'react';

import {ClipboardButton, Link} from '@gravity-ui/uikit';

import {HelpPopover} from '../HelpPopover';
import type {HelpPopoverProps} from '../HelpPopover';
import {block} from '../utils/cn';

import {isUnbreakableOver} from './utils';

import './DefinitionList.scss';

type DefinitionListItemNote = string | HelpPopoverProps;

export interface DefinitionListItem {
    name: string;
    key?: string;
    href?: string;
    content?: React.ReactNode;
    title?: string;
    copyText?: string;
    copyIconOver?: boolean;
    note?: DefinitionListItemNote;
    multilineName?: boolean;
}

export interface DefinitionListProps {
    items: DefinitionListItem[];
    responsive?: boolean;
    keyMaxWidth?: number;
    valueMaxWidth?: number | 'auto';
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
    if (note) {
        if (typeof note === 'string') {
            noteElement = (
                <HelpPopover
                    className={b('item-note-tooltip')}
                    tooltipContentClassName="yfm"
                    htmlContent={note}
                    placement={['bottom', 'top']}
                    offset={{left: 4}}
                />
            );
        }

        if (typeof note === 'object') {
            noteElement = <HelpPopover offset={{left: 4}} {...note} />;
        }
    }
    return noteElement;
}

export function DefinitionList({
    items,
    responsive,
    keyMaxWidth,
    valueMaxWidth = 'auto',
    className,
    itemClassName,
}: DefinitionListProps) {
    const keyStyle = keyMaxWidth
        ? {
              flexBasis: keyMaxWidth,
          }
        : {};

    const valueStyle =
        typeof valueMaxWidth === 'number'
            ? {
                  flexBasis: valueMaxWidth,
                  maxWidth: valueMaxWidth,
              }
            : {};
    return (
        <dl className={b({responsive}, className)} role="list">
            {items.map(
                ({
                    name,
                    href,
                    content,
                    title,
                    copyText,
                    note,
                    key,
                    copyIconOver,
                    multilineName,
                }) => {
                    const term = href ? <Link href={href}>{name}</Link> : name;
                    const definitionContent = content ?? '—';
                    const definition = copyText ? (
                        <div className={b('copy-container', {'icon-inside': copyIconOver})}>
                            <span>{definitionContent}</span>
                            <ClipboardButton
                                size="s"
                                text={copyText}
                                className={b('copy-button')}
                            />
                        </div>
                    ) : (
                        definitionContent
                    );
                    return (
                        <div key={key ?? name} className={b('item', itemClassName)} role="listitem">
                            <div className={b('term-container')} style={keyStyle}>
                                <dt
                                    className={b('term', {multiline: multilineName})}
                                    title={name}
                                    role="term"
                                >
                                    {term}
                                </dt>
                                {getNoteElement(note)}
                                <div className={b('dots')} />
                            </div>
                            <dd
                                role="definition"
                                className={b('definition')}
                                title={getTitle(title, content)}
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
