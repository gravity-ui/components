<!--GITHUB_BLOCK-->

# StoreBadgeNext

<!--/GITHUB_BLOCK-->

```tsx
import {StoreBadgeNext} from '@gravity-ui/components';
```

## Description

Store Badge can be used to place links to the Google Play, AppStore app stores, AppGallery and Rustore.

### Platform

Used to select the app store: Google Play, AppStore, AppGallery and Rustore.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<StoreBadgeNext store="appstore" />
<StoreBadgeNext store="playmarket" />
<StoreBadgeNext store="huaweystore" />
<StoreBadgeNext store="rustore" />
`}
>
    <StoreBadgeNext store="appstore" />
    <StoreBadgeNext store="playmarket" />
    <StoreBadgeNext store="huaweystore" />
    <StoreBadgeNext store="rustore" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<StoreBadgeNext store="appstore" />
<StoreBadgeNext store="playmarket" />
<StoreBadgeNext store="huaweystore" />
<StoreBadgeNext store="rustore" />
```

<!--/GITHUB_BLOCK-->

### Href

Used to specify a link. Without this prop, the component works like a regular block

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<StoreBadgeNext store="appstore" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="playmarket" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="huaweystore" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="rustore" href="https://github.com/gravity-ui/components" />
`}
>
    <StoreBadgeNext store="appstore" href="https://github.com/gravity-ui/components" />
    <StoreBadgeNext store="playmarket" href="https://github.com/gravity-ui/components" />
    <StoreBadgeNext store="huaweystore" href="https://github.com/gravity-ui/components" />
    <StoreBadgeNext store="rustore" href="https://github.com/gravity-ui/components" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<StoreBadgeNext store="appstore" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="playmarket" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="huaweystore" href="https://github.com/gravity-ui/components" />
<StoreBadgeNext store="rustore" href="https://github.com/gravity-ui/components" />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                                           | Default |
| :------------- | :-------------------------------------------------------------------- | :-----: |
| **store**      | App store: `"playmarket"`, `"appstore"`, `"huaweystore"`, `"rustore"` |    -    |
| **href**       | The URL                                                               |    -    |
| **title**      | Link title                                                            |    -    |
| **target**     | Link target attribute                                                 |    -    |
| **rel**        | Link rel attribute                                                    |    -    |
| **id**         | Id attribute                                                          |    -    |
| **children**   | Child element `React.ReactNode`                                       |    -    |
| **onClick**    | Handler for onclick event `React.MouseEventHandler`                   |    -    |
| **onFocus**    | Handler for onfocus event `React.MouseEventHandler`                   |    -    |
| **onBlur**     | Handler for onblur event `React.MouseEventHandler`                    |    -    |
| **extraProps** | Extra html attributes                                                 |    -    |

<!--LANDING_BLOCK
More information about the Link component on the basis of which this component is made can be found [here](https://gravity-ui.com/components/uikit/link)
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

More information about the Link component on the basis of which this component is made can be found [here](https://preview.gravity-ui.com/uikit/?path=/docs/components-link--showcase)

<!--/GITHUB_BLOCK-->
