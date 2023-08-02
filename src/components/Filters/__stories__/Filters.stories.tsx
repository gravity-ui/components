import React from 'react';

import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Filters} from '../Filters';
import {useFilters} from '../hooks/use-filters';

import {
    createBooleanFilter,
    createSimpleMultipleSelectFilter,
    createSimpleSingleSelectFilter,
} from '../schemas';

const monthFilter = createSimpleMultipleSelectFilter('month', 'Month', {
    filterOptions: [
        {value: 'month_january', label: 'January'},
        {value: 'month_february', label: 'February'},
        {value: 'month_march', label: 'March'},
        {value: 'month_april', label: 'April'},
        {value: 'month_may', label: 'May'},
        {value: 'month_june', label: 'June'},
        {value: 'month_july', label: 'July'},
        {value: 'month_august', label: 'August'},
        {value: 'month_september', label: 'September'},
        {value: 'month_october', label: 'October'},
        {value: 'month_november', label: 'November'},
        {value: 'month_december', label: 'December'},
    ],
    filterable: false,
    virtualized: false,
    description: 'I would choose January :? Basically, this is a simple filter description',
});

const directionFilter = createSimpleSingleSelectFilter('direction', 'Direction', {
    filterOptions: [
        {value: 'IN', label: 'Incoming'},
        {value: 'OUT', label: 'Outcoming'},
    ],
    filterable: false,
    virtualized: false,
});

const withProblemsFilter = createBooleanFilter('withProblems', 'With monitoring problems');

const filtersSchema: React.ComponentProps<typeof Filters>['schema'] = {
    month: monthFilter,
    direction: directionFilter,
    withProblems: withProblemsFilter,
};

const initialValues = {
    withProblems: true,
};

const emptyValues = {};

function ImaginarySearchFiltersPlugNPlay() {
    const {filtersValues, handleChangeFilterValue, handleRemoveFilterValue, handleClearAllFilters} =
        useFilters(initialValues, emptyValues);

    return (
        <React.Fragment>
            <Filters
                schema={filtersSchema}
                filtersValues={filtersValues}
                onFilterValueChange={handleChangeFilterValue}
                onFilterValueRemove={handleRemoveFilterValue}
                onFiltersValuesReset={handleClearAllFilters}
            />
            <div>Filters stringified: {JSON.stringify(filtersValues) || 'empty'}</div>
        </React.Fragment>
    );
}

function ImaginarySearchPage() {
    const [filtersValues, setFiltersValues] = React.useState<Record<string, unknown>>({});

    const handleChangeFilterValue = (id: string, value: unknown) => {
        setFiltersValues((currValue) => ({...currValue, [id]: value}));
    };

    const handleRemoveFilterValue = (id: string) => {
        setFiltersValues((currValue) => {
            const nextValue = {...currValue};

            delete nextValue[id];

            return nextValue;
        });
    };

    const handleClearAllFilters = () => {
        setFiltersValues({});
    };

    return (
        <React.Fragment>
            <Filters
                schema={filtersSchema}
                filtersValues={filtersValues}
                onFilterValueChange={handleChangeFilterValue}
                onFilterValueRemove={handleRemoveFilterValue}
                onFiltersValuesReset={handleClearAllFilters}
            />
            <div>Filters stringified: {JSON.stringify(filtersValues) || 'empty'}</div>
        </React.Fragment>
    );
}

export default {
    title: 'Components/Filters(unstable)',
    component: ImaginarySearchPage,
} as ComponentMeta<typeof ImaginarySearchPage>;

export const Default: ComponentStory<typeof ImaginarySearchPage> = () => {
    return <ImaginarySearchFiltersPlugNPlay />;
};
