import {Flex} from '@gravity-ui/uikit';
import {StoryFn} from '@storybook/react';

import {AsyncSuggestsTokenizedInput} from './AsyncSuggestsTemplate';
import {DefaultTokenizedInput} from './DefaultTemplate';
import {TokenizedComponentType} from './types';

type TokenValue = {key: string; operator: string; value: string};

export const MultipleInputTemplate: StoryFn<TokenizedComponentType<TokenValue>> = (args) => {
    return (
        <Flex direction="column" gap={4}>
            <AsyncSuggestsTokenizedInput
                {...args}
                placeholder="Enter value A"
                tokens={[{key: 'Action', operator: '=', value: 'GET'}]}
            />
            <AsyncSuggestsTokenizedInput {...args} placeholder="Enter value B" />
            <DefaultTokenizedInput {...args} placeholder="Enter value C" />
        </Flex>
    );
};
