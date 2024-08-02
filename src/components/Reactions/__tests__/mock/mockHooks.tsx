import React from 'react';

import {Flex, Text, User} from '@gravity-ui/uikit';

import {ReactionState} from '../../Reaction';
import {Reactions, ReactionsProps} from '../../Reactions';

import {
    ReactionsMockUser,
    reactionsPalletteMockOption as option,
    reactionsPalletteMockOptions as options,
    reactionsMockUser as user,
} from './mockData';

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

const getTooltip = (users: ReactionsMockUser[]): ReactionState['tooltip'] =>
    renderUsersReacted(users);

export function useMockReactions(): ReactionsProps {
    const [usersReacted, setUsersReacted] = React.useState({
        [option.cool.value]: [user.patrick],
        [option.laughing.value]: [user.patrick, user.spongeBob],
        [option['thumbs-up'].value]: [user.patrick, user.spongeBob, user.squidward],
        [option['hearts-eyes'].value]: [user.spongeBob],
        [option['cold-face'].value]: [user.squidward],
        [option.sad.value]: [user.squidward],
    });

    const reactionsState = React.useMemo(
        () =>
            Object.entries(usersReacted).map(
                ([value, users]): ReactionState => ({
                    value,
                    counter: users.length,
                    tooltip: getTooltip(users),
                    selected: users.some(({name}) => name === currentUser.name),
                }),
            ),
        [usersReacted],
    );

    const onToggle = React.useCallback(
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
        reactions: options,
        reactionsState,
        onToggle,
    };
}

export function TestReactions(props: Partial<ReactionsProps>) {
    return <Reactions {...useMockReactions()} {...props} />;
}
