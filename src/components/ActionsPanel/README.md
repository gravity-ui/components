# ActionsPanel

## Usage

```tsx
import React from 'react';
import {ActionsPanel, ActionsPanelProps} from '@gravity-ui/components';

const actions: ActionsPanelProps['actions'] = [
  {
    id: 'id1',
    button: {
      props: {
        children: 'Action 1',
        onClick: () => console.log('click button action 1'),
      },
    },
    dropdown: {
      item: {
        action: () => console.log('click dropdown action 1'),
        text: 'Action 1',
      },
    },
  },
  {
    id: 'id2',
    button: {
      props: {
        children: 'Action 2',
        onClick: () => console.log('click button action 2'),
      },
    },
    dropdown: {
      item: {
        action: () => console.log('click dropdown action 2'),
        text: 'Action 2',
      },
    },
  },
];

const panel = <ActionsPanel actions={actions} />;
```

## Props

```ts
type ActionItem = {
  /** Uniq action id */
  id: string;
  /** If true, then always inside the dropdown */
  collapsed?: boolean;
  /** Settings for dropdown action */
  dropdown: {
    item: DropdownMenuItem;
    group?: string;
  };
  /** Settings for button action */
  button: {
    props: ButtonProps;
  };
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
