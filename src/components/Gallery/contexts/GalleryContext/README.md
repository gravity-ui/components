# GalleryContext

React context for communication between Gallery and its child views (like ImageView). Provides callbacks for view interaction events.

## Usage

```typescript
import {useGalleryContext} from '@gravity-ui/components';

function ImageView() {
  const {onViewInteractionChange, onTap} = useGalleryContext();

  React.useEffect(() => {
    onViewInteractionChange(isInteracting);
  }, [isInteracting, onViewInteractionChange]);
}
```

## Context Value

| Property                | Type                               | Description                                                                                                                                                                                                    |
| :---------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onViewInteractionChange | `(isInteracting: boolean) => void` | Callback to notify Gallery about view interaction state changes. Called when user starts/stops interacting with the current view (e.g., zooming an image). Gallery uses this to disable/enable swipe gestures. |
| onTap                   | `React.TouchEventHandler`          | Tap handler for mobile views. Called on single tap when view is in interactive state (e.g., image is zoomed). Used to toggle UI visibility or perform custom actions.                                          |

## Example

```typescript
import {useGalleryContext} from '@gravity-ui/components';
import {useImageZoom} from '@gravity-ui/components';

function ImageView({src}) {
    const {onViewInteractionChange, onTap} = useGalleryContext();
    const {imageHandlers, imageStyles, isZooming} = useImageZoom({onTap});

    // Notify Gallery when zoom state changes
    React.useEffect(() => {
        onViewInteractionChange(isZooming);
    }, [isZooming, onViewInteractionChange]);

    return <img src={src} {...imageHandlers} style={imageStyles} />;
}
```

## Integration

The context is automatically provided by the Gallery component. Child views can access it using `useGalleryContext()` hook.

When `onViewInteractionChange(true)` is called:

- Gallery disables swipe gestures for navigation
- User can interact with the view without triggering navigation

When `onViewInteractionChange(false)` is called:

- Gallery re-enables swipe gestures
- User can swipe to navigate between items
