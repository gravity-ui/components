import React from 'react';

import {Button, Icon, IconData, Progress} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n';

import './OnboardingMenu.scss';

const cnOnboardingMenu = block('guide');

export type OnboardingMenuProps = {
    title: React.ReactNode;
    progress: number;
    icon?: IconData;

    defaultExpanded: boolean;
    children?: React.ReactNode;

    rollUpButtonText?: string;
    completeButtonText?: string;

    onExpand?: (expanded: boolean) => void;
    onCompleteClick: () => void;
    onRollUpClick?: (event: React.MouseEvent) => void;
};

export const OnboardingMenu = ({
    title,
    progress,
    icon,
    defaultExpanded,
    onExpand,
    onRollUpClick,
    onCompleteClick,
    rollUpButtonText,
    completeButtonText,
    children,
}: OnboardingMenuProps) => {
    const [expand, setExpand] = React.useState(defaultExpanded);

    const onExpandCallback = () => {
        const newExpand = !expand;

        setExpand(newExpand);
        if (onExpand) {
            onExpand(newExpand);
        }
    };

    const onRollUpClickCallback = (event: React.MouseEvent) => {
        const newExpand = !expand;

        setExpand(newExpand);
        if (onRollUpClick) {
            onRollUpClick(event);
        }
        if (onExpand) {
            onExpand(newExpand);
        }
    };

    return (
        <div className={cnOnboardingMenu({expand: expand})}>
            <div className={cnOnboardingMenu('content', {expand: expand})}>
                <div className={cnOnboardingMenu('header', {expand: expand})}>
                    <button
                        className={cnOnboardingMenu('title', {expand: expand})}
                        onClick={onExpandCallback}
                        tabIndex={0}
                    >
                        {icon ? (
                            <Icon
                                data={icon}
                                width={20}
                                height={20}
                                className={cnOnboardingMenu('graduationCap')}
                            />
                        ) : null}

                        <span className={cnOnboardingMenu('title-text', {expand: expand})}>
                            {title}
                        </span>
                    </button>
                    <Progress
                        size={expand ? 's' : 'xs'}
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

                {expand && (
                    <React.Fragment>
                        <div
                            className={cnOnboardingMenu('lining', {
                                state: expand ? 'expanded' : 'closed',
                            })}
                        >
                            {children}
                        </div>
                        <div className={cnOnboardingMenu('buttons')}>
                            <Button
                                view="normal-contrast"
                                size="m"
                                onClick={onRollUpClickCallback}
                                width="max"
                            >
                                {rollUpButtonText ?? i18n('collapse')}
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
