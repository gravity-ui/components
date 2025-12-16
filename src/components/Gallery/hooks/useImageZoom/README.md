# useImageZoom

Hook for managing image zoom and pan functionality in Gallery. Automatically adapts to platform (desktop/mobile).

## Usage

```typescript
import {useImageZoom} from '@gravity-ui/components';

const {imageHandlers, setImageSize, setContainerSize, resetZoom, imageStyles, isZooming} =
  useImageZoom({disabled: false});
```

## Props

| Property | Type                      | Required | Default | Description                                                                 |
| :------- | :------------------------ | :------- | :------ | :-------------------------------------------------------------------------- |
| disabled | `boolean`                 |          | `false` | Disables zoom functionality                                                 |
| onTap    | `React.TouchEventHandler` |          |         | Custom tap handler for mobile. Called on single tap when image is zoomed in |

## Return Value

| Property         | Type                                              | Description                                                                                                 |
| :--------------- | :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| imageHandlers    | `object`                                          | Event handlers to spread on `<img>` element. Platform-specific (mouse events for desktop, touch for mobile) |
| setImageSize     | `(size: {width: number, height: number}) => void` | Set image natural dimensions (call after image load)                                                        |
| setContainerSize | `(size: {width: number, height: number}) => void` | Set container dimensions for pan constraints                                                                |
| resetZoom        | `() => void`                                      | Reset zoom to initial state (scale=1, position={0,0})                                                       |
| imageStyles      | `React.CSSProperties`                             | Styles object with cursor, transform, and transition                                                        |
| isZooming        | `boolean`                                         | `true` when user is interacting with zoom or image is zoomed (scale > 1)                                    |

## Behavior

**Desktop:**

- Click to toggle 1x ↔ 2x zoom
- Drag to pan when zoomed

**Mobile:**

- Double tap to toggle 1x ↔ 3x zoom
- Pinch to zoom (1.0 - 3.0)
- Single finger drag to pan when zoomed
- Single tap on zoomed image calls `onTap` handler (if provided)

## Example

```typescript
function ImageView({src}) {
    const imageRef = React.useRef(null);
    const containerRef = React.useRef(null);

    const {imageHandlers, setImageSize, setContainerSize, resetZoom, imageStyles} =
        useImageZoom({});

    React.useEffect(() => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.naturalWidth,
                height: imageRef.current.naturalHeight,
            });
        }
    }, [src]);

    React.useEffect(() => {
        if (containerRef.current) {
            setContainerSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        }
    }, []);

    return (
        <div ref={containerRef}>
            <img ref={imageRef} src={src} {...imageHandlers} style={imageStyles} />
        </div>
    );
}
```
