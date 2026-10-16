# FormRow

Base component to place form input and label.

## Properties

| Name               | Type                | Default | Description                                                               |
| :----------------- | :------------------ | :------ | :------------------------------------------------------------------------ |
| `label`            | `React.ReactNode`   |         | Field label text                                                          |
| `labelHelpPopover` | `React.ReactNode`   |         | Slot for a `<HelpPopover/>` rendered next to the label                    |
| `fieldId`          | `string`            |         | `id` of the field control, used to associate the label with it            |
| `required`         | `boolean`           | `false` | Show a required-field star next to the label                              |
| `direction`        | `'row' \| 'column'` | `'row'` | Direction in which label and field are placed                             |
| `children`         | `React.ReactNode`   |         | The field control; `<FormRow.FieldDescription/>` can be placed next to it |
| `className`        | `string`            |         | HTML `class` attribute                                                    |

## Usage

```tsx
import type {FC} from 'react';
import {TextInput} from '@gravity-ui/uikit';
import {FormRow} from '@gravity-ui/components';

const nameFieldId = 'form-field-name';

const Form: FC = () => {
  return (
    <>
      <FormRow label={'Name'} fieldId={nameFieldId}>
        <TextInput id={nameFieldId} name={'name'} />
      </FormRow>
    </>
  );
};
```
