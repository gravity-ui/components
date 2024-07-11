## Reactions

Component for user reactions (e.g. 👍, 😊, 😎 etc) as new GitHub comments for example.

### Usage example

```typescript
import React from 'react';

import {PaletteOption} from '@gravity-ui/uikit';
import {ReactionProps, Reactions} from '@gravity-ui/components';

const user = {
    spongeBob: {name: 'Sponge Bob'},
    patrick: {name: 'Patrick'},
};

const currentUser = user.spongeBob;

const option = {
    'thumbs-up': {content: '👍', value: 'thumbs-up'},
    cool: {content: '😎', value: 'cool'},
} satisfies Record<string, PaletteOption>;

const options = Object.values(option);

const YourComponent = () => {
    // You can set up a mapping: reaction.value -> users reacted
    const [usersReacted, setUsersReacted] = React.useState({
        [option.cool.value]: [user.spongeBob],
    });

    // And then convert that mapping into an array of ReactionProps
    const reactions = React.useMemo(
        () =>
            Object.entries(usersReacted).map(
                ([value, users]): ReactionProps => ({
                    value,
                    counter: users.length,
                    selected: users.some(({name}) => name === currentUser.name),
                }),
            ),
        [usersReacted],
    );

    // You can then handle clicking on a reaction with changing the inital mapping,
    // and the array of ReactionProps will change accordingly
    const onClickReaction = React.useCallback(
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

    return (
        <Reactions palette={{options}} reactions={reactions} onClickReaction={onClickReaction} />
    );
};
```

For more code examples go to [Reactions.stories.tsx](https://github.com/gravity-ui/components/blob/main/src/components/Reactions/__stories__/Reactions.stories.tsx).

### Props

**ReactionsProps** (main component props — Reactions' list):

| Property          | Type                      | Required | Default | Description                                                                                    |
| :---------------- | :------------------------ | :------: | :------ | :--------------------------------------------------------------------------------------------- |
| `reactions`       | `ReactionProps[]`         |  `true`  |         | List of Reactions to display                                                                   |
| `palette`         | `ReactionsPaletteProps`   |  `true`  |         | Notifications' palette props — it's a `Palette` component with available reactions to the user |
| `onClickReaction` | `(value: string) => void` |          |         | Fires when a user clicks on a Reaction (in a Palette or in the Reactions' list)                |
| `size`            | `ButtonSize`              |          | `m`     | Buttons's size                                                                                 |
| `disabled`        | `boolean`                 |          | `false` | If the buttons' are disabled                                                                   |
| `qa`              | `string`                  |          |         | `qa` attribute for testing                                                                     |
| `className`       | `string`                  |          |         | HTML class attribute                                                                           |
| `style`           | `React.CSSProperties`     |          |         | HTML style attribute                                                                           |

**ReactionProps** (single reaction props) extends `Palette`'s `PaletteOption` `disabled` and `value` props:

| Property   | Type                   | Required | Default | Description                                                   |
| :--------- | :--------------------- | :------: | :------ | :------------------------------------------------------------ |
| `selected` | `boolean`              |          |         | Is reaction selected by the user                              |
| `counter`  | `React.ReactNode`      |          |         | How many users used this reaction                             |
| `tooltip`  | `ReactionTooltipProps` |          |         | Reaction's tooltip with the list of reacted users for example |

**ReactionTooltipProps** — notification's type extends `Pick<PopoverProps, 'strategy' | 'placement' | 'modifiers'>`:

| Property        | Type              | Required | Default | Description                                                                                                                                                                      |
| :-------------- | :---------------- | :------: | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`       | `React.ReactNode` |  `true`  |         | Tooltip's content                                                                                                                                                                |
| `className`     | `string`          |          |         | Tooltip content's HTML class attribute                                                                                                                                           |
| `canClosePopup` | `() => boolean`   |          |         | Fires when the `onMouseLeave` callback is called. Usage example: you have some popup inside a tooltip, you hover on it, you don't want the tooltip to be closed because of that. |
