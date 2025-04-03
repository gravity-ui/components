## useGallery

The hook for opening the gallery

### PropTypes

_GalleryContextProvider_:

| Property     | Type                          | Required | Values | Default | Description         |
| :----------- | :---------------------------- | :------- | :----- | :------ | :------------------ |
| theme        | `ThemeProviderProps['theme']` |          |        | `dark`  | The gallery theme   |
| className    | `String`                      |          |        |         | The modal class     |
| container    | `HTMLElement`                 |          |        |         | The modal container |
| emptyMessage | `String`                      |          |        | No data | No data message     |

_openFilesGallery returns function with args_:

| Property         | Type            | Required | Values | Default | Description            |
| :--------------- | :-------------- | :------- | :----- | :------ | :--------------------- |
| items            | `GalleryItem[]` | Yes      |        |         | The gallery items      |
| initialItemIndex | `number`        |          |        | 0       | The initial item index |

### Usage

First you should wrap your content into the GalleryContextProvider to be able to use the hook

```tsx
import {GalleryContextProvider} from '@gravity-ui/components';

<GalleryContextProvider theme="dark" emptyMessage="Seems like your gallery is empty!">
  children
</GalleryContextProvider>;
```

Then use the hook inside your custom hooks or components

```tsx
import {useGallery, getGalleryItemImage} from '@gravity-ui/components';

const openGallery = useGallery();

const images = [
  'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
  'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
];

openGallery(
  images.map((image) => getGalleryItemImage({src: image, name: image})),
  2,
);
```
