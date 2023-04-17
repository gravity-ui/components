import React from 'react';

import type {FilterSchema} from '../types';
import {
    FilterListContainer,
    FilterListContainerOption,
} from '../components/FilterListContainer/FilterListContainer';

export function createSimpleSingleSelectFilter(
    id: string,
    name: string,
    options: FilterListContainerOption[],
    filterable?: boolean,
    emptyValueText?: string,
): FilterSchema<string[], {selectOptions: FilterListContainerOption[]; filterable?: boolean}> {
    return {
        id,
        name,

        initialValue: [],
        emptyValueText,

        onChange: (value) => {
            window.location.hash = `${id}_${value[0]}`;
        },

        fieldControlRenderer: (value, fieldControlOptions, {onClose, onSubmit}) => (
            <FilterListContainer
                value={value}
                options={fieldControlOptions.selectOptions}
                filterable={fieldControlOptions.filterable}
                hideControls={true}
                multiple={false}
                onClose={onClose}
                onSubmit={(values: any) => onSubmit(id, values)}
            />
        ),

        renderValue: (value) => {
            if (!value.length) {
                return undefined;
            }

            const [first] = value;

            const optionName = options.find((opt) => opt.value === first);

            if (!optionName) {
                console.warn(`Failed to get optionName, ${first}. Filter id - ${id}`);

                return undefined;
            }

            return optionName.label;
        },

        fieldControlRendererOptions: {selectOptions: options, filterable},
    };
}
