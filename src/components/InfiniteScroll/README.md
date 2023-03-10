## InfiniteScroll

The component is useful for creating infinite lists like Social Network Feed, or events history. It renders its children. If you scroll it to the bottom, it will show a loader and call an `onActivate` callback. When all the data is loaded and there is no need to load more, pass the `disabled={true}` property.

### InfiniteScroll PropTypes

| Property   | Type                  | Required | Default               | Description                                                                    |
| :--------- | :-------------------- | :------: | :-------------------- | :----------------------------------------------------------------------------- |
| onActivate | `() => Promise<void>` |  `true`  |                       | When called shows loader and wait till the promise is fulfilled to hide loader |
| disabled   | `Boolean`             |  `true`  |                       | Turn off activation                                                            |
| loader     | `ReactNode`           | `false`  | `<Loader size="l" />` | Custom loader component                                                        |

### Example

```jsx
const {data, fetchNextPage} = useFeedQuery();
const isAllPostsShown = data.posts.length === data.total;

<InfiniteScroll onActivate={fetchNextPage} disabled={isAllPostsShown}>
  {data.posts.map((post) => (
    <Post key={post.id} post={post} />
  ))}
</InfiniteScroll>;
```
