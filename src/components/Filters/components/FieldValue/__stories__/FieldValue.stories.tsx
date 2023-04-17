import React, {useState} from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FieldValue} from '../FieldValue';

export default {
    title: 'Components/FieldValue(unstable)',
    component: FieldValue,
} as ComponentMeta<typeof FieldValue>;

interface FiltersState {
    displayName: string;
    value: string;
}

const initialState = {
    author: {displayName: 'Author', value: 'John Doe'},
    type: {displayName: 'Type', value: 'Pending'},
};

export const Default: ComponentStory<typeof FieldValue> = () => {
    const [filters, setFilters] = useState<Record<string, FiltersState>>(initialState);

    return (
        <div>
            {Object.keys(filters).map((key) => {
                const {displayName, value} = filters[key];

                return (
                    <span style={{marginInline: 4}}>
                        <FieldValue
                            key={key}
                            fieldName={displayName}
                            fieldValue={value}
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
