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

- `Cmd + Arrow` (Mac) / `Ctrl + Alt + Arrow` (Win/Linux) — move between tokens
- `Option + Arrow` (Mac) / `Ctrl + Arrow` (Win/Linux) — move between token fields
- `Cmd + Backspace` (Mac) / `Ctrl + Alt + Backspace` (Win/Linux) — delete the current token
- `Cmd + Z` (Mac) / `Ctrl + Z` (Win/Linux) — undo
- `Cmd + Shift + Z` (Mac) / `Ctrl + Y` or `Ctrl + Shift + Z` (Win/Linux) — redo
- `Escape` — close the suggestions menu; press again to remove focus
- `Cmd + I` (Mac) / `Ctrl + I` (Win/Linux) — open the suggestions menu
- `Cmd + Enter` (Mac) / `Ctrl + Enter` (Win/Linux) — finish the current token and go to the next (when the suggestions menu is closed)
- `Enter` — select a suggestion / finish the current token and go to the next (when the suggestions menu is closed)
