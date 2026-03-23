import {Flex, Text} from '@gravity-ui/uikit';
import {StoryFn} from '@storybook/react';

import {AsyncSuggestsTokenizedInput} from './AsyncSuggestsTemplate';
import {DefaultTokenizedInput} from './DefaultTemplate';
import {TokenizedComponentType} from './types';

type TokenValue = {key: string; operator: string; value: string};

export const DebounceShowcaseTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return (
        <Flex direction="column" gap={4}>
            <Text variant="subheader-1">
                Strategy &apos;focus-field&apos;, 500ms debounce, synchronous suggestions
            </Text>
            <DefaultTokenizedInput
                {...args}
                placeholder="Enter a value"
                debounceDelay={500}
                debounceFlushStrategy="focus-field"
            />
            <Text variant="subheader-1">
                Strategy &apos;focus-input&apos;, 500ms debounce, synchronous suggestions
            </Text>
            <DefaultTokenizedInput
                {...args}
                placeholder="Enter a value"
                debounceDelay={500}
                debounceFlushStrategy="focus-input"
            />
            <Text variant="subheader-1">
                Strategy &apos;focus-field&apos;, per-field debounce, asynchronous suggestions
            </Text>
            <AsyncSuggestsTokenizedInput
                {...args}
                placeholder="Enter a value"
                debounceDelay={{key: 150, operator: 0, value: 1000}}
                debounceFlushStrategy="focus-field"
            />
            <Text variant="subheader-1">
                Strategy &apos;focus-input&apos;, per-field debounce, asynchronous suggestions
            </Text>
            <AsyncSuggestsTokenizedInput
                {...args}
                placeholder="Enter a value"
                debounceDelay={{key: 150, operator: 0, value: 1000}}
                debounceFlushStrategy="focus-input"
            />
        </Flex>
    );
};
