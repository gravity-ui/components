import React from 'react';

import type {FilterSchema} from '../types';
import {
    FilterListContainer,
    FilterListContainerOption,
} from '../components/FilterListContainer/FilterListContainer';

export function createSimpleMultipleSelectFilter(
    id: string,
    name: string,
    options: FilterListContainerOption[],
    emptyValueText?: string,
): FilterSchema<string[], {selectOptions: FilterListContainerOption[]}> {
    return {
        id,
        name,

        initialValue: [],
        emptyValueText,

        fieldControlRenderer: (value, fieldControlOptions, {onClose, onSubmit}) => (
            <FilterListContainer
                value={value}
                options={fieldControlOptions.selectOptions}
                onClose={onClose}
                onSubmit={(values: any) => onSubmit(id, values)}
            />
        ),

        renderValue: (value) => {
            if (!value.length) {
                return undefined;
            }

            const [first, ...rest] = value;

            const optionName = options.find((opt) => opt.value === first);

            if (!optionName) {
                console.warn(`Failed to get optionName, ${first}. Filter id - ${id}`);

                return undefined;
            }

            return rest.length > 0 ? `${optionName.label} +${rest.length}` : optionName.label;
        },

        fieldControlRendererOptions: {selectOptions: options},
    };
}
