import React from 'react';

import {Button, Icon, Progress} from '@gravity-ui/uikit';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';

import {block} from '../../utils/cn';
import i18n from '../i18n';

import './Guide.scss';

const cnGuide = block('guide');

export type GuideProps = {
    title: string | React.ReactNode;
    progressBarCurrentValue: number;
    icon?: SVGIconData;

    defaultExpand: boolean;

    isLoading?: boolean;

    children?: React.ReactNode;

    rollUpbuttonText?: string;
    completeButtontext?: string;

    onHeaderClick?: (newExpand: boolean) => void;
    onCompleteClick: () => void;
    onRollUpClick?: () => void;
};

export const Guide = ({
    title,
    progressBarCurrentValue,
    icon,
    defaultExpand,
    onHeaderClick,
    onRollUpClick,
    onCompleteClick,
    rollUpbuttonText,
    completeButtontext,
    children,
}: GuideProps) => {
    const [expand, setExpand] = React.useState(defaultExpand);

    const onHeaderClickCallback = () => {
        const newExpand = !expand;

        setExpand(newExpand);
        if (onHeaderClick) {
            onHeaderClick(newExpand);
        }
    };

    const onRollUpClickCallback = () => {
        const newExpand = !expand;

        setExpand(newExpand);
        if (onRollUpClick) {
            onRollUpClick();
        }
    };

    const onCompleteCallback = () => {
        onCompleteClick();
    };

    return (
        <div className={cnGuide({expanded: expand})}>
            <div className={cnGuide('content', {expanded: expand})}>
                <div
                    className={cnGuide('header', {state: expand && 'expanded'})}
                    onClick={onHeaderClickCallback}
                    onKeyDown={onHeaderClickCallback}
                    role="button"
                    tabIndex={0}
                >
                    <button className={cnGuide('title')}>
                        {icon ? (
                            <Icon
                                data={icon}
                                width={20}
                                height={20}
                                className={cnGuide('graduationCap')}
                            />
                        ) : null}

                        <span className={cnGuide('titl-text')}>{title}</span>
                    </button>
                    <div className={cnGuide('progressBar', {state: !expand && 'closed'})}>
                        <Progress
                            size={'xs'}
                            stack={[
                                {
                                    value: progressBarCurrentValue,
                                    color: 'var(--g-color-base-positive-heavy)',
                                },
                                {
                                    value: 100 - progressBarCurrentValue,
                                    color: 'var(--g-color-base-background)',
                                },
                            ]}
                        />
                    </div>
                </div>

                {expand && (
                    <React.Fragment>
                        <div
                            className={cnGuide('lining', {
                                state: expand ? 'expanded' : 'closed',
                            })}
                        >
                            {children}
                        </div>
                        <div className={cnGuide('buttons')}>
                            <Button
                                view="normal-contrast"
                                size="m"
                                onClick={onRollUpClickCallback}
                                key={'rollUp'}
                                width="max"
                            >
                                {rollUpbuttonText ?? i18n('roll-up')}
                            </Button>
                            <Button
                                view="outlined-contrast"
                                onClick={onCompleteCallback}
                                size="m"
                                width="max"
                            >
                                {completeButtontext ?? i18n('complete')}
                            </Button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
