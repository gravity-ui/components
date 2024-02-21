import React from 'react';

import {Clock} from '@gravity-ui/icons';
import {Checkbox, Disclosure, Icon, Skeleton} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';

import './GuideMenuItem.scss';

export type GuideMenuItemProps = {
    title: string;
    status?: 'finished' | 'inProgress';
    children?: React.ReactNode;
    buttons?: React.ReactNode[];
    showDivider?: boolean;
    hasArrow?: boolean;
    isLoading?: boolean;

    onClick?: () => void;
};
const noopFunc = () => {};

const cnGuideMenuItem = block('guide-menu-item');

export const GuideMenuItem = ({
    title,
    status,
    children,
    buttons,
    showDivider = true,
    onClick = noopFunc,
    hasArrow = true,
    isLoading = false,
}: GuideMenuItemProps) => {
    const [isExpand, setIsExpand] = React.useState(false);
    const header = React.useMemo(
        () => (
            <div
                className={cnGuideMenuItem('collapse-header', {isExpand, hasArrow})}
                onClick={() => setIsExpand((isExpand) => !isExpand)}
                onKeyDown={() => setIsExpand((isExpand) => !isExpand)}
                role="button"
                tabIndex={0}
            >
                <div className={cnGuideMenuItem('icon')}>
                    {status === 'inProgress' ? (
                        <Icon size={18} data={Clock} className={cnGuideMenuItem('time-icon')} />
                    ) : (
                        <Checkbox
                            checked={true}
                            onUpdate={onClick}
                            size="l"
                            className={cnGuideMenuItem('checkbox', {
                                isChecked: status === 'finished',
                            })}
                        />
                    )}
                </div>
                <Disclosure
                    arrowPosition="right"
                    size="l"
                    summary={title}
                    className={cnGuideMenuItem('test')}
                >
                    {hasArrow && (
                        <React.Fragment>
                            <div className={cnGuideMenuItem('node')}>{children}</div>
                            <div className={cnGuideMenuItem('buttons')}>{buttons}</div>
                        </React.Fragment>
                    )}
                </Disclosure>
            </div>
        ),
        [status, onClick, title, isExpand],
    );

    if (isLoading) {
        return (
            <React.Fragment>
                <div className={cnGuideMenuItem('skeleton')}>
                    <Skeleton className={cnGuideMenuItem('avatar')} />
                    <Skeleton className={cnGuideMenuItem('person')} />
                </div>
                {showDivider && <div className={cnGuideMenuItem('divider')}></div>}
            </React.Fragment>
        );
    }

    return (
        <div className={cnGuideMenuItem({hasArrow})}>
            <div className={cnGuideMenuItem('collapse')}>{header}</div>
            {showDivider && <div className={cnGuideMenuItem('divider')}></div>}
        </div>
    );
};
