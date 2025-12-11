import * as React from 'react';

import {ChevronLeft, ChevronRight, Xmark} from '@gravity-ui/icons';
import {Button, Flex, Icon, Link, Text} from '@gravity-ui/uikit';

import {MediaRenderer} from '..';
import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';
import type {StoriesItem} from '../../types';
import {StoriesTextBlockStyle} from '../../types';

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
};

// StoriesGroup component also use it
export const StoriesLayout = ({
    items,
    indexType,
    storyIndex,
    handleButtonClose,
    handleGotoNext,
    handleGotoPrevious,
}: StoriesLayoutProps) => {
    const {t} = i18n.useTranslation();

    const currentStory = items[storyIndex];

    return (
        <div className={b('wrap-outer')}>
            <div className={b('container')}>
                <div
                    className={b('left-pane', {
                        blockStyle:
                            currentStory.textBlockStyle || StoriesTextBlockStyle.Transparent,
                    })}
                >
                    {items.length > 1 && (
                        <Text
                            variant="body-2"
                            className={b('counter')}
                            style={
                                currentStory.textColorStyles?.counterColor
                                    ? {color: currentStory.textColorStyles.counterColor}
                                    : undefined
                            }
                        >
                            {storyIndex + 1}&nbsp;/&nbsp;{items.length}
                        </Text>
                    )}
                    <div className={b('text-block')}>
                        {currentStory && (
                            <React.Fragment>
                                {currentStory.title && (
                                    <Text
                                        variant="display-2"
                                        className={b('text-header')}
                                        style={
                                            currentStory.textColorStyles?.titleColor
                                                ? {color: currentStory.textColorStyles.titleColor}
                                                : undefined
                                        }
                                    >
                                        {currentStory.title}
                                    </Text>
                                )}
                                {currentStory.content && (
                                    <Text
                                        variant="body-2"
                                        className={b('text-content')}
                                        style={
                                            currentStory.textColorStyles?.descriptionColor
                                                ? {
                                                      color: currentStory.textColorStyles
                                                          .descriptionColor,
                                                  }
                                                : undefined
                                        }
                                    >
                                        {currentStory.content}
                                    </Text>
                                )}
                                {currentStory.url && (
                                    <div className={b('story-link-block')}>
                                        <Link href={currentStory.url} target={'_blank'}>
                                            {t('label_more')}
                                        </Link>
                                    </div>
                                )}
                                {Boolean(currentStory.firstAction || currentStory.secondAction) && (
                                    <Flex gap={4} className={b('action-block')}>
                                        {currentStory.firstAction && (
                                            <Button
                                                size="l"
                                                width="max"
                                                {...currentStory.firstAction}
                                            />
                                        )}
                                        {currentStory.secondAction && (
                                            <Button
                                                size="l"
                                                width="max"
                                                {...currentStory.secondAction}
                                            />
                                        )}
                                    </Flex>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
                <div className={b('right-pane')}>
                    {currentStory?.media && (
                        <MediaRenderer
                            media={currentStory.media}
                            style={currentStory.mediaBlockStyle}
                        />
                    )}
                </div>
                <Button
                    view="raised"
                    size="xl"
                    className={b('close-btn')}
                    onClick={handleButtonClose}
                >
                    <Icon data={Xmark} size={20} />
                </Button>
                {indexType !== IndexType.Start && indexType !== IndexType.Single && (
                    <Button
                        onClick={handleGotoPrevious}
                        view="raised"
                        className={b('navigation-btn', {back: true})}
                        size="xl"
                    >
                        <Icon size={20} data={ChevronLeft} />
                    </Button>
                )}
                {indexType !== IndexType.End && indexType !== IndexType.Single && (
                    <Button
                        onClick={handleGotoNext}
                        className={b('navigation-btn', {next: true})}
                        view="raised"
                        size="xl"
                    >
                        <Icon size={20} data={ChevronRight} />
                    </Button>
                )}
            </div>
        </div>
    );
};
