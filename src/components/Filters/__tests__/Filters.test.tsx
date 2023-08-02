import React from 'react';

import {act, render, screen, fireEvent} from '@testing-library/react';
import {Filters} from '../Filters';
import {
    createSimpleMultipleSelectFilter,
    createSimpleSingleSelectFilter,
    createBooleanFilter,
} from '../schemas';
import {useFilters} from '../hooks/use-filters';

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

const filtersSchema = {
    month: monthFilter,
    direction: directionFilter,
    withProblems: withProblemsFilter,
};

function FiltersWithHookWrapper() {
    const {filtersValues, handleChangeFilterValue, handleClearAllFilters, handleRemoveFilterValue} =
        useFilters({});

    return (
        <Filters
            schema={filtersSchema}
            filtersValues={filtersValues}
            onFilterValueChange={handleChangeFilterValue}
            onFilterValueRemove={handleRemoveFilterValue}
            onFiltersValuesReset={handleClearAllFilters}
        />
    );
}

describe('Filters', () => {
    test('it renders button to add filter', () => {
        render(
            <Filters
                filtersValues={{}}
                schema={filtersSchema}
                onFilterValueChange={jest.fn()}
                onFilterValueRemove={jest.fn()}
                onFiltersValuesReset={jest.fn()}
            />,
        );

        const addFilterButton = screen.getByTestId('add-filter');

        expect(addFilterButton).toBeVisible();
    });

    test('it renders initial values', () => {
        render(
            <Filters
                initialValues={{direction: ['IN']}}
                filtersValues={{direction: ['IN']}}
                schema={filtersSchema}
                onFilterValueChange={jest.fn()}
                onFilterValueRemove={jest.fn()}
                onFiltersValuesReset={jest.fn()}
            />,
        );

        const directionHtmlElement = screen.queryByText('Direction:', {exact: false});

        expect(directionHtmlElement).toBeVisible();
        expect(directionHtmlElement).toHaveTextContent('Direction: Incoming');
    });

    test('it removes filter value', async () => {
        render(<FiltersWithHookWrapper />);

        act(() => fireEvent.click(screen.getByTestId('add-filter')));

        const directionFilterItem = await screen.findByText('Direction');
        act(() => fireEvent.click(directionFilterItem));

        const incomingItem = await screen.findByText('Incoming');
        act(() => fireEvent.click(incomingItem));

        const directionHtmlElement = screen.queryByText('Direction:', {exact: false});

        expect(directionHtmlElement).toBeVisible();
        expect(directionHtmlElement).toHaveTextContent('Direction: Incoming');

        act(() => fireEvent.click(screen.getByLabelText('Remove "Direction" filter')));

        expect(directionHtmlElement).not.toBeVisible();
    });

    describe('Reset button', () => {
        test('it does not render reset button for empty values', () => {
            render(
                <Filters
                    filtersValues={{}}
                    schema={filtersSchema}
                    onFilterValueChange={jest.fn()}
                    onFilterValueRemove={jest.fn()}
                    onFiltersValuesReset={jest.fn()}
                />,
            );

            const resetButton = screen.queryByTestId('reset-filters');

            expect(resetButton).toBeFalsy();
        });

        test('it does not render reset button equal values/empty values', () => {
            render(
                <Filters
                    initialValues={{direction: ['IN']}}
                    filtersValues={{direction: ['IN']}}
                    schema={filtersSchema}
                    onFilterValueChange={jest.fn()}
                    onFilterValueRemove={jest.fn()}
                    onFiltersValuesReset={jest.fn()}
                />,
            );

            const resetButton = screen.queryByTestId('reset-filters');

            expect(resetButton).toBeFalsy();
        });

        test('it renders reset button for non-empty values', () => {
            render(
                <Filters
                    filtersValues={{direction: ['IN']}}
                    schema={filtersSchema}
                    onFilterValueChange={jest.fn()}
                    onFilterValueRemove={jest.fn()}
                    onFiltersValuesReset={jest.fn()}
                />,
            );

            const resetButton = screen.getByTestId('reset-filters');

            expect(resetButton).toBeVisible();
        });

        test('it resets values', async () => {
            function FiltersWrapper() {
                const [filtersValues, setFiltersValues] = React.useState<Record<string, unknown>>({
                    direction: ['IN'],
                });

                const handleResetFilters = () => setFiltersValues({});

                return (
                    <Filters
                        filtersValues={filtersValues}
                        schema={filtersSchema}
                        onFilterValueChange={jest.fn()}
                        onFilterValueRemove={jest.fn()}
                        onFiltersValuesReset={handleResetFilters}
                    />
                );
            }

            render(<FiltersWrapper />);

            const directionHtmlElement = screen.queryByText('Direction:', {exact: false});
            const resetButton = screen.queryByTestId('reset-filters');

            expect(directionHtmlElement).toBeVisible();

            act(() => fireEvent.click(screen.getByTestId('reset-filters')));

            expect(resetButton).not.toBeVisible();
            expect(directionHtmlElement).not.toBeVisible();
        });
    });

    describe('Simple single select schema', () => {
        test('it works', async () => {
            render(<FiltersWithHookWrapper />);

            act(() => fireEvent.click(screen.getByTestId('add-filter')));

            const directionFilterItem = await screen.findByText('Direction');
            act(() => fireEvent.click(directionFilterItem));

            const incomingItem = await screen.findByText('Incoming');
            act(() => fireEvent.click(incomingItem));

            const directionHtmlElement = screen.queryByText('Direction:', {exact: false});

            expect(directionHtmlElement).toBeVisible();
            expect(directionHtmlElement).toHaveTextContent('Direction: Incoming');
        });
    });

    describe('Simple multiple select schema', () => {
        test('it works', async () => {
            render(<FiltersWithHookWrapper />);

            act(() => fireEvent.click(screen.getByTestId('add-filter')));

            const monthFilterItem = await screen.findByText('Month');
            act(() => fireEvent.click(monthFilterItem));

            const januaryItem = await screen.findByText('January');
            act(() => fireEvent.click(januaryItem));

            const februaryItem = await screen.findByText('February');
            act(() => fireEvent.click(februaryItem));

            const applyButton = await screen.findByText('Apply');
            act(() => fireEvent.click(applyButton));

            const directionHtmlElement = screen.queryByText('Month:', {exact: false});

            expect(directionHtmlElement).toBeVisible();
            expect(directionHtmlElement).toHaveTextContent('Month: January +1');
        });
    });

    describe('Boolean schema', () => {
        test('it works', async () => {
            render(<FiltersWithHookWrapper />);

            act(() => fireEvent.click(screen.getByTestId('add-filter')));

            const problemsFilter = await screen.findByText('With monitoring problems');
            act(() => fireEvent.click(problemsFilter));

            const withMonitoringProblemsLabel = await screen.findByLabelText(
                'Remove "With monitoring problems" filter',
            );

            expect(withMonitoringProblemsLabel).toBeVisible();
        });
    });
});
