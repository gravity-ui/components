import React from 'react';
import isEqual from 'lodash/isEqual';

import {block} from '../utils/cn';
import {FieldControl} from './components/FilterControl';
import {FilterSelect} from './components/FilterSelect';
import {ClearFiltersButton} from './components/ClearFiltersButton/ClearFiltersButton';

import i18n from './i18n';

import type {FilterSchema} from './schemas/types';

import './Filters.scss';

const b = block('filters');

export type FilterValue = unknown;
export type FiltersValue<TFiltersValue = Record<string, FilterValue>> = TFiltersValue;

/**
 * Filters schema to retreive editors/initial values/other schema options.
 */
export type FiltersSchema = Record<string, FilterSchema>;

interface FiltersComponentProps {
    className?: string;

    filtersSchema: FiltersSchema;

    showEmptyText?: boolean;

    initialOpenFilterKey?: string;

    /**
     * Contains serialized filters values with ID as a key.
     * Filters component uses this object to as "initial state" after reset.
     *
     * @example {location: ['Moscow'], author: ['Alex']}
     */
    initialValues?: FiltersValue;
    /**
     * Contains serialized filters values with ID as a key.
     * Filters component uses this object to render selected filters.
     *
     * @example {location: ['Moscow', 'London'], author: ['Max', 'Travis']}
     */
    filtersValues: FiltersValue;

    onChangeFilterValue: (id: string, value: FilterValue) => void;

    onRemoveFilterValue: (id: string, value: FilterValue) => void;

    /**
     *
     * @param values Currently applied filters
     */
    onClearAllFilters: (values: React.ComponentProps<typeof Filters>['filtersValues']) => void;
}

const defaultFiltersValues = {};

export function Filters(props: FiltersComponentProps) {
    const {
        className,
        filtersSchema,
        showEmptyText = false,
        initialOpenFilterKey,
        initialValues,
        filtersValues = defaultFiltersValues,
        onRemoveFilterValue,
        onChangeFilterValue,
        onClearAllFilters,
    } = props;

    const [openFilterKey, setOpenFilterKey] = React.useState<string | undefined>(
        initialOpenFilterKey,
    );

    const isEmptyFilters = React.useMemo<boolean>(
        () =>
            initialValues
                ? isEqual(initialValues, filtersValues)
                : Object.values(filtersValues).length === 0,
        [initialValues, filtersValues],
    );

    const filtersSelectOptions = React.useMemo(
        () =>
            Object.values(filtersSchema).map((field) => ({
                label: field.displayName,
                value: field.id,
                description: field.description,
            })),
        [filtersSchema],
    );

    const handleFiltersSelectItemClick = React.useCallback(
        (id: string) => {
            if (filtersValues[id] === undefined) {
                const initialValue =
                    'initialValue' in filtersSchema[id]
                        ? filtersSchema[id].initialValue
                        : undefined;

                onChangeFilterValue(id, initialValue);

                if (!filtersSchema[id]?.skipControlRenderer) {
                    setOpenFilterKey(id);
                }
            } else {
                onRemoveFilterValue(id, filtersValues[id]);

                setOpenFilterKey(undefined);
            }
        },
        [filtersValues, onRemoveFilterValue, onChangeFilterValue, filtersSchema],
    );

    const selectedFiltersOptions = React.useMemo(() => Object.keys(filtersValues), [filtersValues]);

    const renderEmptyText = showEmptyText && selectedFiltersOptions.length === 0;
    const renderFiltersSelect =
        filtersSelectOptions.length > 0 &&
        selectedFiltersOptions.length < filtersSelectOptions.length;

    return (
        <section className={b(null, className)}>
            {selectedFiltersOptions.length > 0
                ? selectedFiltersOptions.map((filterKey) => {
                      const filterSchema = filtersSchema[filterKey];

                      if (!filterSchema) {
                          return null;
                      }

                      const filterValue = filtersValues[filterKey];
                      const defaultOpen = openFilterKey === filterKey;

                      const FilterControlTag = filterSchema.filterSwitchRenderer ?? FieldControl;

                      return (
                          <FilterControlTag
                              sheetId={filterKey}
                              key={filterKey}
                              className={b('label')}
                              fieldName={filterSchema.displayName}
                              fieldValue={filterSchema.renderValue(filterValue)}
                              emptyValueText={filterSchema.emptyValueText}
                              disableOpening={filterSchema.readOnlyAfterApply}
                              onClear={() => onRemoveFilterValue(filterKey, filterValue)}
                              defaultOpen={defaultOpen}
                          >
                              {({onClose}) =>
                                  filterSchema.filterControlRenderer?.(filterValue, {
                                      onClose,
                                      onSubmit: (id: string, values: unknown) => {
                                          onChangeFilterValue(id, values);
                                          setOpenFilterKey(undefined);
                                          onClose();
                                      },
                                  })
                              }
                          </FilterControlTag>
                      );
                  })
                : null}
            {renderEmptyText ? <div className={b('empty-text')}>{i18n('empty-text')}</div> : null}
            {renderFiltersSelect ? (
                <FilterSelect
                    className={b('add-filter')}
                    options={filtersSelectOptions}
                    values={selectedFiltersOptions}
                    showButtonText={selectedFiltersOptions.length === 0}
                    onItemClick={handleFiltersSelectItemClick}
                />
            ) : null}
            {isEmptyFilters ? null : (
                <ClearFiltersButton onClick={() => onClearAllFilters(filtersValues)} />
            )}
        </section>
    );
}
