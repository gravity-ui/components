# ActionsPanel

## Usage

```tsx
import React from 'react';
import {ActionsPanel, ActionsPanelProps} from '@gravity-ui/components';

const actions: ActionsPanelProps['actions'] = [
  {
    id: 'id1',
    renderContent: () => 'Action 1',
    handler: () => {},
  },
  {
    id: 'id2',
    renderContent: () => 'Action 2',
    handler: () => {},
  },
];

const panel = <ActionsPanel actions={actions} />;
```

## Props

```ts
type ActionItem = {
  /** Uniq action id */
  id: string;
  /** Render-props for the content inside Button or DropdownMenu components */
  renderContent: (component: 'button' | 'dropdown') => React.ReactNode;
  /** Click handler */
  handler?: () => void;
  /** Override props for action button */
  buttonProps?: ButtonProps;
};

type ActionsPanelProps = {
  /** Array of actions ActionItem[] */
  actions: ActionItem[];
  /** Close button click handler */
  onClose?: () => void;
  /** Render-prop for displaying the content of a note */
  renderNote?: () => React.ReactNode;
  className?: string;
};
```
