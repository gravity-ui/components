## Gallery

The base component for rendering galleries of any type of data.
The component is responsible for the gallery navigation (keyboard arrows, body side click and header arrow click).
The children of the Gallery should be an array of [GalleryItem with the required properties](#GalleryItem) for rendering the gallery item view.

### PropTypes

| Property         | Type                      | Required | Values | Default | Description                      |
| :--------------- | :------------------------ | :------- | :----- | :------ | :------------------------------- |
| initialItemIndex | `Number`                  |          |        | 0       | The initial active item index    |
| open             | `Boolean`                 |          |        |         | The modal opened state           |
| onOpenChange     | `(open: boolean) => void` | Yes      |        |         | The modal toggle handler         |
| fullScreen       | `Boolean`                 |          |        |         | The gallery full screen mode     |
| modalClassName   | `String`                  |          |        |         | The modal class                  |
| className        | `String`                  |          |        |         | The modal content class          |
| invertTheme      | `Boolean`                 |          |        |         | Invert the theme for the gallery |
| noItemsMessage   | `String`                  |          |        | No data | No data message                  |

### GalleryItem

| Property    | Type          | Required | Values | Default | Description                                                                                      |
| :---------- | :------------ | :------- | :----- | :------ | :----------------------------------------------------------------------------------------------- |
| view        | `ReactNode`   | Yes      |        | 0       | The gallery item body (displayed in the center of the gallery)                                   |
| thumbnail   | `ReactNode`   | Yes      |        |         | The gallery item thumbnail (displayed as the preview in the footer of the gallery)               |
| meta        | `ReactNode`   |          |        |         | The gallery item meta info (displayed in the gallery header left side)                           |
| actions     | `ReactNode[]` |          |        |         | The array of the gallery item action buttons                                                     |
| interactive | `boolean`     |          |        |         | Provide true if the gallery item is interactive and the navigation by body click should not work |

### Default actions renderers

We export some default actions renderers, you can put them to actions array in the gallery item props:

```tsx
import {FullScreenAction} from '@gravity-ui/components';

const actions: React.ReactNode[] = [
  <FullScreenAction key="full-screen" fullScreen={fullScreen} onUpdateFullScreen={setFullScreen} />,
];
```

### Default gallery item props

We export some utility functions for getting the gallery item props:

```tsx
import {
    GalleryItem,
    getDefaultGalleryItemDocument,
    getDefaultGalleryItemImage,
    getDefaultGalleryItemVideo,
} from '@gravity-ui/components';

// render the image gallery item
<GalleryItem
    key={index}
    {...getDefaultGalleryItemImage({src, name, className})}
    actions={renderActions()}
/>

// render the video gallery item
<GalleryItem
    key={index}
    {...getDefaultGalleryItemVideo({src, name, className, autoPlay, controls})}
    actions={renderActions()}
/>

// render the iframe gallery item
<GalleryItem
    key={index}
    {...getDefaultGalleryItemDocument({src, name, className})}
    actions={renderActions()}
/>
```

### Examples

#### Simple images gallery

```tsx
import * as React from 'react';

import {Button, usePortalContainer} from '@gravity-ui/uikit';
import {
  FullScreenAction,
  Gallery,
  GalleryItem,
  getDefaultGalleryItemImage,
} from '@gravity-ui/components';

const images = [
  'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
  'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
];

const ImagesGallery = () => {
  const [open, setOpen] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const renderActions = React.useCallback(() => {
    return [
      <FullScreenAction
        key="full-screen"
        fullScreen={fullScreen}
        onUpdateFullScreen={setFullScreen}
      />,
    ];
  }, [fullScreen]);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <Gallery
        open={open}
        onClose={handleClose}
        container={container || undefined}
        fullScreen={fullScreen}
      >
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            {...getDefaultGalleryItemImage({src: image, name: image})}
            actions={renderActions()}
          />
        ))}
      </Gallery>
    </React.Fragment>
  );
};
```

#### Files gallery

```tsx
import * as React from 'react';

import {Button, Text, usePortalContainer} from '@gravity-ui/uikit';
import {
  FullScreenAction,
  FilePreview,
  Gallery,
  GalleryItem,
  GalleryProps,
  getDefaultGalleryItemDocument,
  getDefaultGalleryItemImage,
  getDefaultGalleryItemVideo,
} from '@gravity-ui/components';

const FilesGalleryTemplate: StoryFn<GalleryProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const renderActions = React.useCallback(() => {
    return [
      <FullScreenAction
        key="full-screen"
        fullScreen={fullScreen}
        onUpdateFullScreen={setFullScreen}
      />,
    ];
  }, [fullScreen]);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <Gallery
        invertTheme
        open={open}
        onClose={handleClose}
        container={container || undefined}
        fullScreen={fullScreen}
      >
        {files.map((file, index) => (
          <GalleryItem
            key={index}
            {...getGalleryItemFile(file)}
            actions={renderActions()}
            interactive={file.interactive}
          />
        ))}
      </Gallery>
    </React.Fragment>
  );
};

type GalleryFile =
  | {
      name: string;
      type: 'image' | 'video' | 'document';
      url: string;
      interactive?: boolean;
    }
  | {name: string; type: 'text'; text: string; interactive?: boolean};

const getGalleryItemFile = (file: GalleryFile) => {
  switch (file.type) {
    case 'image':
      return getDefaultGalleryItemImage({src: file.url, name: file.name});
    case 'video':
      return getDefaultGalleryItemVideo({src: file.url, name: file.name});
    case 'document':
      return getDefaultGalleryItemDocument({
        src: file.url,
        file: {name: file.name, type: file.type} as File,
      });
    case 'text':
      return {
        thumbnail: <FilePreview file={{name: file.name, type: file.type} as File} hideName />,
        view: <Text variant="body-1">{file.text}</Text>,
        meta: file.name,
      };
  }
};

const files: GalleryFile[] = [
  {
    type: 'image',
    url: 'https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg',
    name: 'Corgi image',
  },
  {
    type: 'video',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    name: 'Bunny Film',
  },
  {
    type: 'text',
    text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum',
    name: 'Some text',
  },
  {
    type: 'document',
    url: 'https://preview.gravity-ui.com/icons',
    name: 'Html page',
    interactive: true,
  },
];
```
