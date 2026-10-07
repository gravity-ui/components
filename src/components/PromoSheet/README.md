# PromoSheet

A component for displaying a promo dialog informing the user about a new feature in the service's mobile application.

## Properties

| Name                      | Type                     | Default | Description                                   |
| :------------------------ | :----------------------- | :------ | :-------------------------------------------- |
| `title`                   | `string`                 | —       | Sheet title                                   |
| `message`                 | `string`                 | —       | Promo text                                    |
| `actionText`              | `string`                 | —       | Text of the primary action button             |
| `closeText`               | `string`                 | —       | Text of the close button                      |
| `actionHref`              | `string`                 |         | Link opened by the primary action button      |
| `imageSrc`                | `string`                 |         | Promo image URL                               |
| `imageAlt`                | `string`                 | `''`    | Promo image `alt` text                        |
| `onActionClick`           | `ButtonProps['onClick']` |         | Primary action click handler                  |
| `onClose`                 | `SheetProps['onClose']`  |         | Called when the sheet is closed               |
| `className`               | `string`                 |         | HTML `class` attribute of the sheet           |
| `contentClassName`        | `string`                 |         | HTML `class` attribute of the content block   |
| `imageContainerClassName` | `string`                 |         | HTML `class` attribute of the image container |
| `imageClassName`          | `string`                 |         | HTML `class` attribute of the image           |

## Usage

```tsx
import {PromoSheet} from '@gravity-ui/components';

<PromoSheet
  title="Try our mobile app"
  message="Manage your projects on the go."
  actionText="Download"
  closeText="Not now"
  actionHref="https://example.com/app"
  imageSrc="/promo.png"
/>;
```
