import React from 'react';

import {Flex, Text, User} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {ReactionProps} from '../Reaction';
import {Reactions, ReactionsProps} from '../Reactions';

import {
    ReactionsMockUser,
    reactionsPalletteMockOption as option,
    reactionsPalletteMockOptions as options,
    reactionsPalletteMockOption,
    reactionsMockUser as user,
} from './mockData';

export default {
    title: 'Components/Reactions',
    component: Reactions,
} as Meta<typeof Reactions>;

const currentUser = user.spongeBob;

const renderUserReacted = ({avatar, name}: ReactionsMockUser) => {
    return (
        <User
            avatar={{imgUrl: avatar}}
            name={
                currentUser.name === name ? (
                    <Text>
                        {name} <Text color="secondary">(you)</Text>
                    </Text>
                ) : (
                    name
                )
            }
            key={name}
            size={'xs'}
        />
    );
};

const renderUsersReacted = (users: ReactionsMockUser[]) => {
    return (
        <Flex direction="column" gap={1}>
            {users.map(renderUserReacted)}
        </Flex>
    );
};

const getTooltip = (users: ReactionsMockUser[]): ReactionProps['tooltip'] => ({
    content: renderUsersReacted(users),
});

export const Default: StoryFn = () => {
    return <Reactions {...useReactions()} />;
};

export const Disabled: StoryFn = () => {
    return <Reactions {...useReactions()} disabled={true} />;
};

function useReactions(): ReactionsProps {
    const [usersReacted, setUsersReacted] = React.useState({
        [option.cool.value]: [user.patrick],
        [option.laughing.value]: [user.patrick, user.spongeBob],
        [option['thumbs-up'].value]: [user.patrick, user.spongeBob, user.squidward],
        [option['hearts-eyes'].value]: [user.spongeBob],
        [option['cold-face'].value]: [user.squidward],
        [option.sad.value]: [user.squidward],
    });

    const reactions = React.useMemo(
        () =>
            Object.entries(usersReacted).map(
                ([value, users]): ReactionProps => ({
                    ...reactionsPalletteMockOption[
                        value as keyof typeof reactionsPalletteMockOption
                    ],
                    counter: users.length,
                    tooltip: getTooltip(users),
                    selected: users.some(({name}) => name === currentUser.name),
                }),
            ),
        [usersReacted],
    );

    const onClickReaction = React.useCallback(
        (value: string) => {
            if (!usersReacted[value]) {
                setUsersReacted((current) => ({...current, [value]: [currentUser]}));
            } else if (!usersReacted[value].some(({name}) => name === currentUser.name)) {
                setUsersReacted((current) => ({
                    ...current,
                    [value]: [...usersReacted[value], currentUser],
                }));
            } else if (usersReacted[value].length > 1) {
                setUsersReacted((current) => ({
                    ...current,
                    [value]: usersReacted[value].filter(({name}) => name !== currentUser.name),
                }));
            } else {
                setUsersReacted((current) => {
                    const newValue = {...current};
                    delete newValue[value];
                    return newValue;
                });
            }
        },
        [usersReacted],
    );

    return {
        palette: {options},
        reactions,
        onClickReaction,
    };
}
