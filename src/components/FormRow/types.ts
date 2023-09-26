import type {HTMLAttributes, PropsWithChildren, ReactNode} from 'react';

export type FormRowDirection = 'row' | 'column';

export interface FormRowProps {
    className?: string;
    /** Field label */
    label?: ReactNode;
    /** Slot for inserting `<HelpPopover/>` next to label text */
    labelHelpPopover?: ReactNode;
    /** Id of field to correctly associate it label */
    fieldId?: string;
    /** Display star next to required field */
    required?: boolean;
    /** Field component itself. `<FormRow.FieldDescription/>` could be used here
     * next to field component itself */
    children?: ReactNode;
    /** Direction in which the elements are placed */
    direction?: FormRowDirection;
}

export type FormRowFieldDescriptionProps = PropsWithChildren<{}> &
    Pick<HTMLAttributes<HTMLParagraphElement>, 'id' | 'className'>;
