import React from 'react';

import {Button, Icon, IconData, Progress} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {OnboardingMenuItem} from './components/OnboardingMenuItem';
import {OnboardingMenuItemImage} from './components/OnboardingMenuItemImage';
import {OnboardingMenuItemText} from './components/OnboardingMenuItemText';
import i18n from './i18n';

import './OnboardingMenu.scss';

const cnOnboardingMenu = block('onboarding-menu');

export type OnboardingMenuProps = {
    title: React.ReactNode;
    progress: number;
    icon?: IconData;

    expanded: boolean;
    children?: React.ReactNode;

    collapseButtonText?: string;
    completeButtonText?: string;
    className?: string;

    onExpand?: (expanded: boolean) => void;
    onCompleteClick: (event: React.MouseEvent) => void;
    onCollapseClick?: (event: React.MouseEvent) => void;
};

const OnboardingMenuParent = ({
    title,
    progress,
    icon,
    expanded,
    onExpand,
    onCollapseClick,
    onCompleteClick,
    collapseButtonText,
    completeButtonText,
    className,
    children,
}: OnboardingMenuProps) => {
    const onExpandCallback = () => {
        const newExpand = !expanded;

        if (onExpand) {
            onExpand(newExpand);
        }
    };

    const onCollapseClickCallback = (event: React.MouseEvent) => {
        const newExpand = !expanded;

        if (onCollapseClick) {
            onCollapseClick(event);
        }
        if (onExpand) {
            onExpand(newExpand);
        }
    };

    return (
        <div className={cnOnboardingMenu(null, className)}>
            <div className={cnOnboardingMenu('content', {expand: expanded})}>
                <div className={cnOnboardingMenu('header', {expand: expanded})}>
                    <button
                        className={cnOnboardingMenu('title', {expand: expanded})}
                        onClick={onExpandCallback}
                        tabIndex={0}
                    >
                        {icon ? (
                            <Icon
                                data={icon}
                                width={20}
                                height={20}
                                className={cnOnboardingMenu('title-icon')}
                            />
                        ) : null}
                        {title}
                    </button>
                    <Progress
                        size={expanded ? 's' : 'xs'}
                        stack={[
                            {
                                value: progress,
                                color: 'var(--g-color-base-positive-heavy)',
                            },
                            {
                                value: 100 - progress,
                                color: 'var(--g-color-base-background)',
                            },
                        ]}
                    />
                </div>

                {expanded && (
                    <React.Fragment>
                        <div className={cnOnboardingMenu('lining')}>{children}</div>
                        <div className={cnOnboardingMenu('buttons')}>
                            <Button
                                view="normal-contrast"
                                size="m"
                                onClick={onCollapseClickCallback}
                                width="max"
                            >
                                {collapseButtonText ?? i18n('collapse')}
                            </Button>
                            <Button
                                view="outlined-contrast"
                                onClick={onCompleteClick}
                                size="m"
                                width="max"
                            >
                                {completeButtonText ?? i18n('complete')}
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

OnboardingMenuParent.displayName = 'OnboardingMenu';

export const OnboardingMenu = Object.assign(OnboardingMenuParent, {
    Item: OnboardingMenuItem,
    ItemText: OnboardingMenuItemText,
    ItemImage: OnboardingMenuItemImage,
});
