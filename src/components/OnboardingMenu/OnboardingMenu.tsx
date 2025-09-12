import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, IconData, Progress, Text} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {OnboardingMenuItem} from './components/OnboardingMenuItem';
import {OnboardingMenuItemImage} from './components/OnboardingMenuItemImage';
import {OnboardingMenuItemText} from './components/OnboardingMenuItemText';
import {i18n} from './i18n';

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
    liningClassName?: string;
    withCloseButton?: boolean;

    onExpand?: (expanded: boolean) => void;
    onCompleteClick: (event: React.MouseEvent) => void;
    onCollapseClick?: (event: React.MouseEvent) => void;
    onCloseClick?: (event: React.MouseEvent) => void;
};

const OnboardingMenuParent = ({
    title,
    progress,
    icon,
    expanded,
    onExpand,
    withCloseButton,
    onCloseClick,
    onCollapseClick,
    onCompleteClick,
    collapseButtonText,
    completeButtonText,
    className,
    liningClassName,
    children,
}: OnboardingMenuProps) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const onMouseEnter = React.useCallback(() => {
        if (withCloseButton) {
            setIsHovered(true);
        }
    }, [withCloseButton, setIsHovered]);

    const onMouseLeave = React.useCallback(() => {
        if (withCloseButton) {
            setIsHovered(false);
        }
    }, [withCloseButton, setIsHovered]);

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
        <div
            className={cnOnboardingMenu(null, className)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {!expanded && withCloseButton && isHovered && (
                <Button
                    className={cnOnboardingMenu('close-button')}
                    view="raised"
                    size="xs"
                    pin="circle-circle"
                    onClick={onCloseClick}
                >
                    <Icon data={Xmark} size={12} />
                </Button>
            )}
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
                        <Text
                            variant={expanded ? 'subheader-3' : 'subheader-2'}
                            ellipsisLines={3}
                            className={cnOnboardingMenu('title-text')}
                        >
                            {title}
                        </Text>
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
                        <div className={cnOnboardingMenu('lining', liningClassName)}>
                            {children}
                        </div>
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
