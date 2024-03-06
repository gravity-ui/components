import React from 'react';

import {ClipboardButton, QAProps} from '@gravity-ui/uikit';

import {HelpPopover} from '../HelpPopover';
import type {HelpPopoverProps} from '../HelpPopover';
import {block} from '../utils/cn';

import {isUnbreakableOver} from './utils';

import './DefinitionList.scss';

type DefinitionListItemNote = string | HelpPopoverProps;

export interface DefinitionListItem {
    name: React.ReactNode;
    key: string | number;
    content?: React.ReactNode;
    title?: string;
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
                    htmlContent={note}
                    placement={['bottom', 'top']}
                />
            );
        }

        if (typeof note === 'object') {
            noteElement = <HelpPopover className={popoverClassName} {...note} />;
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
    return (
        <dl className={b({responsive}, className)} data-qa={qa}>
            {items.map(({name, content, title, copyText, note, key, multilineName}) => {
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
                                {name}
                                {multilineName && noteElement}
                            </div>
                            {!multilineName && noteElement}
                            <div className={b('dots', {'with-note': Boolean(note)})} />
                        </dt>
                        <dd
                            className={b('definition')}
                            title={getTitle(title, content)}
                            style={{
                                ...valueStyle,
                                lineBreak:
                                    typeof content === 'string' && isUnbreakableOver(20)(content)
                                        ? 'anywhere'
                                        : undefined,
                            }}
                        >
                            {definition}
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}
