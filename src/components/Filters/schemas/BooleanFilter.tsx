import type {FilterSchema} from './types';

export function createBooleanFilter(
    id: string,
    name: string,
    options?: {
        emptyValueText?: string;
    },
): FilterSchema<true> {
    return {
        id,
        displayName: name,

        initialValue: true,
        emptyValueText: options?.emptyValueText,

        readOnlyAfterApply: true,
        skipControlRenderer: true,

        renderValue: () => '',
    };
}
