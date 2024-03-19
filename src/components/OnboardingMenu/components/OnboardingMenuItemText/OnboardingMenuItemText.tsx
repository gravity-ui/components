import React from 'react';

import {block} from '../../../utils/cn';

import './OnboardingMenutemText.scss';

const cnOnboardingMenuItemText = block('guide-menu-item-text');

export type OnboardingMenuItemTextProps = {
    text: string;
};

export const OnboardingMenuItemText = ({text}: OnboardingMenuItemTextProps) => (
    <span className={cnOnboardingMenuItemText()}>{text}</span>
);
