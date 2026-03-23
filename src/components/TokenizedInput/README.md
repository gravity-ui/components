## TokenizedInput

This component is for writing queries/filters and working with them as tokens. Here, a token is an expression (for example, for the format `key = value` the token would be `User = Ivan`). A distinguishing feature is full keyboard and mouse support (including clicking suggestions).

### Useful notes when using the component

- The component is modular; each part can be replaced if needed
  - `<Wrapper />` — wrapper that handles key presses; must return `children`
  - `<TokenList />` — list component that renders an array of tokens
  - `<Token />` — token component; renders token fields; two variants: `regular` — a standalone full token, and `new` — a new token (looks like a single line and must be the only one)
  - `<Field />` — token field component
  - `<Suggestions />` — suggestions component
- For convenience there are shared hooks `useTokenizedInput` and `useTokenizedInputComponents`, and specific hooks `useTokenizedInputWrapper`, `useTokenizedInputList`, `useTokenizedInputNewToken`, `useTokenizedInputRegularToken`, `useTokenizedInputField`, `useTokenizedInputSuggestions` for the matching components. There is also `tokenizedInputUtils` with utilities.

### Hotkeys

- `Cmd/Ctrl + Arrow` — move between tokens
- `Option/Alt + Arrow` — move between token fields
- `Cmd/Ctrl + Delete` — delete the current token
- `Cmd/Ctrl + Z` — undo
- `Cmd + Shift + Z / Ctrl + Y` — redo
- `Escape` — close the suggestions menu; press again to remove focus
- `Cmd/Ctrl + I` — open the suggestions menu
- `Enter` — select a suggestion / finish the current token and go to the next (when the suggestions menu is closed)
