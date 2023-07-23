## FilePreview

A component for displaying the file.

className,
file,
description,
onClick,
actions,

### PropTypes

| Property            | Type                       | Required | Default | Description                                                                                                      |
| :------------------ | :------------------------- | :------: | :------ | :--------------------------------------------------------------------------------------------------------------- |
| file                | `File`                     |   yes    |         | The File interface provides information about files and allows JavaScript in a web page to access their content. |
| previewSrc          | `string`                   |          |         | source for image preview                                                                                         |
| description         | `string`                   |          |         | Description displayed under the file name                                                                        |
| className           | `string`                   |          |         | Class name for the file container                                                                                |
| onClick             | `function`                 |          |         | Click handler for the file container                                                                             |
| [actions](#actions) | `FilePreviewActionProps[]` |          | `[]`    | Click handler for the file container                                                                             |

#### Actions

For a file, you can prescribe actions that will be visible when you hover over it.

| Property | Type       | Required | Default | Description          |
| -------- | ---------- | -------- | ------- | -------------------- |
| icon     | `String`   | yes      |         | Action icon          |
| title    | `String`   |          |         | Action hint on hover |
| onClick  | `function` |          |         | Action click handler |
| href     | `String`   |          |         | Action button href   |

```jsx

<FilePreview
  file={{name: fileType, type: fileType} as File}
  previewSrc="assets/files/first"
  actions={[
    {
      icon: linkIcon,
      title: 'open on drive',
      onClick: onFileOpen,
    },
    {
      icon: xmarkIcon,
      title: 'delete a file',
      onClick: onFileDelete,
    },
  ]}
/>
```
