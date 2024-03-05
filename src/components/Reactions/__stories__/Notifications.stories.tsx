import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {ReactionProps} from '../Reaction';
import {Reactions} from '../Reactions';

export default {
    title: 'Components/Reactions',
    component: Reactions,
} as Meta<typeof Reactions>;

// 👍👎😄😕❤️🚀🔥👌🤦✅

const baseReactions: ReactionProps[] = [
    {
        icon: '👍',
        value: 'thumbs-up',
        count: 3,
    },
    {
        icon: '👎',
        value: 'thumbs-down',
        count: 618,
        isHighlighted: true,
    },
];

const market = <div>Emojis</div>;

export const Default: StoryFn = () => {
    const [reactions /* setReactions */] = React.useState(baseReactions);

    return <Reactions reactionsMarket={market} reactions={reactions} />;
};

export const Disabled: StoryFn = () => {
    return <Reactions reactionsMarket={market} reactions={baseReactions} disabled={true} />;
};
