import React, {useState} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FilterValue} from '../FilterValue';

export default {
    title: 'Components/FilterValue(unstable)',
    component: FilterValue,
} as ComponentMeta<typeof FilterValue>;

interface FiltersState {
    displayName: string;
    value: string;
}

const initialState = {
    author: {displayName: 'Author', value: 'John Doe'},
    type: {displayName: 'Type', value: 'Pending', onClick: () => {}},
};

export const Default: ComponentStory<typeof FilterValue> = () => {
    const [filters, setFilters] = useState<Record<string, FiltersState>>(initialState);

    return (
        <div>
            {Object.keys(filters).map((key) => {
                const {displayName, value} = filters[key];

                return (
                    <span style={{marginInline: 4}} key={key}>
                        <FilterValue
                            fieldName={displayName}
                            fieldValue={value}
                            onClick={key === 'type' ? () => {} : undefined}
                            onClear={() => {
                                setFilters((f) => {
                                    const copy = {...f};

                                    delete copy[key];

                                    return copy;
                                });
                            }}
                        />
                    </span>
                );
            })}
        </div>
    );
};
