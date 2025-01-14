## Stories

Component for displaying stories. It looks like a carousel in a modal with given places to display text and media.

### PropTypes

| Property            | Type            | Required | Default | Description                                      |
| :------------------ | :-------------- | :------- | :------ | :----------------------------------------------- |
| open                | `Boolean`       | ✓        |         | Visibility flag                                  |
| items               | `StoriesItem[]` | ✓        |         | List of stories to display                       |
| initialStoryIndex   | `Number`        |          | 0       | Index of the first story to be displayed         |
| onClose             | `Function`      |          |         | Action on close                                  |
| onPreviousClick     | `Function`      |          |         | Action when switching to previous story          |
| onNextClick         | `Function`      |          |         | Action when switching to next story              |
| disableOutsideClick | `Boolean`       |          | true    | If `true`, do not close stories on click outside |
| className           | `string`        |          |         | Stories modal class                              |

### StoriesItem object

| Field           | Type                     | Required | Default | Description                              |
| --------------- | ------------------------ | -------- | ------- | ---------------------------------------- |
| title           | `String`                 |          |         | Title                                    |
| content         | `React.ReactNode`        |          |         | Main content                             |
| url             | `String`                 |          |         | Link to display more information         |
| media           | `StoriesItemMedia`       |          |         | Media content                            |
| firstAction     | `ButtonProps`            |          |         | Custom action button props               |
| secondAction    | `ButtonProps`            |          |         | Custom action button props               |
| textBlockStyle  | `StoriesTextBlockStyle`  | ✓        |         | Props for styling text content in Story  |
| mediaBlockStyle | `StoriesMediaBlockStyle` | ✓        |         | Props for styling media content in Story |
| textColorStyles | `StoriesItemTextStyles`  |          |         | Props for styling text color in Story    |

### StoriesItemMedia object

| Field     | Type     | Required | Default | Description                                        |
| --------- | -------- | -------- | ------- | -------------------------------------------------- |
| type      | `String` | ✓        |         | Content type (`image` or `video`)                  |
| url       | `String` | ✓        |         | File link                                          |
| url2x     | `String` |          |         | File link for Retina display (only used for image) |
| posterUrl | `String` |          |         | Poster URL (only used for video)                   |

### StoriesItemTextStyles object

| Field            | Type     | Required | Default | Description                      |
| ---------------- | -------- | -------- | ------- | -------------------------------- |
| titleColor       | `String` |          |         | Apply color to Story title       |
| descriptionColor | `String` |          |         | Apply color to Story description |
| counterColor     | `String` |          |         | Apply color to Story counter     |

#### Usage example

```jsx harmony
<Stories
  open
  items={[
    {
      title: 'Story title',
      description: 'Story text',
      type: 'image',
      media: {
        url: 'https://storage.yandexcloud.net/uikit-storybook-assets/story-picture-2.png',
      },
    },
  ]}
/>
```
