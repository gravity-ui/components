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

### Usage Examples

#### 1. Basic Key-Value Input

The most common use case is a query builder where each token consists of a `key`, `operator`, and `value`.

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
        // Return suggestions based on the current field
        if (key === 'key') {
          return {
            items: [
              {
                label: 'Status',
                search: 'Status',
                value: {key: 'Status'},
                focus: {idx: 0, key: 'operator', offset: -1},
              },
              {
                label: 'User',
                search: 'User',
                value: {key: 'User'},
                focus: {idx: 0, key: 'operator', offset: -1},
              },
            ],
          };
        }
        return {items: []};
      }}
    />
  );
}
```

#### 2. Single Field (Tags) Input

You can use `TokenizedInput` as a simple tags input by defining only one field and using `transformTokens` to make existing tokens read-only.

```tsx
import {getUniqId} from '@gravity-ui/uikit';
import {TokenizedInput, Token} from '@gravity-ui/components';

type TagToken = {value: string};

const fields = [
  {
    key: 'value',
    specialKeysActions: [
      {
        // Create a new token when pressing Space
        key: (e) => e.key === ' ',
        action: ({focus, onFocus, event}) => {
          event.preventDefault();
          onFocus({...focus, idx: focus.idx + 1, key: 'value', offset: -1});
        },
      },
    ],
  },
];

// Make existing tokens read-only so they act like solid blocks (tags)
const transformTokens = (tokens: TagToken[]): Token<TagToken>[] => {
  return tokens.map((t) => ({
    id: getUniqId(),
    value: t,
    kind: 'regular',
    options: {readOnlyFields: ['value']}, // Prevents editing the text inside the tag
  }));
};

function TagsInput() {
  const [tokens, setTokens] = React.useState<TagToken[]>([]);

  return (
    <TokenizedInput
      tokens={tokens}
      transformTokens={transformTokens}
      onChange={setTokens}
      fields={fields}
    />
  );
}
```

#### 3. Dynamic Placeholders

You can provide a function to the `placeholder` prop to generate context-aware placeholders based on the token's current state.

```tsx
const placeholder = React.useCallback((tokenType, token, idx) => {
  // Show a specific placeholder when the user is about to type a value for the "message" key
  if (token.key === 'message' && idx === 2) {
    return 'Enter a string';
  }
  // Show a general placeholder for the very first empty token
  if (tokenType === 'new' && idx === 0) {
    return 'Enter a value';
  }
  return undefined;
}, []);

<TokenizedInput placeholder={placeholder} /* ... */ />;
```

### Composition Pattern

The `TokenizedInput` component is highly modular and built using a composition of smaller sub-components. You can override any of its sub-components by passing a custom component directly to the corresponding prop.

The available sub-components are:

- `Wrapper`: The outermost container that handles global key presses and blur events.
- `TokenList`: Renders the list of tokens.
- `Token`: Renders an individual token (either a `RegularToken` or a `NewToken`).
- `Field`: Renders the actual input field inside a token.
- `Suggestions`: Renders the suggestions popup.

#### Overriding Sub-components

If you want to customize the rendering of the input values (e.g., to add syntax highlighting or custom formatting), you can override the `Field` component to use the `renderValue` prop.

```tsx
import {TokenizedInput, TokenizedInputFieldProps} from '@gravity-ui/components';

// 1. Define your custom render logic
const renderValue: TokenizedInputFieldProps['renderValue'] = ({
  fieldKey,
  isFocused,
  isNew,
  visibleValue,
}) => {
  // Don't format while typing
  if (isNew || isFocused) {
    return visibleValue;
  }

  // Apply custom formatting based on the field type
  if (fieldKey === 'key') {
    return <span style={{color: 'purple', fontWeight: 800}}>{visibleValue}</span>;
  }
  if (fieldKey === 'value') {
    return <span style={{color: 'green'}}>{visibleValue}</span>;
  }

  return visibleValue;
};

// 2. Create a custom Field component that wraps the original Field
const CustomField = (props: TokenizedInputFieldProps) => {
  return <TokenizedInput.Field {...props} renderValue={renderValue} />;
};

// 3. Pass it to the Field prop
function App() {
  return (
    <TokenizedInput
      /* ...other props... */
      Field={CustomField}
    />
  );
}
```

#### Context Hooks

When building fully custom sub-components, you can use the provided context hooks to access the internal state and callbacks of the `TokenizedInput`:

- `useInputContext()` — Input state and callbacks (`tokens`, `fields`, `onChangeToken`, `onRemoveToken`, etc.)
- `useFocusContext()` — Focus state and callbacks (`focus`, `onFocus`, `onBlur`, `getFocusRules`, etc.)
- `useOptionsContext()` — Extra options from props (`onSuggest`, `debounceDelay`, `shouldAllowBlur`, etc.)
- `useTokenizedInput()` — Returns all three contexts above combined (`inputInfo`, `focusInfo`, `options`).
- `useTokenizedInputComponents()` — Access to the current sub-components (useful if your custom component needs to render the default `Field` or `Token`).

For convenience, there are also specific hooks for each part of the component that you can use as a starting point: `useTokenizedInputWrapper`, `useTokenizedInputList`, `useTokenizedInputNewToken`, `useTokenizedInputRegularToken`, `useTokenizedInputField`, `useTokenizedInputSuggestions`.

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
