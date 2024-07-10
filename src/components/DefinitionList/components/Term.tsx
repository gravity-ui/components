import React from 'react';

import {HelpPopover} from '../../HelpPopover';
import i18n from '../i18n';
import {DefinitionListDirection, DefinitionListItemNote, DefinitionListSingleItem} from '../types';
import {b, getTitle} from '../utils';

interface NoteElementsProps {
    note?: DefinitionListItemNote;
}

function NoteElement({note}: NoteElementsProps) {
    if (!note) {
        return null;
    }
    const popoverClassName = b('item-note-tooltip');
    if (typeof note === 'string') {
        return (
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
        return (
            <HelpPopover
                className={popoverClassName}
                placement={['bottom', 'top']}
                {...note}
                buttonProps={{
                    'aria-label': i18n('label_note'),
                    ...note.buttonProps,
                }}
            />
        );
    }
    return null;
}

export interface TermProps
    extends Pick<DefinitionListSingleItem, 'note' | 'name' | 'nameTitle' | 'multilineName'> {
    direction?: DefinitionListDirection;
}

export function Term({note, name, nameTitle, multilineName, direction}: TermProps) {
    const noteElement = (
        <React.Fragment>
            &nbsp;
            <NoteElement note={note} />
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <div className={b('term-wrapper')}>
                <span title={getTitle(nameTitle, name)}>{name}</span>
                {multilineName && noteElement}
            </div>
            {!multilineName && noteElement}
            {direction === 'horizontal' && (
                <div className={b('dots', {'with-note': Boolean(note)})} />
            )}
        </React.Fragment>
    );
}
