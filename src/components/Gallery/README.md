## Gallery

The base component for rendering galleries of any type of data.
The component is responsible for the gallery navigation (keyboard arrows, body side click and header arrow click).
You should provide the renderers for the body, actions and the previews.

### PropTypes

| Property                | Type                                                     | Required | Values | Default | Description                                                                                                            |
| :---------------------- | :------------------------------------------------------- | :------- | :----- | :------ | :--------------------------------------------------------------------------------------------------------------------- |
| items                   | `ItemType[]`                                             | Yes      |        |         | The gallery items list                                                                                                 |
| initialItemIndex        | `Number`                                                 |          |        | 0       | The initial active item index                                                                                          |
| open                    | `Boolean`                                                |          |        |         | The modal opened state                                                                                                 |
| onClose                 | `() => void`                                             | Yes      |        |         | The modal close handler                                                                                                |
| fullScreen              | `Boolean`                                                |          |        |         | The gallery full screen mode                                                                                           |
| renderActions           | `(activeItem: ItemType) => React.ReactNode`              |          |        |         | The gallery actions renderer, accepts the active item                                                                  |
| renderItemPreview       | `(item: ItemType, selected: boolean) => React.ReactNode` | Yes      |        |         | The gallery item preview renderer, accepts the item and it's selected state (the previews are displayed in the footer) |
| renderActiveItemInfo    | `(activeItem: ItemType) => React.ReactNode`              |          |        |         | The gallery active item info renderer, accepts the active item (the info is displayed in the header left side)         |
| renderBody              | `(activeItem: ItemType) => React.ReactNode`              | Yes      |        |         | The gallery body renderer, accepts the active item                                                                     |
| modalClassName          | `String`                                                 |          |        |         | The modal class                                                                                                        |
| className               | `String`                                                 |          |        |         | The modal content class                                                                                                |
| headerClassName         | `String`                                                 |          |        |         | The gallery header class                                                                                               |
| activeItemInfoClassName | `String`                                                 |          |        |         | The active item info class name                                                                                        |
| footerClassName         | `String`                                                 |          |        |         | The gallery footer class                                                                                               |
| bodyClassName           | `String`                                                 |          |        |         | The gallery body class                                                                                                 |

### Examples

```tsx
const ImagesGallery: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);

  const container = usePortalContainer();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleSwitchFullScreenMode = React.useCallback(() => {
    setFullScreen((value) => !value);
  }, []);

  const renderBody = React.useCallback((activeImage: string) => {
    return <img src={activeImage} alt="" className={b('view', {type: 'image'})} />;
  }, []);

  const renderItemPreview = React.useCallback((image: string) => {
    return <img src={image} alt="" className={b('preview-item')} />;
  }, []);

  const renderActiveItemInfo = React.useCallback((image: string) => {
    return (
      <Text className={b('active-item-info-text')} variant="body-1" whiteSpace="nowrap">
        {image}
      </Text>
    );
  }, []);

  const renderActions = React.useCallback(() => {
    return (
      <React.Fragment>
        <Button
          size="l"
          view="flat"
          onClick={handleSwitchFullScreenMode}
          extraProps={{
            'aria-label': fullScreen ? 'Exit full screen' : 'Activate full screen',
          }}
        >
          <Icon data={fullScreen ? ChevronsCollapseUpRight : ChevronsExpandUpRight} />
        </Button>
      </React.Fragment>
    );
  }, [fullScreen, handleSwitchFullScreenMode]);

  React.useEffect(() => {
    if (!fullScreen) {
      return;
    }

    // close full screen mode by esc keyup
    const handleCloseFullScreen = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullScreen(false);
      }
    };

    document.addEventListener('keyup', handleCloseFullScreen);

    return () => {
      document.removeEventListener('keyup', handleCloseFullScreen);
    };
  }, [fullScreen]);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} view="action" size="l">
        Open gallery
      </Button>
      <Gallery<string>
        theme="dark"
        open={open}
        onClose={handleClose}
        container={container || undefined}
        items={images}
        renderBody={renderBody}
        renderItemPreview={renderItemPreview}
        fullScreen={fullScreen}
        renderActions={renderActions}
        renderActiveItemInfo={renderActiveItemInfo}
        activeItemInfoClassName={b('active-item-info')}
      />
    </React.Fragment>
  );
};
```
