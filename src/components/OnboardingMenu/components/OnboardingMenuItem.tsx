import * as React from 'react';

import {CircleCheckFill, Clock} from '@gravity-ui/icons';
import {ArrowToggle, Disclosure, Icon, Skeleton} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import './OnboardingMenuItem.scss';

export type OnboardingMenuItemProps = {
    title: string;
    status?: 'completed' | 'pending';
    defaultExpanded?: boolean;
    children?: React.ReactNode;
    buttons?: React.ReactNode;
    hasDivider?: boolean;
    loading?: boolean;
};

const ICON_SIZE = 20;

const cnOnboardingMenuItem = block('onboarding-menu-item');

export const OnboardingMenuItem = ({
    title,
    status,
    children,
    defaultExpanded,
    buttons,
    hasDivider = true,
    loading = false,
}: OnboardingMenuItemProps) => {
    const icon = React.useMemo(() => {
        if (status === 'pending') {
            return (
                <Icon
                    size={ICON_SIZE}
                    data={Clock}
                    className={cnOnboardingMenuItem('status-icon_pending')}
                />
            );
        }

        if (status === 'completed') {
            return (
                <Icon
                    size={ICON_SIZE}
                    data={CircleCheckFill}
                    className={cnOnboardingMenuItem('status-icon')}
                />
            );
        }

        return (
            <Icon
                size={ICON_SIZE}
                data={CircleCheckFill}
                className={cnOnboardingMenuItem('status-icon_disabled')}
            />
        );
    }, [status]);

    const summary = (
        <div className={cnOnboardingMenuItem('collapse-header')}>
            <div className={cnOnboardingMenuItem('icon')}>{icon}</div>
            <span className={cnOnboardingMenuItem('title')}>{title}</span>
        </div>
    );

    const header = children ? (
        <Disclosure
            size="l"
            className={cnOnboardingMenuItem('title-header')}
            defaultExpanded={defaultExpanded}
        >
            <Disclosure.Summary>
                {(props) => (
                    <button {...props} className={cnOnboardingMenuItem('title-summary')}>
                        {summary}
                        <ArrowToggle direction={props.expanded ? 'top' : 'bottom'} />
                    </button>
                )}
            </Disclosure.Summary>
            <div className={cnOnboardingMenuItem('node')}>{children}</div>
            {buttons && <div className={cnOnboardingMenuItem('buttons')}>{buttons}</div>}
        </Disclosure>
    ) : (
        summary
    );

    if (loading) {
        return (
            <React.Fragment>
                <div className={cnOnboardingMenuItem('skeleton')}>
                    <Skeleton
                        className={cnOnboardingMenuItem('skeleton-avatar')}
                        style={{width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px`}}
                    />
                    <Skeleton className={cnOnboardingMenuItem('skeleton-title')} />
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
