# [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/components/?path=/story/components-filters-unstable--default)

# Filters

Flexible filters component with a set of predefined schemas to speed up your development.

## Usage

There are two ways to use `<Filters />` component:

- There is built-in `useFilters` hook that returns handlers required by `Filters` component, this will work fine if your filters work/live
  during one session and you do not need to store values outside of your React application;
- If you need to add custom logic around applying/removing filters values (e.g. sync with localStorage), it is recommended to write custom
  `handleRemoveFilterValue`, `handleChangeFilterValue` and `handleClearAllFilters` and pass them to `Filters` components.

There are code examples below for both approaches.

## Props

| Property                | Type                                       | Required | Default value | Description                                                                                                               |
| :---------------------- | :----------------------------------------- | :------: | :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| schema                  | [FilterSchema](./schemas/types.ts)         |   true   |               | Object with filterId as key and filter schema as value                                                                    |
| values                  | [FiltersValue](./Filters.tsx#17)           |   true   |               | Object with filterId as key and filter value as value, e.g. `{location: ['Moscow', 'London'], author: ['Max', 'Travis']}` |
| handleChangeFilterValue | `(id: string, value: FilterValue) => void` |   true   |               | Called after user selects filters from FiltersSelect or applies value directly from FilterControl                         |
| handleRemoveFilterValue | `(id: string, value: FilterValue) => void` |   true   |               | Called after user removes filter (Clicks X sign in default FilterControl implementation)                                  |
| handleClearAllFilters   | `(values: FiltersValues) => void`          |   true   |               | Called after user clicks Reset button                                                                                     |
| className               | string                                     |  false   | undefined     | ClassName to be passed to <section></section> wrapper                                                                     |
| showEmptyText           | boolean                                    |  false   | false         | Defines if `No filters applied` text should be displayed or not                                                           |
| initialOpenFilterKey    | string                                     |  false   | undefined     | Defines filter id that will be opened at first render                                                                     |

## Code examples

### Example with two filters without async data loading: month selection and location (built-in react hook).

```tsx harmony
import {
  Filters,
  useFilters,
  createSimpleMultipleSelectFilter,
  createSimpleSingleSelectFilter,
} from '@gravity-ui/components';

const monthFilterId = 'month';

const monthFilterSchema = createSimpleMultipleSelectFilter(
  /** filter id */ monthFilterId,
  /** display name */ 'Month',
  {
    /** hardcoded set of properties - could be retrieved from some endpoints */
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
  },
);

const locationFilterId = 'location';

const locationFilterSchema = createSimpleSingleSelectFilter(locationFilterId, 'Location', {
  filterOptions: [
    {value: 'location_inside', label: 'Inside'},
    {value: 'location_outside', label: 'Outside'},
  ],
});

const filtersSchemas = {
  [monthFilterId]: monthFilterSchema,
  [locationFilterId]: locationFilterSchema,
};

const initialFiltersValues = {
  [monthFilterId]: ['month_january'],
};

function App() {
  const filtersApi = useFilters(initialFiltersValues);

  return <Filters {...filtersApi} schema={filtersSchemas} />;
}
```

### Example with two filters without async data loading: month selection and location (custom state management/handlers).

```tsx harmony
import {
  Filters,
  createSimpleMultipleSelectFilter,
  createSimpleSingleSelectFilter,
} from '@gravity-ui/components';

import fakeAnalyticsService from 'fake-analytics-service';

const monthFilterId = 'month';

const monthFilterSchema = createSimpleMultipleSelectFilter(
  /** filter id */ monthFilterId,
  /** display name */ 'Month',
  {
    /** hardcoded set of properties - could be retrieved from some endpoints */
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
  },
);

const locationFilterId = 'location';

const locationFilterSchema = createSimpleSingleSelectFilter(locationFilterId, 'Location', {
  filterOptions: [
    {value: 'location_inside', label: 'Inside'},
    {value: 'location_outside', label: 'Outside'},
  ],
});

const filtersSchemas = {
  [monthFilterId]: monthFilterSchema,
  [locationFilterId]: locationFilterSchema,
};

const initialFiltersValues = {
  [monthFilterId]: ['month_january'],
};

function App() {
  // React.useState as "external store", this could be localStorage/sessionStorage, or anything else
  const [filtersValues, setFiltersValues] =
    React.useState<Record<string, any>>(initialFiltersValues);

  const handleChangeFilterValue = (id: string, value: any) => {
    // Any side-effect here
    // fakeAnalyticsService({filterId: id, filterValue: value});
    setFiltersValues((currValue) => ({...currValue, [id]: value}));
  };

  const handleRemoveFilterValue = (id: string, _value: any) => {
    setFiltersValues((currValue) => {
      const nextValue = {...currValue};

      delete nextValue[id];

      return nextValue;
    });
  };

  const handleResetFiltersValues = (_values: any) => {
    setFiltersValues({});
  };

  return (
    <Filters
      schema={filtersSchemas}
      filtersValues={filtersValues}
      onFilterValueChange={handleChangeFilterValue}
      onFilterValueRemove={onFilterValueRemove}
      onFiltersValuesReset={handleResetFiltersValues}
    />
  );
}
```

## FAQ

### How do I implement a custom filter?

Filters component will work with custom filters if they implement [FilterSchema](./schemas/types.ts) implement.
_By the way, consider adding your custom schema right to the source code, other people might find it useful! :)_

### Mobile/tablet devices

`Filters` component is compatible with mobile/tablet devices by default.
It utilizes [@gravity-ui](https://github.com/gravity-ui/uikit/blob/main/src/components/mobile/useMobile.ts#L6) approach to work with `MobileContext`. It takes boolean flag `mobile` from `MobileContext`, therefore in order to make Filters component work with mobile devices in your app you need to wrap in into [MobileContext](https://github.com/gravity-ui/uikit/blob/main/src/components/mobile/MobileContext.ts#L35). **Note: MobileContext does not contain any logic related to defining whether current user device is mobile/tablet/desktop, you need to implement it in your application.**
