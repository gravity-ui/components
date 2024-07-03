import React from 'react';

import {HelpPopover} from '../../HelpPopover';
import {DefinitionListItemNote, DefinitionListSingleItem} from '../types';
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
            />
        );
    }

    if (typeof note === 'object') {
        return <HelpPopover className={popoverClassName} placement={['bottom', 'top']} {...note} />;
    }
    return null;
}

export interface TermProps
    extends Pick<DefinitionListSingleItem, 'note' | 'name' | 'nameTitle' | 'multilineName'> {
    vertical?: boolean;
}

export function Term({note, name, nameTitle, multilineName, vertical}: TermProps) {
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
            {!vertical && <div className={b('dots', {'with-note': Boolean(note)})} />}
        </React.Fragment>
    );
}
