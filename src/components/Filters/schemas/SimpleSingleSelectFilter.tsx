import React from 'react';

import {
    FilterListContainer,
    FilterListContainerOption,
} from '../components/FilterListContainer/FilterListContainer';

import type {FilterSchema} from './types';

export function createSimpleSingleSelectFilter(
    id: string,
    displayName: string,
    options: {
        filterOptions: FilterListContainerOption[];
        filterable?: boolean;
        virtualized?: boolean;
        emptyValueText?: string;
    },
): FilterSchema<
    string[],
    {selectOptions: FilterListContainerOption[]; filterable?: boolean; virtualized?: boolean}
> {
    return {
        id,
        displayName,

        initialValue: [],
        emptyValueText: options.emptyValueText,

        filterControlRenderer: (value, {onClose, onSubmit}) => (
            <FilterListContainer
                value={value}
                options={options.filterOptions}
                filterable={options.filterable}
                virtualized={options.virtualized}
                hideControls={true}
                multiple={false}
                onClose={onClose}
                onSubmit={(values: string[]) => onSubmit(id, values)}
            />
        ),

        renderValue: (value) => {
            if (!value.length) {
                return undefined;
            }

            const [first] = value;

            const optionName = options.filterOptions.find((opt) => opt.value === first);

            if (!optionName) {
                console.warn(`Failed to get optionName, ${first}. Filter id - ${id}`); // eslint-disable-line no-console

                return undefined;
            }

            return optionName.label;
        },
    };
}
