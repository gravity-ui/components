## TokenizedInput

This component is for writing queries/filters and working with them as tokens. Here, a token is an expression (for example, for the format `key = value` the token would be `User = Ivan`). A distinguishing feature is full keyboard and mouse support (including clicking suggestions).

### API Reference

| Prop                    | Type                                                                                                  | Default         | Description                                                    |
| :---------------------- | :---------------------------------------------------------------------------------------------------- | :-------------- | :------------------------------------------------------------- |
| `tokens`                | `T[]`                                                                                                 | -               | Array of token values.                                         |
| `fields`                | `TokenField<T>[]`                                                                                     | -               | Field definitions; order matches display order.                |
| `onChange`              | `(newTokens: T[]) => void`                                                                            | -               | Token list change handler.                                     |
| `defaultTokens`         | `T[]`                                                                                                 | `[]`            | Defaults applied on full clear.                                |
| `transformTokens`       | `(tokens: T[]) => Token<T>[]`                                                                         | -               | Maps raw tokens to internal token shape.                       |
| `validateToken`         | `(token: T) => Partial<Record<keyof T, string>> \| undefined \| false`                                | -               | Validates a token.                                             |
| `formatToken`           | `(token: T) => T`                                                                                     | -               | Formats a token value before saving.                           |
| `placeholder`           | `string \| TokenPlaceholderGeneratorFn<T>`                                                            | -               | Placeholder for the new token.                                 |
| `isEditable`            | `boolean`                                                                                             | `true`          | Whether editing is allowed.                                    |
| `isClearable`           | `boolean`                                                                                             | `true`          | Whether full clear is allowed.                                 |
| `debounceDelay`         | `number \| Record<keyof T, number>`                                                                   | `150`           | Suggestions debounce delay; per-field overrides are supported. |
| `debounceFlushStrategy` | `'focus-input' \| 'focus-field'`                                                                      | `'focus-field'` | When debounce flushes.                                         |
| `autoFocus`             | `boolean`                                                                                             | `false`         | Autofocus the new token.                                       |
| `onSuggest`             | `(ctx: TokenizedSuggestionContext<T>) => TokenizedSuggestions<T> \| Promise<TokenizedSuggestions<T>>` | -               | Fetches suggestions.                                           |
| `fullWidthSuggestions`  | `boolean`                                                                                             | `false`         | Render suggestions full width below the input.                 |
| `onKeyDown`             | `(v: TokenOnKeyDownOptions<T>) => boolean`                                                            | -               | Keydown handler; return true to stop further handling.         |
| `onFocus`               | `() => void`                                                                                          | -               | onFocus callback.                                              |
| `onBlur`                | `() => void`                                                                                          | -               | onBlur callback.                                               |
| `shouldAllowBlur`       | `(e: React.FocusEvent) => boolean`                                                                    | `() => true`    | Return true to allow blur, false to prevent it.                |

### Usage Example

```tsx
import {TokenizedInput} from '@gravity-ui/components';

type MyToken = {
  key: string;
  operator: string;
  value: string;
};

const fields = [
  {key: 'key', className: 'my-key-field'},
  {key: 'operator', className: 'my-operator-field'},
  {key: 'value', className: 'my-value-field'},
];

function App() {
  const [tokens, setTokens] = React.useState<MyToken[]>([]);

  return (
    <TokenizedInput<MyToken>
      tokens={tokens}
      fields={fields}
      onChange={setTokens}
      onSuggest={async ({key, value}) => {
        // Return suggestions based on the current field and value
        return {
          items: [
            {label: 'Status', search: 'Status', value: {key: 'Status'}},
            {label: 'User', search: 'User', value: {key: 'User'}},
          ],
        };
      }}
    />
  );
}
```

### Composition Pattern

The component is highly modular. You can override any of its sub-components by passing a custom component to the `components` prop.

```tsx
<TokenizedInput
  {...props}
  components={{
    Wrapper: MyCustomWrapper,
    TokenList: MyCustomTokenList,
    Token: MyCustomToken,
    Field: MyCustomField,
    Suggestions: MyCustomSuggestions,
  }}
/>
```

When building custom components, you can use the provided context hooks to access the internal state and callbacks:

- `useInputContext()` — Input state and callbacks (`tokens`, `fields`, `onChangeToken`, etc.)
- `useFocusContext()` — Focus state and callbacks (`focus`, `onFocus`, `onBlur`, etc.)
- `useOptionsContext()` — Extra options from props (`onSuggest`, `debounceDelay`, etc.)
- `useTokenizedInput()` — Returns all three contexts above combined (`inputInfo`, `focusInfo`, `options`).
- `useTokenizedInputComponents()` — Access to the current sub-components.

For convenience, there are also specific hooks for each part: `useTokenizedInputWrapper`, `useTokenizedInputList`, `useTokenizedInputNewToken`, `useTokenizedInputRegularToken`, `useTokenizedInputField`, `useTokenizedInputSuggestions`.

### Hotkeys

#### Mac

- `Cmd + Arrow` — move between tokens
- `Option + Arrow` — move between token fields
- `Cmd + Backspace` — delete the current token
- `Cmd + Z` — undo
- `Cmd + Shift + Z` — redo
- `Cmd + I` — open the suggestions menu
- `Cmd + Enter` — finish the current token and go to the next (when the suggestions menu is closed)

#### Windows / Linux

- `Ctrl + Alt + Arrow` — move between tokens
- `Ctrl + Arrow` — move between token fields
- `Ctrl + Alt + Backspace` — delete the current token
- `Ctrl + Z` — undo
- `Ctrl + Y` or `Ctrl + Shift + Z` — redo
- `Ctrl + I` — open the suggestions menu
- `Ctrl + Enter` — finish the current token and go to the next (when the suggestions menu is closed)

#### General

- `Escape` — close the suggestions menu; press again to remove focus
- `Enter` — select a suggestion / finish the current token and go to the next (when the suggestions menu is closed)
