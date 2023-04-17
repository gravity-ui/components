import type {FilterSchema} from '../types';

export function createBooleanFilter(
    id: string,
    name: string,
    emptyValueText?: string,
): FilterSchema<true> {
    return {
        id,
        name,

        initialValue: true,
        emptyValueText,

        readOnlyAfterApply: true,
        skipControlRenderer: true,

        renderValue: () => '',
    };
}
