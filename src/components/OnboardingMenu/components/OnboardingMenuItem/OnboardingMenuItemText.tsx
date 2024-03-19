import React from 'react';

import {block} from '../../../utils/cn';

import './OnboardingMenuItem.scss';

const cnOnboardingMenuItem = block('onboarding-menu-item');

export type OnboardingMenuItemTextProps = {
    text: string;
};

export const OnboardingMenuItemText = ({text}: OnboardingMenuItemTextProps) => (
    <span className={cnOnboardingMenuItem('text')}>{text}</span>
);
