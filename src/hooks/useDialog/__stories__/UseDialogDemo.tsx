import React from 'react';

import {Button, Dialog} from '@gravity-ui/uikit';

import {DialogProvider, useDialog} from '..';
import {Confirm} from '../../../components';

import {NoteEditor} from './NoteEditor';
import {cnUseDialogDemo} from './UseDialogDemo.classname';

import './UseDialogDemo.scss';

const AddNoteButton = () => {
    const {openDialog} = useDialog();

    const handleOpenNoteEditor = React.useCallback(async () => {
        const handleValidateAndSave = (note: string) => {
            return new Promise<string>((resolve, reject) => {
                if (note) {
                    resolve(note);
                } else {
                    alert('Enter the note');
                    reject();
                }
            });
        };

        const result = await openDialog<string>(({onSuccess, asyncOnSuccess, onCancel}) => (
            <Dialog open onClose={onCancel} size="s">
                <NoteEditor
                    onSave={onSuccess}
                    onValidateAndSave={(note: string) =>
                        asyncOnSuccess(handleValidateAndSave(note), console.error)
                    }
                    onCancel={onCancel}
                />
            </Dialog>
        ));

        if (result.success) {
            const note = result.value;
            alert(`Your note is ${note}`);
        } else {
            alert('You cancelled creating the note');
        }
    }, [openDialog]);

    return (
        <Button view="action" onClick={handleOpenNoteEditor}>
            Add note
        </Button>
    );
};

const RemoveNoteButton = () => {
    const {openDialog} = useDialog();

    const handleRemoveNote = React.useCallback(async () => {
        const result = await openDialog<void>(({onSuccess, onCancel}) => (
            <Confirm
                title="Do you really want to remove the note?"
                confirmButtonText="Yes"
                cancelButtonText="No"
                open
                onCancel={onCancel}
                onConfirm={onSuccess}
            />
        ));

        if (result.success) {
            alert('The note was removed');
        } else {
            alert('You cancelled removing the note');
        }
    }, [openDialog]);

    return (
        <Button view="outlined-danger" onClick={handleRemoveNote}>
            Remove note
        </Button>
    );
};

export const UseDialogDemo = () => {
    return (
        <DialogProvider>
            <div className={cnUseDialogDemo('buttons')}>
                <AddNoteButton key="add" />
                <RemoveNoteButton key="remove" />
            </div>
        </DialogProvider>
    );
};
