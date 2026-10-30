## useGallery

The hook for opening the gallery

### Usage

First you should wrap your content into the GalleryProvider to be able to use the hook

```tsx
import {GalleryProvider} from '@gravity-ui/components';

<GalleryProvider theme="dark" emptyMessage="Seems like your gallery is empty!">
  children
</GalleryProvider>;
```

Then use the hook inside your custom hooks or components

```tsx
import {useGallery, getGalleryItemImage} from '@gravity-ui/components';

const {openGallery} = useGallery();

const images = [
  'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
  'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
];

openGallery(
  images.map((image) => getGalleryItemImage({src: image, name: image})),
  2,
  {onOpenChange: (open) => console.log('Gallery open:', open)},
);
```

### Properties

_GalleryProvider_:

| Property     | Type                          | Required | Default   | Description         |
| :----------- | :---------------------------- | :------- | :-------- | :------------------ |
| theme        | `ThemeProviderProps['theme']` |          |           | The gallery theme   |
| className    | `String`                      |          |           | The modal class     |
| container    | `HTMLElement`                 |          |           | The modal container |
| emptyMessage | `String`                      |          | "No data" | No data message     |

_useGallery hook returns_:

| Property     | Type                                                                                           | Description                          |
| :----------- | :--------------------------------------------------------------------------------------------- | :----------------------------------- |
| openGallery  | `(items: GalleryItemProps[], initialItemIndex?: number, options?: GalleryOpenOptions) => void` | The function for opening the gallery |
| closeGallery | `() => void`                                                                                   | The function for closing the gallery |
| open         | `boolean`                                                                                      | The boolean value of gallery state   |

_openGallery function args_:

| Property         | Type                 | Required | Default | Description                     |
| :--------------- | :------------------- | :------- | :------ | :------------------------------ |
| items            | `GalleryItemProps[]` | Yes      |         | The gallery items               |
| initialItemIndex | `number`             |          | 0       | The initial item index          |
| options          | `GalleryOpenOptions` |          |         | Options for opening the gallery |

_GalleryOpenOptions_:

| Property     | Type                      | Required | Description                                     |
| :----------- | :------------------------ | :------- | :---------------------------------------------- |
| onOpenChange | `(open: boolean) => void` |          | Called with `true` on open and `false` on close |

Opening another gallery calls the previous callback with `false`, then the new
callback with `true`. Switching files does not call this callback. The gallery
stays open if the component that opened it unmounts.
