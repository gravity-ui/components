import React from 'react';

import type {DialogProps} from '@gravity-ui/uikit';
import {Dialog, DialogFooterProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import './ConfirmDialog.scss';

const b = block('confirm-dialog');

export type ConfirmDialogProps = {
    title?: string;
    message?: React.ReactNode;
} & Omit<DialogProps, 'children'> &
    Pick<
        DialogFooterProps,
        | 'textButtonApply'
        | 'textButtonCancel'
        | 'onClickButtonCancel'
        | 'onClickButtonApply'
        | 'propsButtonCancel'
        | 'propsButtonApply'
    >;

export const ConfirmDialog = ({
    title,
    message,
    textButtonApply,
    textButtonCancel,
    onClickButtonApply,
    onClickButtonCancel,
    propsButtonCancel,
    propsButtonApply,
    ...dialogProps
}: ConfirmDialogProps) => {
    return (
        <Dialog {...dialogProps}>
            <Dialog.Header caption={title} />
            <Dialog.Body className={b('body')}>{message}</Dialog.Body>
            <Dialog.Footer
                preset="default"
                showError={false}
                listenKeyEnter
                textButtonApply={textButtonApply}
                textButtonCancel={textButtonCancel}
                onClickButtonApply={onClickButtonApply}
                onClickButtonCancel={onClickButtonCancel}
                propsButtonCancel={propsButtonCancel}
                propsButtonApply={propsButtonApply}
            />
        </Dialog>
    );
};
