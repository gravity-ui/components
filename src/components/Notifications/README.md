## Notifications

Components for displaying notifications.
Can be used on desktop and touch devices.

### Simple usage example

```typescript
const YourComponent: React.FC = () => {
  const notifications = useMemo(
    () => [
      {
        id: 'minimum',
        content: <i>Bare minimum</i>,
      },
    ],
    [],
  );

  const action = useMemo(() => ({icon: Plus, text: 'Add', onClick: () => console.log('ADD')}), []);

  return (
    <Notifications
      title="Notifications"
      notifications={notifications}
      actions={<NotificationAction action={action} />}
      emptyMessage={'Unfortunately, there are no notifications for you, pal'}
    />
  );
};
```

### Components

**Notifications** — renders notifications and actions on these notifications.

| Property         | Type                  | Required | Default           | Description                                                |
| :--------------- | :-------------------- | :------: | :---------------- | :--------------------------------------------------------- |
| `notifications`  | `NotificationProps[]` |  `true`  | `false`           | Touch device (mobile) mode                                 |
| `title`          | `ReactNode`           |          | `"Notifications"` | Notifications' title                                       |
| `actions`        | `ReactNode`           |          |                   | Notifications' actions (e.g. create new, mark all as read) |
| `emptyMessage`   | `ReactNode`           |          |                   | Message for «No notifications» case                        |
| `swipeThreshold` | `number`              |          | 0.4               | A value from 0 to 1 — the more the harder to swipe         |

**Notification** — renders a notification with actions (side/bottom/swipe).

| Property       | Type                | Required | Default | Description                |
| :------------- | :------------------ | :------: | :------ | :------------------------- |
| `notification` | `NotificationProps` |  `true`  |         | The notification to render |

**NotificationProps** — notification's type:

| Property      | Type                                | Required | Default | Description                                           |
| :------------ | :---------------------------------- | :------: | :------ | :---------------------------------------------------- |
| id            | `string`                            |  `true`  |         | Unique identifier (used in `key` for example)         |
| content       | `ReactNode`                         |  `true`  |         | Notification's content (what it's about)              |
| title         | `ReactNode`                         |          |         | Notification's title (bold)                           |
| formattedDate | `ReactNode`                         |          |         | Notification's creation date (already formatted)      |
| unread        | `boolean`                           |          | `false` | Is notification unread                                |
| source        | `NotificationSourceProps`           |          |         | Notification's source (e.g. Cloud/Tracker/Console)    |
| theme         | `NotificationTheme`                 |          |         | Notification's theme (e.g. warning/danger)            |
| className     | `string`                            |          |         | Notification's `className`                            |
| sideActions   | `ReactNode`                         |          |         | Notification's actions on the right side              |
| bottomActions | `ReactNode`                         |          |         | Notification's bottom actions (as buttons by default) |
| swipeActions  | `NotificationSwipeActionsProps`     |          |         | Notification's action on left/right swipe             |
| onMouseEnter  | `MouseEventHandler<HTMLDivElement>` |          |         | Callback for `onMouseEnter`                           |
| onMouseLeave  | `MouseEventHandler<HTMLDivElement>` |          |         | Callback for `onMouseLeave`                           |
| onClick       | `MouseEventHandler<HTMLDivElement>` |          |         | Callback for `onClick`                                |

For a more detailed info on types go to [Notifications' types](https://github.com/gravity-ui/components/blob/main/src/components/Notifications/definitions.ts) and [Notification' types](https://github.com/gravity-ui/components/blob/main/src/components/Notification/definitions.ts).
