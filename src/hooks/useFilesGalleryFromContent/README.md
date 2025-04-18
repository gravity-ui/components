## useFilesGalleryFromContent

The hook for opening the gallery from html content with images and videos

### PropTypes

_GalleryContextProvider_:

| Property     | Type                          | Required | Values | Default | Description         |
| :----------- | :---------------------------- | :------- | :----- | :------ | :------------------ |
| theme        | `ThemeProviderProps['theme']` |          |        | `dark`  | The gallery theme   |
| className    | `String`                      |          |        |         | The modal class     |
| container    | `HTMLElement`                 |          |        |         | The modal container |
| emptyMessage | `String`                      |          |        | No data | No data message     |

_useFilesGalleryFromContent_

| Property    | Type                                 | Required | Values | Default | Description                                                                                                                 |
| :---------- | :----------------------------------- | :------- | :----- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| customFiles | `(GalleryItem & { url?: string })[]` |          |        |         | The additional files list (pass the url to be able to exclude the items from content if they are found in the custom files) |

_useFilesGalleryFromContent returns function with args_:

| Property | Type                               | Required | Values | Default | Description     |
| :------- | :--------------------------------- | :------- | :----- | :------ | :-------------- |
| event    | `React.MouseEvent<HTMLDivElement>` | Yes      |        |         | The click event |

### Usage

First you should wrap your content into the GalleryContextProvider to be able to use the hook

```tsx
import {GalleryContextProvider} from '@gravity-ui/components';

<GalleryContextProvider theme="dark" emptyMessage="Seems like your gallery is empty!">
  children
</GalleryContextProvider>;
```

Then use the hook inside your component

```tsx
import {useFilesGalleryFromContent, getGalleryItemImage} from '@gravity-ui/components';

const customImages = [
  'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
  'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
];

const customFiles = customImages.map((image) => ({
  url: image,
  ...getGalleryItemImage({src: image, name: image}),
}));

const openFilesGalleryFromContent = useFilesGalleryFromContent(customFiles);

<div>
  <img
    src="https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg"
    alt="Corgi"
  />
  <a href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    My video
  </a>
</div>;
```
