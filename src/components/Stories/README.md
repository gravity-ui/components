# Stories

Component for displaying stories. It looks like a carousel in a modal with given places to display text and media.

## Properties

`onClose(event?, reason?)` uses UIKit 8 reasons: `escape-key`, `outside-press`, or `click` for the close button. Assistive-technology dismissal may omit the event or reason.

| Property               | Type            | Required | Default | Description                                       |
| :--------------------- | :-------------- | :------- | :------ | :------------------------------------------------ |
| open                   | `Boolean`       | ✓        |         | Visibility flag                                   |
| items                  | `StoriesItem[]` | ✓        |         | List of stories to display                        |
| autoPlay               | `Boolean`       |          | false   | Automatically advance and show segmented progress |
| autoPlayInterval       | `Number`        |          | 5000    | Time per slide in milliseconds                    |
| initialStoryIndex      | `Number`        |          | 0       | Index of the first story to be displayed          |
| resetStoryIndexOnClose | `Boolean`       |          | false   | If `true`, reset story index to initialStoryIndex |
| onClose                | `Function`      |          |         | Action on close                                   |
| onPreviousClick        | `Function`      |          |         | Action when switching to previous story           |
| onNextClick            | `Function`      |          |         | Action when switching to next story               |
| disableOutsideClick    | `Boolean`       |          | true    | If `true`, do not close stories on click outside  |
| className              | `string`        |          |         | Stories modal class                               |

## Automatic playback

Set `autoPlay` to show segmented progress indicators and automatically advance every
`autoPlayInterval` milliseconds (5000 by default). Autoplay is disabled by default.
When enabled, the numeric counter is replaced by segmented progress indicators;
manual navigation remains available. A non-positive or non-finite interval also
disables autoplay.

Playback pauses while the browser tab is hidden and resumes with the remaining time. Navigating to another slide, changing the interval, or reopening
the modal starts a full interval. After the last slide's progress fills, the modal
stays open. The same timing applies to images and videos, independently of video length.
`onNextClick` is called on automatic transitions as well as manual next navigation.

`StoriesItem.progressColor` controls the indicators independently of text colors.
`textColorStyles.counterColor` only styles the numeric counter and does not affect
the progress indicators.
Use a CSS color for both themes, or `{light, dark}` to configure them separately
(high-contrast themes use the corresponding light/dark color). Unspecified colors
fall back to `--g-color-line-generic-active`. Unfilled segments use 30% opacity.

**Accessibility:** Autoplay does not pause on hover, keyboard focus, or pointer hold,
and there is no built-in pause/resume control. A slide can advance before a user
finishes reading it or interacting with its content, including when using a screen
reader. If your application enables autoplay, provide an accessible way for users
to disable it, for example by setting `autoPlay` to `false` through a user-facing
control. Pausing while the browser tab is hidden does not address this limitation.

```tsx
<Stories
  open={open}
  onClose={onClose}
  autoPlay
  autoPlayInterval={7000}
  items={items.map((item) => ({
    ...item,
    progressColor: {light: '#252525', dark: '#ffffff'},
  }))}
/>
```

### StoriesItem object

| Field           | Type                                        | Required | Default | Description                                    |
| --------------- | ------------------------------------------- | -------- | ------- | ---------------------------------------------- |
| title           | `String`                                    |          |         | Title                                          |
| content         | `React.ReactNode`                           |          |         | Main content                                   |
| url             | `String`                                    |          |         | Link to display more information               |
| media           | `StoriesItemMedia`                          |          |         | Media content                                  |
| firstAction     | `ButtonProps`                               |          |         | Custom action button props                     |
| secondAction    | `ButtonProps`                               |          |         | Custom action button props                     |
| textBlockStyle  | `StoriesTextBlockStyle`                     | ✓        |         | Props for styling text content in Story        |
| mediaBlockStyle | `StoriesMediaBlockStyle`                    | ✓        |         | Props for styling media content in Story       |
| progressColor   | `String \| {light?: string; dark?: string}` |          |         | Progress indicator color, optionally per theme |
| textColorStyles | `StoriesItemTextStyles`                     |          |         | Props for styling text color in Story          |

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
