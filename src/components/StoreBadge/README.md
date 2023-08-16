<!--GITHUB_BLOCK-->

# StoreBadge

<!--/GITHUB_BLOCK-->

```tsx
import {StoreBadge} from '@gravity-ui/components';
```

## Description

Store Badge can be used to place links to the Google Play and AppStore app stores

### Platform

Used to select the app store platform: Android or iOS.

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<StoreBadge platform="android" />
<StoreBadge platform="ios" />
`}
>
    <Components.StoreBadge platform="android" />
    <Components.StoreBadge platform="ios" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<StoreBadge platform="android" />
<StoreBadge platform="ios" />
```

<!--/GITHUB_BLOCK-->

### Href

Used to specify a link. Without this prop, the component works like a regular block

<!--LANDING_BLOCK
<ExampleBlock
    code={`
<StoreBadge platform="android" href="https://github.com/gravity-ui/components" />
<StoreBadge platform="ios" href="https://github.com/gravity-ui/components" />
`}
>
    <Components.StoreBadge platform="android" href="https://github.com/gravity-ui/components" />
    <Components.StoreBadge platform="ios" href="https://github.com/gravity-ui/components" />
</ExampleBlock>
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

```tsx
<StoreBadge platform="android" href="https://github.com/gravity-ui/components" />
<StoreBadge platform="ios" href="https://github.com/gravity-ui/components" />
```

<!--/GITHUB_BLOCK-->

## Properties

| Name           | Description                                         | Default |
| :------------- | :-------------------------------------------------- | :-----: |
| **platform**   | App store platform: `"android"` or `"ios"`          |    -    |
| **href**       | The URL                                             |    -    |
| **title**      | Link title                                          |    -    |
| **target**     | Link target attribute                               |    -    |
| **rel**        | Link rel attribute                                  |    -    |
| **id**         | Id attribute                                        |    -    |
| **children**   | Child element `React.ReactNode`                     |    -    |
| **onClick**    | Handler for onclick event `React.MouseEventHandler` |    -    |
| **onFocus**    | Handler for onfocus event `React.MouseEventHandler` |    -    |
| **onBlur**     | Handler for onblur event `React.MouseEventHandler`  |    -    |
| **extraProps** | Extra html attributes                               |    -    |

<!--LANDING_BLOCK
More information about the Link component on the basis of which this component is made can be found [here](https://gravity-ui.com/components/uikit/link)
LANDING_BLOCK-->

<!--GITHUB_BLOCK-->

More information about the Link component on the basis of which this component is made can be found [here](https://preview.gravity-ui.com/uikit/?path=/docs/components-link--showcase)

<!--/GITHUB_BLOCK-->
