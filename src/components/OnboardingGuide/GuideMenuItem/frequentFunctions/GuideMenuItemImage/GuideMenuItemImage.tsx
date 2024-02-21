import React from 'react';

import {block} from '../../../../utils/cn';

import './GuideMenuItemImage.scss';

const cnGuideMenuItemImage = block('guide-menu-item-image');

export type GuideMenuItemImageProps = {
    link: string;
    alt: string;
};

export const GuideMenuItemImage = ({link, alt}: GuideMenuItemImageProps) => (
    <img src={link} alt={alt} className={cnGuideMenuItemImage()}></img>
);

export const addImage = (link: string, alt: string) => <GuideMenuItemImage link={link} alt={alt} />;
