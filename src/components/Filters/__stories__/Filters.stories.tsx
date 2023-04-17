import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Filters} from '../Filters';
import {useFiltersValues} from '../hooks/use-filters-values';

import {
    createBooleanFilter,
    createSimpleMultipleSelectFilter,
    createSimpleSingleSelectFilter,
} from '../schemas';

const personFilter = createSimpleMultipleSelectFilter(
    'person',
    'Person',
    [
        {value: 'person_john', label: 'John'},
        {value: 'person_miron', label: 'Miron'},
        {value: 'person_dave', label: 'Dave'},
        {value: 'person_anatoly', label: 'Anatoly'},
        {value: 'person_anton', label: 'Anton'},
        {value: 'person_ephey', label: 'Ephey'},
        {value: 'person_jeremy', label: 'Jeremy'},
    ],
    'Not selected',
);

const departmentFilter = createSimpleMultipleSelectFilter(
    'department',
    'Department',
    [
        {value: 'department_hr', label: 'HR'},
        {value: 'department_finance', label: 'Finance'},
        {value: 'department_software_engineering', label: 'Software Engineering'},
    ],
    'Department is not selected',
);

const regionFilter = createSimpleMultipleSelectFilter('region', 'Region', [
    {value: 'region_spb', label: 'Saint-Petersburg'},
    {value: 'region_london', label: 'London'},
    {value: 'region_berlin', label: 'Berlin'},
]);

const directionFilter = createSimpleSingleSelectFilter(
    'direction',
    'Direction',
    [
        {value: 'IN', label: 'Incoming'},
        {value: 'OUT', label: 'Outcoming'},
    ],
    /* filterable */ false,
);

const withProblemsFilter = createBooleanFilter('withProblems', 'With monitoring problems');

const imaginaryPageImaginaryFilters = [
    personFilter,
    departmentFilter,
    regionFilter,
    withProblemsFilter,
    directionFilter,
];

const filtersSchema = imaginaryPageImaginaryFilters.reduce((acc, curr) => {
    return {
        ...acc,
        [curr.id]: curr,
    };
}, {});

const emptyValue = {
    [personFilter.id]: [],
    [departmentFilter.id]: [],
    [regionFilter.id]: [],
};

function ImaginarySearchPage() {
    const filtersValues = useFiltersValues(
        imaginaryPageImaginaryFilters,
        /* iniitalValue */ emptyValue,
        emptyValue,
    );

    const [filtersStringified, setFiltersStringified] = React.useState('');

    React.useEffect(() => {
        setFiltersStringified(JSON.stringify(filtersValues.filtersState));
    }, [filtersValues.filtersState]);

    return (
        <div>
            <div style={{marginBlock: 20}}>
                <Filters fields={filtersSchema} {...filtersValues} />
            </div>
            <div>Filters stringified: {filtersStringified || 'empty'}</div>
        </div>
    );
}

export default {
    title: 'Components/Filters(unstable)',
    component: ImaginarySearchPage,
} as ComponentMeta<typeof ImaginarySearchPage>;

export const Default: ComponentStory<typeof ImaginarySearchPage> = () => {
    return <ImaginarySearchPage />;
};
