## Gallery

The base component for rendering galleries of any type of data.
The component is responsible for the gallery navigation (keyboard arrows, body side click and header arrow click).
The children of the Gallery should be an array of [GalleryItem with the required properties](#GalleryItem) for rendering the gallery item view.

### Features

- **Navigation**: Keyboard arrows, body side click, and header arrow click
- **Image Zoom**: Built-in zoom and pan functionality for images (desktop and mobile)
- **Swipe Gestures**: Mobile swipe navigation (automatically disabled during zoom interaction)
- **Fullscreen Mode**: Toggle fullscreen view
- **Custom Actions**: Add custom action buttons for each gallery item
- **Inline View**: Render the gallery in place within its parent instead of in a modal overlay
- **Controlled Index**: Drive the active item index from outside via `activeItemIndex` / `onActiveItemIndexChange`

### PropTypes

| Property                | Type                      | Required | Values           | Default | Description                                   |
| :---------------------- | :------------------------ | :------- | :--------------- | :------ | :-------------------------------------------- |
| initialItemIndex        | `Number`                  |          |                  | 0       | The initial active item index (uncontrolled)  |
| activeItemIndex         | `Number`                  |          |                  |         | Controlled active item index.                 |
| onActiveItemIndexChange | `(index: number) => void` |          |                  |         | Called with the next index navigation happens |
| view                    | `String`                  |          | `modal` `inline` | modal   | Render in a modal overlay                     |
| className               | `String`                  |          |                  |         | The root class                                |
| emptyMessage            | `String`                  |          |                  | No data | No data message                               |
| open                    | `Boolean`                 |          |                  |         | `modal` only. The modal opened state          |
| onOpenChange            | `(open: boolean) => void` |          |                  |         | `modal` only. The modal toggle handler        |
| container               | `HTMLElement`             |          |                  |         | `modal` only. The modal container             |

### GalleryItem

| Property    | Type          | Required | Values | Default | Description                                                                                      |
| :---------- | :------------ | :------- | :----- | :------ | :----------------------------------------------------------------------------------------------- |
| id          | `String`      |          |        |         | Stable identity of the item                                                                      |
| view        | `ReactNode`   | Yes      |        | 0       | The gallery item body (displayed in the center of the gallery)                                   |
| thumbnail   | `ReactNode`   | Yes      |        |         | The gallery item thumbnail (displayed as the preview in the footer of the gallery)               |
| name        | `ReactNode`   |          |        |         | The gallery item name info (displayed in the gallery header left side)                           |
| actions     | `ReactNode[]` |          |        |         | The array of the gallery item action buttons                                                     |
| interactive | `boolean`     |          |        |         | Provide true if the gallery item is interactive and the navigation by body click should not work |

### Image Zoom

Gallery includes built-in zoom functionality for images via the [`useImageZoom`](./hooks/useImageZoom/README.md) hook:

**Desktop:**

- Click to toggle 1x ↔ 2x zoom
- Drag to pan when zoomed

**Mobile:**

- Double tap to toggle 1x ↔ 3x zoom
- Pinch to zoom (1.0 - 3.0)
- Single finger drag to pan when zoomed
- Swipe gestures automatically disabled during zoom interaction

See [`useImageZoom` documentation](./hooks/useImageZoom/README.md) for more details.

### Inline view

Pass `view="inline"` to render the gallery in place instead of a `modal`. It fills its parent
without imposing any `position`, so give that parent a resolvable size. `open` / `onOpenChange` /
`container` don't apply and there is no built-in close button — the parent controls visibility by
unmounting. For an in-header dismiss control, add it as a `GalleryItem` action.

```tsx
<div style={{width: '100%', maxWidth: 640, aspectRatio: '16 / 10', overflow: 'hidden'}}>
  <Gallery view="inline">
    <GalleryItem
      {...itemProps}
      actions={[{id: 'close', title: 'Close', icon: <Icon data={Xmark} />, onClick: onClose}]}
    />
  </Gallery>
</div>
```

### Controlled active item index

The index is uncontrolled by default (seeded by `initialItemIndex`). Pass `activeItemIndex` +
`onActiveItemIndexChange` to control it — the index is positional, so when items are added/removed
it's up to the parent to remap `activeItemIndex` to the item it wants to keep active. Giving each
`GalleryItem` a stable `id` keeps its preview reconciled by identity across such changes.

```tsx
<Gallery
  activeItemIndex={index}
  onActiveItemIndexChange={setIndex}
  open={open}
  onOpenChange={setOpen}
>
  {items.map((item) => (
    <GalleryItem key={item.id} id={item.id} {...getGalleryItemImage({src: item.src})} />
  ))}
</Gallery>
```

### Gallery Context

Gallery provides a context for child views to communicate interaction state. See [`GalleryContext` documentation](./contexts/README.md) for details.

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

// you can use the pre-defined file actions (copy and download)
<GalleryItem
    key={index}
    {...getGalleryItemImage({src, name, className})}
    actions={[
        getGalleryItemCopyLinkAction({
            copyUrl: 'https://example.jpg',
            onCopy: () => console.log('link copied'),
        }),
        getGalleryItemDownloadAction({
            downloadUrl:  'https://example.jpg',
            onClick: () => console.log('download action clicked'),
        }),
    ]}
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

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <Gallery open={open} onOpenChange={setOpen} container={container || undefined}>
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
        <Gallery open={open} onOpenChange={setOpen} container={container || undefined}>
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
    url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
    name: 'Video',
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
