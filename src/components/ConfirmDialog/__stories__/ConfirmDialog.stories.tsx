import * as React from 'react';

import {Button} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {ConfirmDialog} from '../ConfirmDialog';
import type {ConfirmDialogProps} from '../ConfirmDialog';

export default {
    title: 'Components/ConfirmDialog',
    component: ConfirmDialog,
} as Meta<ConfirmDialogProps>;

const DefaultTemplate: StoryFn<ConfirmDialogProps> = (args) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Button view="normal" onClick={() => setOpen(true)}>
                Show confirm
            </Button>
            <ConfirmDialog
                {...args}
                onClickButtonApply={() => {
                    alert('Confirmed');
                    setOpen(false);
                }}
                onClickButtonCancel={() => {
                    alert('Cancelled');
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
                open={open}
            />
        </React.Fragment>
    );
};
export const Default = DefaultTemplate.bind({});

Default.args = {
    title: 'Do you want to confirm?',
    textButtonCancel: 'No',
    textButtonApply: 'Yes',
    'aria-labelledby': 'app-confirmation-dialog-title',
};
