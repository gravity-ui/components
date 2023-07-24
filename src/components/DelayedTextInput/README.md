## DelayedTextInput

Component for delaying user input synchronization with external state.

### PropTypes

Same as [TextInput component](https://github.com/gravity-ui/uikit/blob/main/src/components/controls/TextInput/README.md), with some exceptions:

- `value` is required property;
- `onUpdate` is required property;
- `defaultValue` is omitted.

| Property | Type     | Required | Default | Description                             |
| :------- | :------- | :------- | :------ | :-------------------------------------- |
| delay    | `Number` |          | 200     | Delay before user input synchronization |

#### Usage example

```jsx harmony
function SearchComponent() {
  const [searchTerm, setSearchTerm] = React.useState('');

  return <DelayedTextInput value={searchTerm} setSearchTerm={setSearchTerm} delay={300} hasClear />;
}
```
