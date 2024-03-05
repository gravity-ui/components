import React from 'react';

import {block} from '../../../../../utils/cn';

import './OnboardingMenuItemImage.scss';

const cnOnboardingMenuItemImage = block('guide-menu-item-image');

export type OnboardingMenuItemImageProps = {
    src: string;
    alt: string;
};

export const OnboardingMenuItemImage = ({src, alt}: OnboardingMenuItemImageProps) => (
    <img src={src} alt={alt} className={cnOnboardingMenuItemImage()}></img>
);

export const addImage = (src: string, alt: string) => (
    <OnboardingMenuItemImage src={src} alt={alt} />
);
