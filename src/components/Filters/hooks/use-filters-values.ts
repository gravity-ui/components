import React from 'react';

import type {FilterSchema} from '../types';

export type FiltersReducerState = Record<string, any>;

type FiltersReducerAction =
    | {type: 'CHANGE_VALUE'; payload: {id: string; value: any}}
    | {type: 'DELETE_VALUE'; payload: {id: string}}
    | {type: 'RESET_VALUES'; payload: {initialValues: Partial<FiltersReducerState>}};

function filtersReducer(state: FiltersReducerState, action: FiltersReducerAction) {
    switch (action.type) {
        case 'CHANGE_VALUE':
            return {...state, [action.payload.id]: action.payload.value};
        case 'DELETE_VALUE': {
            const nextState = {...state};

            delete nextState[action.payload.id];

            return nextState;
        }
        case 'RESET_VALUES':
            return {...action.payload.initialValues};
        default:
            return state;
    }
}

export function useFiltersValues<T extends Array<FilterSchema<any>> = Array<FilterSchema<any>>>(
    fields: T,
    externalInitialValues?: Partial<FiltersReducerState>,
    emptyValue?: Partial<FiltersReducerState>,
) {
    const initialValues = React.useMemo(
        () => ({
            ...fields.reduce<FiltersReducerState>((accumulator, field) => {
                if (field.showEmptyLabel) {
                    return {
                        ...accumulator,
                        [field.id]: field.initialValue || undefined,
                    };
                }

                return accumulator;
            }, {}),
            ...(externalInitialValues || {}),
        }),
        [fields, externalInitialValues],
    );

    const [filtersState, dispatch] = React.useReducer(filtersReducer, initialValues);

    const changeFilterValue = React.useCallback(
        (id: string, value: any) => dispatch({type: 'CHANGE_VALUE', payload: {id, value}}),
        [],
    );

    const deleteFilterValue = React.useCallback(
        (id: string) => dispatch({type: 'DELETE_VALUE', payload: {id}}),
        [],
    );

    const resetFilters = React.useCallback(
        () => dispatch({type: 'RESET_VALUES', payload: {initialValues: emptyValue || {}}}),
        [],
    );

    return {
        filtersState,
        changeFilterValue,
        deleteFilterValue,
        resetFilters,
        initialValues,
        emptyValue,
    };
}
