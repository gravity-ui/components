## FilesGallery

The component for rendering file galleries.
The component is responsible for the gallery navigation (keyboard arrows, body side click and header arrow click).
You should provide the renderers for the body and file actions, for example the copy link action and the download action.

### PropTypes

| Property                | Type                                               | Required | Values | Default | Description                                           |
| :---------------------- | :------------------------------------------------- | :------- | :----- | :------ | :---------------------------------------------------- |
| items                   | `(GalleryFileType extends GalleryFileBase)[]`      | Yes      |        |         | The gallery items list                                |
| initialItemIndex        | `Number`                                           |          |        | 0       | The initial active item index                         |
| open                    | `Boolean`                                          |          |        |         | The modal opened state                                |
| onClose                 | `() => void`                                       | Yes      |        |         | The modal close handler                               |
| renderActions           | `(activeItem: GalleryFileType) => React.ReactNode` |          |        |         | The gallery actions renderer, accepts the active item |
| renderBody              | `(activeItem: GalleryFileType) => React.ReactNode` | Yes      |        |         | The gallery body renderer, accepts the active item    |
| modalClassName          | `String`                                           |          |        |         | The modal class                                       |
| className               | `String`                                           |          |        |         | The modal content class                               |
| headerClassName         | `String`                                           |          |        |         | The gallery header class                              |
| activeItemInfoClassName | `String`                                           |          |        |         | The active item info class name                       |
| footerClassName         | `String`                                           |          |        |         | The gallery footer class                              |
| bodyClassName           | `String`                                           |          |        |         | The gallery body class                                |

### Examples

```tsx
import {
  FilesGallery,
  FilesGalleryFallbackText,
  ImageFileView,
  VideoFileView,
  DocumentFileView,
} from '@gravity-ui/components';

const FilesGalleryShowcase = () => {
  const [open, setOpen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const renderBody = React.useCallback((activeFile: GalleryFile) => {
    switch (activeFile.type) {
      case 'image': {
        return <ImageFileView src={activeFile.url} />;
      }
      case 'video': {
        return <VideoFileView src={activeFile.url} />;
      }
      case 'document': {
        return <DocumentFileView name={activeFile.data.name} src={activeFile.url} />;
      }
      case 'text': {
        return <Text variant="body-1">{activeFile.text}</Text>;
      }
      default: {
        return <FilesGalleryFallbackText />;
      }
    }
  }, []);

  const renderActions = React.useCallback((activeFile: GalleryFile) => {
    return (
      <React.Fragment>
        <CopyToClipboard text={'url' in activeFile ? activeFile.url : activeFile.text}>
          {() => (
            <div>
              <ActionTooltip title="Copy link">
                <Button
                  size="l"
                  view="flat"
                  extraProps={{
                    'aria-label': 'Copy link',
                  }}
                >
                  <Icon data={Link} />
                </Button>
              </ActionTooltip>
            </div>
          )}
        </CopyToClipboard>
        {'url' in activeFile && (
          <ActionTooltip title="Download">
            <Button
              size="l"
              view="flat"
              extraProps={{
                'aria-label': 'download',
              }}
              onClick={(event) => event.stopPropagation()}
              href={`${activeFile.url}?inline=false`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon data={ArrowDownToLine} />
            </Button>
          </ActionTooltip>
        )}
      </React.Fragment>
    );
  }, []);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <FilesGallery<GalleryFile>
        theme="dark"
        open={open}
        onClose={handleClose}
        container={container || undefined}
        items={files}
        renderBody={renderBody}
        renderActions={renderActions}
      />
    </React.Fragment>
  );
};
```
