import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';
import {FilterSelect} from '../FilterSelect';

export default {
    title: 'Components/FilterSelect(unstable)',
    component: FilterSelect,
} as ComponentMeta<typeof FilterSelect>;

const filtersOptions = [
    {
        value: 'author',
        label: 'Author',
    },
    {
        value: 'store',
        label: 'Store',
    },
    {
        value: 'location',
        label: 'Location',
    },
];

export const Default: ComponentStory<typeof FilterSelect> = () => {
    const [values, setValues] = React.useState<string[]>([]);

    const handleItemClick = (id: string) => {
        setValues((currentValues) => {
            if (currentValues.includes(id)) {
                return currentValues.filter((val) => val !== id);
            } else {
                return [...currentValues, id];
            }
        });
    };

    return <FilterSelect options={filtersOptions} values={values} onItemClick={handleItemClick} />;
};
