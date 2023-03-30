import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {HelpPopover, TextInput} from '@gravity-ui/uikit';
import {FormRow} from '../FormRow';

const fieldId = 'form-row-input-id';
const fieldDescriptionId = `${fieldId}-description`;

const argTypeReactNode = {
    control: {type: null},
};

export default {
    title: 'Components/FormRow',
    component: FormRow,
    args: {
        label: 'Enter your name',
        fieldId,
        children: <TextInput id={fieldId} />,
    },
    argTypes: {
        children: argTypeReactNode,
        labelHelpPopover: argTypeReactNode,
    },
} as ComponentMeta<typeof FormRow>;

const Template: ComponentStory<typeof FormRow> = (args) => <FormRow {...args} />;

export const Default = Template.bind({});

export const WithLongLabel = Template.bind({});
WithLongLabel.args = {
    label: 'Very long label for text field to test how it will wrap label text in real life',
};

export const WithLongLabelWord = Template.bind({});
WithLongLabelWord.args = {
    label: 'Antidisestablishmentarianism',
};

export const WithFieldDescription = Template.bind({});
WithFieldDescription.args = {
    children: (
        <>
            <TextInput id={fieldId} controlProps={{'aria-describedby': fieldDescriptionId}} />
            <FormRow.FieldDescription id={fieldDescriptionId}>
                Your name as it used in your foreign passport.
            </FormRow.FieldDescription>
        </>
    ),
};

export const WithFieldDescriptionAndLongLabel = Template.bind({});
WithFieldDescriptionAndLongLabel.storyName = 'With Field Description (Long Label)';
WithFieldDescriptionAndLongLabel.args = {
    ...WithFieldDescription.args,
    ...WithLongLabel.args,
};

export const RequiredField = Template.bind({});
RequiredField.args = {
    required: true,
};

export const WithHelpPopover = Template.bind({});
WithHelpPopover.args = {
    labelHelpPopover: (
        <HelpPopover
            content={'Your name as it used in your foreign passport.'}
            placement={['top', 'bottom']}
        />
    ),
};

export const WithHelpPopoverAndLongLabel = Template.bind({});
WithHelpPopoverAndLongLabel.storyName = 'With Help Popover (Long Label)';
WithHelpPopoverAndLongLabel.args = {
    ...WithLongLabel.args,
    ...WithHelpPopover.args,
};
