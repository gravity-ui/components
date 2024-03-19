## OnboardingMenu

A component for managing [onboarding presets](https://github.com/gravity-ui/onboarding) ([storybook](https://preview.gravity-ui.com/components/?path=/story/components-onboardingmenu--default)).

## Props

```ts
type OnboardingMenuProps = {
  /** title of onboarding menu */
  title: React.ReactNode;
  /** number of presets passed. Changes the progress bar */
  progress: number;
  /** icon of onboarding menu */
  icon?: IconData;

  /** the default component is expand or collapsed */
  defaultExpanded: boolean;
  /** menu items*/
  children?: React.ReactNode;

  collapseButtonText?: string;
  completeButtonText?: string;
  className?: string;

  onExpand?: (expanded: boolean) => void;
  onCompleteClick: (event: React.MouseEvent) => void;
  onCollapseClick?: (event: React.MouseEvent) => void;
};

type OnboardingMenuItemProps = {
  title: string;
  /** affects the item icon */
  status?: 'completed' | 'pending';
  children?: React.ReactNode;
  buttons?: React.ReactNode;
  /** usually the last element does not need a divider, then you need to pass false */
  hasDivider?: boolean;
  loading?: boolean;
};

type OnboardingMenuItemImageProps = {
  src: string;
  alt: string;
};

type OnboardingMenuItemTextProps = {
  text: string;
};
```
