import React from 'react';

import {CircleCheckFill, Clock} from '@gravity-ui/icons';
import {ArrowToggle, Disclosure, Icon, Skeleton} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import './OnboardingMenuItem.scss';

export type OnboardingMenuItemProps = {
    title: string;
    status?: 'completed' | 'pending';
    children?: React.ReactNode;
    buttons?: React.ReactNode;
    hasDivider?: boolean;
    loading?: boolean;

    onClick?: () => void;
};
const noopFunc = () => {};

const ICON_SIZE = 20;

const cnOnboardingMenuItem = block('guide-menu-item');

export const OnboardingMenuItem = ({
    title,
    status,
    children,
    buttons,
    hasDivider = true,
    onClick = noopFunc,
    loading = false,
}: OnboardingMenuItemProps) => {
    const icon = React.useMemo(() => {
        if (status === 'pending') {
            return (
                <Icon size={ICON_SIZE} data={Clock} className={cnOnboardingMenuItem('time-icon')} />
            );
        }

        if (status === 'completed') {
            return (
                <Icon
                    size={ICON_SIZE}
                    data={CircleCheckFill}
                    className={cnOnboardingMenuItem('time-icon')}
                />
            );
        }

        return (
            <Icon
                size={ICON_SIZE}
                data={CircleCheckFill}
                className={cnOnboardingMenuItem('time-icon__disable')}
            />
        );
    }, []);

    const summary = React.useMemo(() => {
        return <span className={cnOnboardingMenuItem('title')}>{title}</span>;
    }, []);

    const header = React.useMemo(
        () => (
            <div className={cnOnboardingMenuItem('collapse-header')} role="button" tabIndex={0}>
                <div className={cnOnboardingMenuItem('icon')}>{icon}</div>
                {children ? (
                    <Disclosure size="l" className={cnOnboardingMenuItem('title-header')}>
                        <Disclosure.Summary>
                            {(props) => (
                                <div {...props} className={cnOnboardingMenuItem('title-summary')}>
                                    {summary}
                                    <ArrowToggle direction={props.expanded ? 'top' : 'bottom'} />
                                </div>
                            )}
                        </Disclosure.Summary>
                        <div className={cnOnboardingMenuItem('node')}>{children}</div>
                        {buttons && (
                            <div className={cnOnboardingMenuItem('buttons')}>{buttons}</div>
                        )}
                    </Disclosure>
                ) : (
                    summary
                )}
            </div>
        ),
        [status, onClick, title],
    );

    if (loading) {
        return (
            <React.Fragment>
                <div className={cnOnboardingMenuItem('skeleton')}>
                    <Skeleton
                        className={cnOnboardingMenuItem('avatar')}
                        style={{width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px`}}
                    />
                    <Skeleton className={cnOnboardingMenuItem('person')} />
                </div>
                {hasDivider && <div className={cnOnboardingMenuItem('divider')}></div>}
            </React.Fragment>
        );
    }

    return (
        <div className={cnOnboardingMenuItem()}>
            <div className={cnOnboardingMenuItem('collapse')}>{header}</div>
            {hasDivider && <div className={cnOnboardingMenuItem('divider')}></div>}
        </div>
    );
};
