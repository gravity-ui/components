## Notifications

Components for displaying notifications ([storybook](https://preview.gravity-ui.com/components/?path=/story/components-notifications--default)).
Can be used on desktop and touch devices.

### Simple usage example

```typescript
const YourComponent: React.FC = () => {
  const notifications: NotificationProps = React.useMemo(
    () => [
      {
        id: 'minimum',
        content: <i>Bare minimum</i>,
        formattedDate: '13 seconds ago',
      },
    ],
    [],
  );

  const action = React.useMemo(
    () => ({icon: Plus, text: 'Add', onClick: () => console.log('ADD')}),
    [],
  );

  return (
    // If you use Notifications inside a popup, use NotificationsPopupWrapper
    <NotificationsPopupWrapper>
      <Notifications
        title="Notifications"
        notifications={notifications}
        actions={<NotificationAction action={action} />}
        emptyMessage={'Unfortunately, there are no notifications for you, pal'}
      />
    </NotificationsPopupWrapper>
  );
};
```

For more code examples go to [Notifications.stories.tsx](https://github.com/gravity-ui/components/blob/main/src/components/Notifications/__stories__/Notifications.stories.tsx).

### Components

**Notifications** — renders notifications and actions on these notifications.

| Property                    | Type                  | Required | Default           | Description                                                                                                                                            |
| :-------------------------- | :-------------------- | :------: | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `notifications`             | `NotificationProps[]` |  `true`  |                   | List of Notifications to display. [Notification' types](https://github.com/gravity-ui/components/blob/main/src/components/Notification/definitions.ts) |
| `title`                     | `ReactNode`           |          | `"Notifications"` | Notifications' title                                                                                                                                   |
| `actions`                   | `ReactNode`           |          |                   | Notifications' actions (e.g. create new, mark all as read)                                                                                             |
| `areAllNotificationsLoaded` | `boolean`             |          | `false`           | When `true` renders a Loader instead of the notifications                                                                                              |
| `onLoadMoreNotifications`   | `() => Promise`       |          | `noop`            | Callback is called when the user scrolls to the end (so you can fetch more notifications)                                                              |
| `isLoading`                 | `boolean`             |          | `false`           | When `true` renders a Loader instead of the notifications                                                                                              |
| `errorContent`              | `ReactNode`           |          |                   | Used for the Error state (the message under the «Error»)                                                                                               |
| `errorImage`                | `ReactNode`           |          |                   | Custom image for the Error state                                                                                                                       |
| `emptyContent`              | `ReactNode`           |          |                   | Same as `errorContent`, but for the Empty state                                                                                                        |
| `emptyImage`                | `ReactNode`           |          |                   | Custom image for the Empty state                                                                                                                       |
| `swipeThreshold`            | `number`              |          | 0.4               | A value from 0 to 1 — the more the harder it is to swipe                                                                                               |

**Notification** — renders a notification with actions (side/bottom/swipe).

| Property       | Type                | Required | Default | Description                |
| :------------- | :------------------ | :------: | :------ | :------------------------- |
| `notification` | `NotificationProps` |  `true`  |         | The notification to render |

**NotificationProps** — notification's type:

| Property      | Type                            | Required | Default | Description                                                      |
| :------------ | :------------------------------ | :------: | :------ | :--------------------------------------------------------------- |
| id            | `string`                        |  `true`  |         | Unique identifier (used in `key` for example)                    |
| content       | `ReactNode`                     |  `true`  |         | Notification's content (what it's about)                         |
| title         | `ReactNode`                     |          |         | Notification's title (bold)                                      |
| formattedDate | `ReactNode`                     |          |         | Notification's creation date (already formatted)                 |
| unread        | `boolean`                       |          | `false` | Is notification unread                                           |
| archived      | `boolean`                       |          | `false` | Is notification archived (invisible to the user)                 |
| source        | `NotificationSourceProps`       |          |         | Notification's source (e.g. Cloud/Tracker/Console)               |
| theme         | `NotificationTheme`             |          |         | Notification's theme (e.g. warning/danger)                       |
| className     | `string`                        |          |         | Notification's `className`                                       |
| sideActions   | `ReactNode`                     |          |         | Notification's actions on the right side                         |
| bottomActions | `ReactNode`                     |          |         | Notification's bottom actions (as buttons by default)            |
| swipeActions  | `NotificationSwipeActionsProps` |          |         | Notification's action on left/right swipe (mobile mode required) |
| onMouseEnter  | `MouseEventHandler`             |          |         | Callback for `onMouseEnter`                                      |
| onMouseLeave  | `MouseEventHandler`             |          |         | Callback for `onMouseLeave`                                      |
| onClick       | `MouseEventHandler`             |          |         | Callback for `onClick`                                           |

For a more detailed info on types go to [Notifications' types](https://github.com/gravity-ui/components/blob/main/src/components/Notifications/definitions.ts) and [Notification' types](https://github.com/gravity-ui/components/blob/main/src/components/Notification/definitions.ts).
