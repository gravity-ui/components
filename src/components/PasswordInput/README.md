## PasswordInput

Password Input display component

### PropTypes

Same as [TextInput component](https://github.com/gravity-ui/uikit/blob/main/src/components/controls/TextInput/README.md), with some exceptions:

- `value` is required property;
- `onUpdate` is required property;
- `type` is omitted;

| Property             | Type      | Required | Default | Description            |
| :------------------- | :-------- | :------- | :------ | :--------------------- |
| showCopyButton       | `boolean` |          |         | Show copy button       |
| showVisibilityButton | `boolean` |          |         | Show visibility button |

#### Usage example

```jsx harmony
function MyComponent() {
  const [value, setValue] = React.useState('');

  return (
    <PasswordInput
      showCopyButton={true}
      showVisibilityButton={true}
      onUpdate={setValue}
      value={value}
    />
  );
}
```
