import React from 'react';

import {block} from '../../../../utils/cn';

import './GuideMenuItemText.scss';

const cnGuideMenuItemText = block('guide-menu-item-text');

export type GuideMenuItemTextProps = {
    text: string;
};

const GuideMenuItemText = ({text}: GuideMenuItemTextProps) => (
    <span className={cnGuideMenuItemText()}>{text}</span>
);

export const addText = (text: string) => <GuideMenuItemText text={text} />;
