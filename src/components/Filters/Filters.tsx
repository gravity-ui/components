import React from 'react';

import {block} from '../utils/cn';
import {FieldControl} from './components/FieldControl';
import {FilterSchema} from './types';
import isEqual from 'lodash/isEqual';

import {FilterSelect} from './components/FilterSelect';

import {ClearFiltersButton} from './components/ClearFiltersButton/ClearFiltersButton';

import i18n from './i18n';

import type {useFiltersValues} from './hooks/use-filters-values';

import './Filters.scss';

export type FieldsSchema<
    T extends Record<string, FilterSchema<any>> = Record<string, FilterSchema<any>>,
> = T;

export type FieldsSchemaArray = Array<FilterSchema<any>>;

type FiltersProps<T extends Record<string, FilterSchema<any>>> = {
    fields: FieldsSchema<T>;
    onChange?: (id: string, value: any) => void;
    onAdd?: (id: string) => void;
    onClear?: (id: string) => void;
    onResetFilters?: () => void;
    showEmptyText?: boolean;
} & ReturnType<typeof useFiltersValues>;

const b = block('filters');

export function Filters<
    T extends Record<string, FilterSchema<any>> = Record<string, FilterSchema<any>>,
>({
    fields,
    filtersState,
    initialValues,
    changeFilterValue,
    deleteFilterValue,
    resetFilters,
    onResetFilters,
    onAdd,
    onChange,
    onClear,
    showEmptyText,
}: FiltersProps<T>) {
    const [openFieldKey, setOpenFieldKey] = React.useState<string | undefined>(undefined);

    const handleFieldSubmit = React.useCallback(
        (id: string, values: any) => {
            changeFilterValue(id, values);
            onChange?.(id, values);
        },
        [changeFilterValue, onChange],
    );

    const handleAddField = React.useCallback(
        ({id}: {id: string}) => {
            const fieldSchema = fields[id];

            if (filtersState[id]) {
                deleteFilterValue(id);

                onClear?.(id);
                onChange?.(id, undefined);
            } else {
                if (!fields[id].skipControlRenderer) {
                    setOpenFieldKey(id);
                }

                const emptyValue = fieldSchema.initialValue ?? undefined;

                onAdd?.(id);

                changeFilterValue(id, emptyValue);
                onChange?.(id, changeFilterValue);
            }
        },
        [
            deleteFilterValue,
            onClear,
            onChange,
            onAdd,
            changeFilterValue,
            fields,
            filtersState,
            setOpenFieldKey,
        ],
    );

    const handleResetFilters = React.useCallback(() => {
        onResetFilters?.();

        resetFilters();
    }, [onResetFilters, resetFilters]);

    const hasFilters = React.useMemo<boolean>(
        () =>
            initialValues
                ? !isEqual(initialValues, filtersState)
                : Object.values(filtersState).length > 0,
        [initialValues, filtersState],
    );

    const fieldSelectOptions = React.useMemo(() => {
        return Object.values(fields).map((field) => ({
            label: field.name,
            value: field.id,
            description: field.description,
        }));
    }, [fields]);

    const selectedFieldOptions = Object.keys(filtersState);

    const renderFilterSelect =
        fieldSelectOptions.length > 0 && selectedFieldOptions.length < fieldSelectOptions.length;

    return (
        <section className={b()}>
            {selectedFieldOptions.length
                ? selectedFieldOptions.map((fieldKey) => {
                      const fieldSchema = fields[fieldKey];
                      const fieldValue = filtersState[fieldKey];
                      const defaultOpen = openFieldKey === fieldKey;

                      const FieldControlTag = fieldSchema.fieldSwitchRenderer ?? FieldControl;

                      return (
                          <FieldControlTag
                              key={fieldKey}
                              className={b('label')}
                              fieldName={fieldSchema.name}
                              fieldValue={fieldSchema.renderValue(fieldValue)}
                              emptyValueText={fieldSchema.emptyValueText}
                              defaultOpen={defaultOpen}
                              disableOpening={fieldSchema.readOnlyAfterApply}
                              onClear={() => {
                                  deleteFilterValue(fieldKey);
                                  onClear?.(fieldSchema.id);
                              }}
                              children={({onClose}) =>
                                  typeof fieldSchema.fieldControlRenderer === 'function' &&
                                  fieldSchema.fieldControlRenderer(
                                      fieldValue,
                                      fieldSchema.fieldControlRendererOptions,
                                      {
                                          onClose,
                                          onSubmit: (id: string, values: any) => {
                                              handleFieldSubmit(id, values);

                                              fieldSchema.onChange?.(values);

                                              setOpenFieldKey(undefined);
                                              onClose();
                                          },
                                      },
                                  )
                              }
                          />
                      );
                  })
                : null}
            {selectedFieldOptions.length === 0 && showEmptyText ? (
                <div className={b('empty-text')}>{i18n('empty-text')}</div>
            ) : null}
            {renderFilterSelect ? (
                <FilterSelect
                    className={b('add-filter')}
                    options={fieldSelectOptions}
                    showButtonText={selectedFieldOptions.length === 0}
                    values={selectedFieldOptions}
                    onItemClick={(id) => handleAddField({id})}
                />
            ) : null}
            {hasFilters ? <ClearFiltersButton onClick={handleResetFilters} /> : null}
        </section>
    );
}
