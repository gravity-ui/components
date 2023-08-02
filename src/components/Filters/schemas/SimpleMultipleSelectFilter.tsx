import React from 'react';

import {
    FilterListContainer,
    FilterListContainerOption,
} from '../components/FilterListContainer/FilterListContainer';

import type {FilterSchema} from './types';

export function createSimpleMultipleSelectFilter(
    id: string,
    displayName: string,
    options: {
        filterOptions: FilterListContainerOption[];
        description?: string;
        emptyValueText?: string;
        filterable?: boolean;
        virtualized?: boolean;
    },
): FilterSchema<
    string[],
    {selectOptions: FilterListContainerOption[]; filterable?: boolean; virtualized?: boolean}
> {
    return {
        id,

        displayName,
        description: options.description,

        initialValue: [],
        emptyValueText: options.emptyValueText,

        filterControlRenderer: (value, {onClose, onSubmit}) => (
            <FilterListContainer
                value={value}
                options={options.filterOptions}
                virtualized={options.virtualized}
                filterable={options.filterable}
                onClose={onClose}
                onSubmit={(values: string[]) => onSubmit(id, values)}
            />
        ),

        renderValue: (value) => {
            if (!value.length) {
                return undefined;
            }

            const [first, ...rest] = value;

            const optionName = options.filterOptions.find((opt) => opt.value === first);

            if (!optionName) {
                console.warn(`Failed to get optionName, ${first}. Filter id - ${id}`); // eslint-disable-line no-console

                return undefined;
            }

            return rest.length > 0 ? `${optionName.label} +${rest.length}` : optionName.label;
        },
    };
}
