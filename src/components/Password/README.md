## Password

Password display component

### PropTypes

Same as [TextInput component](https://github.com/gravity-ui/uikit/blob/main/src/components/controls/TextInput/README.md), with some exceptions:

- `value` is required property;
- `onUpdate` is required property;
- `rightContent` is omitted;
- `type` is omitted;

| Property       | Type      | Required | Description      |
| :------------- | :-------- | :------- | :--------------- |
| showCopyButton | `boolean` |          | show copy button |

#### Usage example

```jsx harmony
function MyComponent() {
  const [value, setValue] = React.useState('');

  return <Password showCopyButton={true} onUpdate={setValue} value={value} />;
}
```
