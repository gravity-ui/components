import React from 'react';

import {block} from '../../../../../utils/cn';

import './OnboardingMenutemText.scss';

const cnOnboardingMenuItemText = block('guide-menu-item-text');

export type OnboardingMenuItemTextProps = {
    text: string;
};

const OnboardingMenuItemText = ({text}: OnboardingMenuItemTextProps) => (
    <span className={cnOnboardingMenuItemText()}>{text}</span>
);

export const addText = (text: string) => <OnboardingMenuItemText text={text} />;
