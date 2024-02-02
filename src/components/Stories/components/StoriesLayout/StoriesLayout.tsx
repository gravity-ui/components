import React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, Link} from '@gravity-ui/uikit';
import type {ButtonProps} from '@gravity-ui/uikit';

import {MediaRenderer} from '..';
import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';
import type {StoriesItem} from '../../types';

import './StoriesLayout.scss';

const b = block('stories-layout');

export enum IndexType {
    Start = 1,
    End,
    InProccess,
    Single,
}

export type StoriesLayoutProps = {
    items: StoriesItem[];
    storyIndex: number;
    indexType: IndexType;

    handleButtonClose: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void;
    handleGotoPrevious: () => void;
    handleGotoNext: () => void;
    action?: ButtonProps;
};

// StoriesGroup component also use it
export const StoriesLayout = (props: StoriesLayoutProps) => {
    const currentStory = props.items[props.storyIndex];

    return (
        <div className={b('wrap-outer')}>
            <div className={b('wrap-inner')}>
                <div className={b('container')}>
                    <div className={b('left-pane')}>
                        {props.items.length > 1 && (
                            <div className={b('counter')}>
                                <span dir="ltr">
                                    {props.storyIndex + 1}&nbsp;/&nbsp;{props.items.length}
                                </span>
                            </div>
                        )}
                        <div className={b('text-block')}>
                            {currentStory && (
                                <React.Fragment>
                                    {currentStory.title && (
                                        <div className={b('text-header')}>{currentStory.title}</div>
                                    )}
                                    {currentStory.description && (
                                        <div className={b('text-content')}>
                                            {currentStory.description}
                                        </div>
                                    )}
                                    {currentStory.url && (
                                        <div className={b('story-link-block')}>
                                            <Link href={currentStory.url} target={'_blank'}>
                                                {i18n('label_more')}
                                            </Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                        <div className={b('controls-block')}>
                            {IndexType.Single === props.indexType ? (
                                <Button onClick={props.handleButtonClose} size="l" width="max">
                                    {i18n('label_close')}
                                </Button>
                            ) : (
                                <React.Fragment>
                                    {IndexType.Start !== props.indexType && (
                                        <Button
                                            onClick={props.handleGotoPrevious}
                                            view="outlined"
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_back')}
                                        </Button>
                                    )}
                                    {IndexType.InProccess !== props.indexType && (
                                        <Button
                                            onClick={props.handleButtonClose}
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_close')}
                                        </Button>
                                    )}
                                    {IndexType.End !== props.indexType && (
                                        <Button
                                            onClick={props.handleGotoNext}
                                            view="action"
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_next')}
                                        </Button>
                                    )}
                                </React.Fragment>
                            )}
                            {props.action && <Button size="l" width="max" {...props.action} />}
                        </div>
                    </div>
                    <div className={b('right-pane')}>
                        <Button
                            view="flat"
                            size="l"
                            className={b('close-btn')}
                            onClick={props.handleButtonClose}
                        >
                            <Icon data={Xmark} size={18} />
                        </Button>
                        {currentStory?.media && (
                            <div className={b('media-block')}>
                                <MediaRenderer media={currentStory.media} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
