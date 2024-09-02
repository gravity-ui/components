import React from 'react';

import {Flex, Text} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {Reactions} from '../Reactions';
import {useMockReactions} from '../__tests__/mock/mockHooks';

export default {
    title: 'Components/Reactions',
    component: Reactions,
} as Meta<typeof Reactions>;

export const Default: StoryFn = () => {
    return <Reactions {...useMockReactions()} />;
};

export const Readonly: StoryFn = () => {
    const {reactions, reactionsState, renderTooltip, onToggle} = useMockReactions();

    return (
        <Reactions
            reactions={reactions}
            renderTooltip={
                renderTooltip
                    ? (state) => (
                          <Flex direction="column" gap={2}>
                              <Text variant="subheader-1">You must be singed in to react</Text>
                              {renderTooltip(state)}
                          </Flex>
                      )
                    : undefined
            }
            reactionsState={reactionsState}
            onToggle={onToggle}
            readOnly={true}
        />
    );
};

export const Size: StoryFn = () => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Size XS</Text>
                <Reactions {...useMockReactions()} size="xs" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Size S</Text>
                <Reactions {...useMockReactions()} size="s" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Size M</Text>
                <Reactions {...useMockReactions()} size="m" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Size L</Text>
                <Reactions {...useMockReactions()} size="l" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Size XL</Text>
                <Reactions {...useMockReactions()} size="xl" />
            </Flex>
        </Flex>
    );
};

export const AddButtonPosition: StoryFn = () => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Start</Text>
                <Reactions {...useMockReactions()} addButtonPosition="start" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">End</Text>
                <Reactions {...useMockReactions()} addButtonPosition="end" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Hide</Text>
                <Reactions {...useMockReactions()} hideAddButton={true} />
            </Flex>
        </Flex>
    );
};
