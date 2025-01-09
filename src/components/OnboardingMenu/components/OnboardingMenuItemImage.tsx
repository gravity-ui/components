import {block} from '../../utils/cn';

import './OnboardingMenuItem.scss';

const cnOnboardingMenuItem = block('onboarding-menu-item');

export type OnboardingMenuItemImageProps = {
    src: string;
    alt: string;
};

export const OnboardingMenuItemImage = ({src, alt}: OnboardingMenuItemImageProps) => (
    <img src={src} alt={alt} className={cnOnboardingMenuItem('image')}></img>
);
