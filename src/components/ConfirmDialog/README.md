<!--GITHUB_BLOCK-->

# ConfirmDialog

<!--/GITHUB_BLOCK-->

```tsx
import {ConfirmDialog} from '@gravity-ui/components';
```

`ConfirmDialog` is a utility component, which renders confirmation dialogs

## Properties

| Name                | Description                     |                                              Type                                              | Required |
| :------------------ | :------------------------------ | :--------------------------------------------------------------------------------------------: | :------: |
| title               | The confirm dialog title        |                                            `string`                                            |   Yes    |
| message             | The confirmation message        |                                          `ReactNode`                                           |   Yes    |
| textButtonCancel    | The cancel button text          |                                            `string`                                            |   Yes    |
| propsButtonCancel   | The cancel buttonProps          |                                         `ButtonProps`                                          |          |
| onClickButtonCancel | The cancel button click handler |                  `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void`                  |   Yes    |
| textButtonApply     | The ok button text              |                                            `string`                                            |   Yes    |
| propsButtonApply    | The ok button props             |                                         `ButtonProps`                                          |          |
| onClickButtonApply  | The ok button click handler     |                  `(event: React.MouseEvent<HTMLElement, MouseEvent>) => void`                  |   Yes    |
| onClose             | The dialog close handler        | `(event: MouseEvent or KeyboardEvent, reason: ModalCloseReason or 'closeButtonClick') => void` |   Yes    |

And other Dialog props

## Usage

```tsx
import {ConfirmDialog} from '@gravity-ui/components';

const [open, setOpen] = React.useState(false);

return (
  <React.Fragment>
    <Button view="normal" onClick={() => setOpen(true)}>
      Show confirm
    </Button>
    <ConfirmDialog
      {...args}
      title="Do you want to confirm?"
      onClickButtonApply={() => {
        alert('Confirmed');
        setOpen(false);
      }}
      onClickButtonCancel={() => {
        alert('Cancelled');
        setOpen(false);
      }}
      onClose={() => setOpen(false)}
      textButtonCancel="No"
      textButtonApply="Yes"
      open={open}
      aria-labelledby="app-confirmation-dialog-title"
    />
  </React.Fragment>
);
```
