## ItemSelector

A component that allows you to form a subset of a list (e.g., a subset of columns).

### PropTypes

| Property        | Type            | Required | Default                                                  |     | Description                                                                                                                          |
| :-------------- | :-------------- | :------: | :------------------------------------------------------- | :-- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [items](#items) | `Array`         |   yes    |                                                          |     | Item list.                                                                                                                           |
| value           | `Array<string>` |   yes    |                                                          |     | A subset of the `id` list of items.                                                                                                  |
| onUpdate        | `function`      |   yes    |                                                          |     | Filter change handler (when using external sorting). `(value: Array) => void`                                                        |
| hideSelected    | `boolean`       |          | true                                                     |     | When this flag is checked, it hides already selected items from the main list.                                                       |
| selectorTitle   | `string`        |          | ''                                                       |     | Component title.                                                                                                                     |
| getItemId       | `function`      |          | `(item: any) => string`                                  |     | A callback that returns the `id` of an item if the item is complex. `(item: any) => string`                                          |
| renderItem      | `function`      |          | `(item) => getItemId(item)`                              |     | Render element in the main list ([List component documentation](https://github.com/gravity-ui/uikit/tree/main/src/components/List)). |
| filterItem      | `function`      |          | `(filter) => (item) => getItemId(item).includes(filter)` |     | Filtering items in lists ([List component documentation](https://github.com/gravity-ui/uikit/tree/main/src/components/List)).        |
| renderItemValue | `function`      |          | `(item) => getItemId(item)`                              |     | Render element view in lists.                                                                                                        |

#### Items

The item can be a string or an any object (but must be `truly`).

The `getItemId` must be specified if the items in the main list are objects and not strings.
The `renderItem` and `filterItem` can be specified if custom display and filtering are required.

```jsx
<ItemSelector
  selectorTitle="Columns"
  onUpdate={(value) => {
    this.setState({value});
  }}
  items={[
    {
      name: 'id',
      type: 'Uint32',
    },
    {
      name: 'series',
      type: 'Utf8',
    },
  ]}
  value={value}
  getItemId={(item) => item.name}
/>
```
