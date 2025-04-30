## Gallery

The base component for rendering galleries of any type of data.
The component is responsible for the gallery navigation (keyboard arrows, body side click and header arrow click).
The children of the Gallery should be an array of [GalleryItem with the required properties](#GalleryItem) for rendering the gallery item view.

### PropTypes

| Property         | Type                      | Required | Values | Default | Description                   |
| :--------------- | :------------------------ | :------- | :----- | :------ | :---------------------------- |
| initialItemIndex | `Number`                  |          |        | 0       | The initial active item index |
| open             | `Boolean`                 |          |        |         | The modal opened state        |
| onOpenChange     | `(open: boolean) => void` |          |        |         | The modal toggle handler      |
| className        | `String`                  |          |        |         | The modal class               |
| container        | `HTMLElement`             |          |        |         | The modal container           |
| emptyMessage     | `String`                  |          |        | No data | No data message               |

### GalleryItem

| Property    | Type          | Required | Values | Default | Description                                                                                      |
| :---------- | :------------ | :------- | :----- | :------ | :----------------------------------------------------------------------------------------------- |
| view        | `ReactNode`   | Yes      |        | 0       | The gallery item body (displayed in the center of the gallery)                                   |
| thumbnail   | `ReactNode`   | Yes      |        |         | The gallery item thumbnail (displayed as the preview in the footer of the gallery)               |
| name        | `ReactNode`   |          |        |         | The gallery item name info (displayed in the gallery header left side)                           |
| actions     | `ReactNode[]` |          |        |         | The array of the gallery item action buttons                                                     |
| interactive | `boolean`     |          |        |         | Provide true if the gallery item is interactive and the navigation by body click should not work |

### Default gallery item props

We export some utility functions for getting the gallery item props:

```tsx
import {
    GalleryItem,
    getGalleryItemDocument,
    getGalleryItemImage,
    getGalleryItemVideo,
} from '@gravity-ui/components';

// render the image gallery item
<GalleryItem
    key={index}
    {...getGalleryItemImage({src, name, className})}
    actions={renderActions()}
/>

// render the video gallery item
<GalleryItem
    key={index}
    {...getGalleryItemVideo({src, name, className, autoPlay, controls})}
    actions={renderActions()}
/>

// render the iframe gallery item
<GalleryItem
    key={index}
    {...getGalleryItemDocument({src, name, className})}
    actions={renderActions()}
/>
```

### Examples

#### Simple images gallery

```tsx
import * as React from 'react';

import {Button, usePortalContainer} from '@gravity-ui/uikit';
import {Gallery, GalleryItem, getGalleryItemImage} from '@gravity-ui/components';

const images = [
  'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
  'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
];

const ImagesGallery = () => {
  const [open, setOpen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <Gallery open={open} onClose={handleClose} container={container || undefined}>
        {images.map((image, index) => (
          <GalleryItem key={index} {...getGalleryItemImage({src: image, name: image})} />
        ))}
      </Gallery>
    </React.Fragment>
  );
};
```

#### Files gallery

```tsx
import * as React from 'react';

import {Button, Text, usePortalContainer, ThemeProvider} from '@gravity-ui/uikit';
import {
  FilePreview,
  Gallery,
  GalleryItem,
  GalleryProps,
  getGalleryItemDocument,
  getGalleryItemImage,
  getGalleryItemVideo,
} from '@gravity-ui/components';

const GalleryTemplate: StoryFn<GalleryProps> = () => {
  const [open, setOpen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const renderActions = React.useCallback((file: GalleryFile) => {
    const result: GalleryItemAction[] = [
      {
        id: 'clipboard',
        title: file.type === 'text' ? 'Copy text' : 'Copy link',
        icon: <Icon data={Link} />,
        render: (buttonProps) => (
          <CopyToClipboard
            onCopy={() => alert(file.type === 'text' ? 'Text copied!' : 'Link copied!')}
            text={file.type === 'text' ? file.text : file.url}
          >
            {() => (
              <div>
                <ActionTooltip title={file.type === 'text' ? 'Copy text' : 'Copy link'}>
                  <Button {...buttonProps} />
                </ActionTooltip>
              </div>
            )}
          </CopyToClipboard>
        ),
      },
    ];

    if (file.type !== 'text') {
      result.push({
        id: 'new-tab',
        title: 'Open in new tab',
        icon: <Icon data={ArrowUpRightFromSquare} />,
        href: file.url,
      });
    }

    return result;
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <ThemeProvider theme="dark">
        <Gallery open={open} onClose={handleClose} container={container || undefined}>
          {files.map((file, index) => (
            <GalleryItem
              key={index}
              {...getGalleryItemFile(file)}
              actions={renderActions()}
              interactive={file.interactive}
            />
          ))}
        </Gallery>
      </ThemeProvider>
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
      return getGalleryItemImage({src: file.url, name: file.name});
    case 'video':
      return getGalleryItemVideo({src: file.url, name: file.name});
    case 'document':
      return getGalleryItemDocument({
        src: file.url,
        file: {name: file.name, type: file.type} as File,
      });
    case 'text':
      return {
        thumbnail: <FilePreview file={{name: file.name, type: file.type} as File} hideName />,
        view: <Text variant="body-1">{file.text}</Text>,
        name: file.name,
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
    text: 'Text',
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
