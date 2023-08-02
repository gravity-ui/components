import React from 'react';

import type {FilterValue, FiltersValue} from '../Filters';

/**
 * This is a plug-n-play approach to use Filters component.
 *
 * With this hook you don't need to implement state management for filters component. This might be useful
 * if you do not need any extra logic before/after applying filters. Otherwise, you should implement those handlers by yourself
 * and pass them to Filters component.
 *
 * @param initialValues Initial values, e.g. previous filters values restored from localStorage.
 * @param emptyValue Empty values, by default equals to initialValues. This property will be used to set filtersValue after resetting them.
 * @returns Filters values and handlers to work with `<Filters />` component
 */
export function useFilters<T extends Record<string, unknown> = FiltersValue>(
    initialValues: T,
    emptyValue: T = initialValues,
) {
    const [filtersValues, setFiltersValues] = React.useState<FiltersValue>(initialValues);

    const handleChangeFilterValue = React.useCallback(
        (id: string, value: FilterValue) =>
            setFiltersValues((currentValue) => ({
                ...currentValue,
                [id]: value,
            })),
        [setFiltersValues],
    );

    const handleRemoveFilterValue = React.useCallback(
        (id: string) =>
            setFiltersValues((currentValue) => {
                const nextValue = {...currentValue};

                delete nextValue[id];

                return nextValue;
            }),
        [setFiltersValues],
    );

    const handleClearAllFilters = React.useCallback(
        () => setFiltersValues(emptyValue),
        [setFiltersValues, emptyValue],
    );

    return {
        filtersValues,
        handleChangeFilterValue,
        handleRemoveFilterValue,
        handleClearAllFilters,
    };
}
