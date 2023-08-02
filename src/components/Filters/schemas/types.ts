import type {FilterControlProps} from '../components/FilterControl/FilterControl';

/**
 * Base interface for different FilterSchemas.
 * {@link https://github.com/gravity-ui/components/tree/main/src/components/Filters/Filters.tsx Filters} component might not be working
 * with your FilterSchema if it did not implement it.
 */
export interface FilterSchema<Value extends any = any, Options extends any = any> {
    /**
     * Unique filter id within Filters component instance.
     *
     * @example 'location', 'person', 'some-scope/person'
     */
    readonly id: string;

    /**
     * Filter tag display name, will be used in two places:
     * - in FiltersSelect component to add FilterTag;
     * - in FilterTag component to render title if no filterTagTitleRenderer specified.
     *
     * @example displayName = 'Location' => FilterTag renders Location.
     */
    readonly displayName: string;

    // /**
    //  * Schema type to match, might be SimpleSingleSelect/SimpleMultipleSelect/BooleanFilter/etc.
    //  */
    // readonly type: string;

    /**
     * Filter description, will be used to show Tooltip with question mark next to displayName
     * in FilterSelect component.
     */
    description?: string;

    /**
     * Property to customize FilterTag with no selected value.
     */
    emptyValueText?: React.ReactNode;

    /**
     * Initial value for implemented FilterSchema, may vary from schema to schema
     *
     * @example Some examples of specifying initialValues for different FilterSchemas:
     * ```ts
     * const singleSelectFilterSchema: FilterSchema<Array<string>> = {...properties, initialValue: []};
     *
     * const dateRangeFilterSchema: FilterSchema<{{from?: number; to?: number}}> = {...properties, initialValue: {from: undefined, to: Date.now()}};
     * ```
     */
    initialValue: Value;

    /**
     * Optional property to render FilterTagTitle based on selected value.
     * If specified, displayName property will be ignored.
     */
    filterTagTitleRenderer?: (value: Value, filterControlOptions: Options) => React.ReactNode;

    /**
     * Optional property to render custom component instead of FilterTag.
     */
    filterSwitchRenderer?: (props: FilterControlProps) => React.ReactElement;

    /**
     * Optional property to render FilterTagEditor instead of default popup.
     */
    filterControlRenderer?: (
        value: Value,
        handlers: {onClose: () => void; onSubmit: (id: string, value: any) => void},
    ) => React.ReactElement;

    /**
     * Function to render user-friendly value of the filter.
     *
     * @example for filter with following schema: FilterSchema<{ from: '2011-10-05T14:48:00.000Z', to: '2011-11-05T14:48:00.000Z' }>
     * you might want to specify renderValue as:
     * ```ts
     * function renderValue(value: Value) {
     *  return `${moment(value).format()} - ${moment(value).format()}`
     * }
     * ```
     */
    renderValue: (value: Value) => React.ReactNode;

    /**
     * Option to apply FilterTag instantly without opening FilterTagEditor,
     * might be useful for Boolean filters or to add some presets.
     */
    skipControlRenderer?: boolean;

    /**
     * Property to disable FilterTag value modification
     */
    readOnlyAfterApply?: boolean;
}
