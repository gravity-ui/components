import {Flex, Text} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {Reactions} from '../Reactions';
import {useMockReactions} from '../__tests__/mock/mockHooks';

export default {
    title: 'Components/Reactions',
    component: Reactions,
} as Meta<typeof Reactions>;

export const Default: StoryFn = () => {
    return (
        <div>
            <Flex
                direction="column"
                gap={4}
                overflow="auto"
                height="600px"
                style={{border: '1px solid black'}}
            >
                <div>
                    <div style={{height: '2000px'}}></div>
                </div>
                <Reactions {...useMockReactions()} />
            </Flex>
        </div>
    );
};

export const Readonly: StoryFn = () => {
    const {reactions, reactionsState, renderTooltip, onToggle} = useMockReactions();

    return (
        <Flex direction="column" gap={4} overflow="auto" height="600px">
            <div style={{height: '2000px'}}></div>
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
        </Flex>
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

export const AddButtonPlacement: StoryFn = () => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">Start</Text>
                <Reactions {...useMockReactions()} addButtonPlacement="start" />
            </Flex>
            <Flex direction="column" gap={2}>
                <Text variant="subheader-1">End</Text>
                <Reactions {...useMockReactions()} addButtonPlacement="end" />
            </Flex>
        </Flex>
    );
};
