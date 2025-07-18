## Reactions

Component for user reactions (e.g. 👍, 😊, 😎 etc) as in GitHub comments for example.

### Usage example

```typescript
import * as React from 'react';

import {Reactions, ReactionProps, ReactionState} from '@gravity-ui/components';

const user = {
    spongeBob: {name: 'Sponge Bob'},
    patrick: {name: 'Patrick'},
};

const currentUser = user.spongeBob;

const option = {
    'thumbs-up': {content: '👍', value: 'thumbs-up'},
    cool: {content: '😎', value: 'cool'},
} satisfies Record<string, ReactionProps>;

const options: ReactionProps[] = Object.values(option);

export const YourComponent = () => {
    // You can set up a mapping: reaction.value -> users reacted
    const [usersReacted, setUsersReacted] = React.useState({
        [option.cool.value]: [user.spongeBob],
    });

    // And then convert that mapping into an array of ReactionState
    const reactionsState = React.useMemo(
        () =>
            Object.entries(usersReacted).map(
                ([value, users]): ReactionState => ({
                    value,
                    counter: users.length,
                    selected: users.some(({name}) => name === currentUser.name),
                }),
            ),
        [usersReacted],
    );

    // You can then handle clicking on a reaction with changing the inital mapping,
    // and the reactionsState array will change accordingly
    const onToggle = React.useCallback(
        (value: string) => {
            if (!usersReacted[value]) {
                // If the reaction is not present yet
                setUsersReacted((current) => ({...current, [value]: [currentUser]}));
            } else if (!usersReacted[value].some(({name}) => name === currentUser.name)) {
                // If the reaction is present, but current user hasn't selected it yet
                setUsersReacted((current) => ({
                    ...current,
                    [value]: [...usersReacted[value], currentUser],
                }));
            } else if (usersReacted[value].length > 1) {
                // If the user used that reaction, and he's not the only one who used it
                setUsersReacted((current) => ({
                    ...current,
                    [value]: usersReacted[value].filter(({name}) => name !== currentUser.name),
                }));
            } else {
                // If the user used that reaction, and he's the only one who used it
                setUsersReacted((current) => {
                    const newValue = {...current};
                    delete newValue[value];
                    return newValue;
                });
            }
        },
        [usersReacted],
    );

    return <Reactions reactions={options} reactionsState={reactionsState} onToggle={onToggle} />;
};
```

For more code examples go to [Reactions.stories.tsx](https://github.com/gravity-ui/components/blob/main/src/components/Reactions/__stories__/Reactions.stories.tsx).

### Props

**ReactionsProps** (main component props — Reactions' list):

| Property                 | Type                                                                                                | Required | Default | Description                                                                                    |
| :----------------------- | :-------------------------------------------------------------------------------------------------- | :------: | :------ | :--------------------------------------------------------------------------------------------- |
| `addButtonPlacement`     | `'start' or 'end'`                                                                                  |          | `'end'` | Position of the "Add reaction" button.                                                         |
| `className`              | `string`                                                                                            |          |         | HTML `class` attribute                                                                         |
| `onToggle`               | `(value: string) => void`                                                                           |          |         | Fires when a user clicks on a Reaction (in a Palette or in the Reactions' list)                |
| `paletteProps`           | `ReactionsPaletteProps`                                                                             |  `true`  |         | Notifications' palette props — it's a `Palette` component with available reactions to the user |
| `qa`                     | `string`                                                                                            |          |         | `qa` attribute for testing                                                                     |
| `reactions`              | `PaletteOption[]`                                                                                   |  `true`  |         | List of all available reactions                                                                |
| `reactionsState`         | `ReactionState[]`                                                                                   |  `true`  |         | List of reactions that were used                                                               |
| `readOnly`               | `boolean`                                                                                           |          | `false` | readOnly state (usage example: only signed in users can react)                                 |
| `renderTooltip`          | `(state: ReactionState) => React.ReactNode`                                                         |          |         | Reaction's tooltip with the list of reacted users for example                                  |
| `size`                   | `ButtonSize`                                                                                        |          | `m`     | Buttons's size                                                                                 |
| `style`                  | `React.CSSProperties`                                                                               |          |         | HTML `style` attribute                                                                         |
| `popupClassName`         | `string`                                                                                            |          |         | A class for the reaction container                                                             |
| `popupPlacement`         | `PopupPlacement`                                                                                    |          |         | Placement of the reaction popup                                                                |
| `renderAddReaction`      | `(props: RenderAddProps<AddReactionRef>) => React.ReactNode`                                        |          |         | Custom render function for the add reaction button                                             |
| `renderReaction`         | Function                                                                                            |          |         | Custom render function for the reaction button                                                 |
| `renderReactionsContent` | `(props: { reactionList: React.ReactNode; addReactionButton: React.ReactNode }) => React.ReactNode` |          |         | Callback function to render custom reactions content                                           |

**ReactionState** (single reaction props):

| Property   | Type              | Required | Default | Description                       |
| :--------- | :---------------- | :------: | :------ | :-------------------------------- |
| `counter`  | `React.ReactNode` |          |         | How many users used this reaction |
| `selected` | `boolean`         |          |         | Is reaction selected by the user  |
| `value`    | `string`          |          |         | Reaction's unique value (ID)      |

**RenderAddProps** (for custom rendering of add reaction button):

| Property        | Type                                         | Required | Description                                    |
| :-------------- | :------------------------------------------- | :------: | :--------------------------------------------- |
| `paletteOpened` | `boolean`                                    |  `true`  | Whether the reaction palette is currently open |
| `ref`           | `React.RefObject<AddReactionRef>`            |  `true`  | Reference to the add reaction button element   |
| `triggerProps`  | Object with button props and ARIA attributes |  `true`  | Props to be passed to the button element       |
