import {Meta} from '@storybook/react';

import {TokenizedInput} from '../TokenizedInput';

import {AsyncSuggestsTemplate} from './AsyncSuggestsTemplate';
import {CustomPlaceholderTemplate} from './CustomPlaceholderTemplate';
import {CustomRenderValueTemplate} from './CustomRenderValueTemplate';
import {DebounceShowcaseTemplate} from './DebounceShowcaseTemplate';
import {DefaultTemplate} from './DefaultTemplate';
import {FullWidthSuggestionsTemplate} from './FullWidthSuggestionsTemplate';
import {MultipleInputTemplate} from './MultipleInputTemplate';
import {SingleFieldTemplate} from './SingleFieldTemplate';
import {TokenizedComponentType} from './types';

const meta: Meta<TokenizedComponentType<Record<string, string>>> = {
    title: 'Components/TokenizedInput',
    component: TokenizedInput,
    argTypes: {
        size: {
            options: ['m', 'l', 'xl'],
            control: {type: 'radio'},
        },
    },
    args: {
        size: 'm',
    },
    parameters: {
        disableStrictMode: true,
    },
};

export default meta;

export const Default = DefaultTemplate.bind({});

Default.args = {
    isClearable: true,
    isEditable: true,
    placeholder: 'Enter a value',
};

export const CustomRenderValue = CustomRenderValueTemplate.bind({});

CustomRenderValue.args = {
    isClearable: true,
    isEditable: true,
    placeholder: 'Enter a value',
};

export const SingleField = SingleFieldTemplate.bind({});

SingleField.args = {
    isClearable: true,
    isEditable: true,
    placeholder: 'Choose colors',
};

export const AsyncSuggests = AsyncSuggestsTemplate.bind({});

AsyncSuggests.args = {
    isClearable: true,
    isEditable: true,
    placeholder: 'Enter a value',
    debounceDelay: 300,
};

export const MultipleInputs = MultipleInputTemplate.bind({});
export const DebounceShowcaseInputs = DebounceShowcaseTemplate.bind({});
export const FullWidthSuggestions = FullWidthSuggestionsTemplate.bind({});

export const CustomPlaceholder = CustomPlaceholderTemplate.bind({
    isClearable: true,
    isEditable: true,
});
