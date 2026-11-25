import * as React from 'react';

import {ChevronLeft, ChevronRight, Xmark} from '@gravity-ui/icons';
import {Button, Flex, Icon, Link, Text} from '@gravity-ui/uikit';

import {MediaRenderer} from '..';
import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';
import type {StoriesAutoPlayProps, StoriesItem} from '../../types';
import {StoriesTextBlockStyle} from '../../types';
import {StoriesProgress} from '../StoriesProgress/StoriesProgress';

import './StoriesLayout.scss';

const b = block('stories-layout');

export enum IndexType {
    Start = 1,
    End,
    InProccess,
    Single,
}

export type StoriesLayoutProps = StoriesAutoPlayProps & {
    open: boolean;
    storyKey?: string;
    items: StoriesItem[];
    storyIndex: number;
    indexType: IndexType;
    handleButtonClose: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void;
    handleGotoPrevious: () => void;
    handleGotoNext: () => void;
};

function isAutoPlayEnabled(autoPlay: boolean, interval: number) {
    return autoPlay && Number.isFinite(interval) && interval > 0;
}

// StoriesGroup component also use it
export const StoriesLayout = ({
    open,
    storyKey,
    autoPlay = false,
    autoPlayInterval = 5000,
    items,
    indexType,
    storyIndex,
    handleButtonClose,
    handleGotoNext,
    handleGotoPrevious,
}: StoriesLayoutProps) => {
    const {t} = i18n.useTranslation();
    const [pausedByFocus, setPausedByFocus] = React.useState(false);

    React.useEffect(() => {
        if (!open) setPausedByFocus(false);
    }, [open]);

    const currentStory = items[storyIndex];
    const showProgress = isAutoPlayEnabled(autoPlay, autoPlayInterval);
    const canAdvance = ![IndexType.End, IndexType.Single].includes(indexType);

    const renderCounter = () => {
        if (showProgress) {
            return (
                <StoriesProgress
                    key={storyKey ?? storyIndex}
                    count={items.length}
                    index={storyIndex}
                    open={open}
                    paused={pausedByFocus}
                    interval={autoPlayInterval}
                    color={currentStory.progressColor}
                    onComplete={canAdvance ? handleGotoNext : undefined}
                />
            );
        }
        if (items.length > 1) {
            return (
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
            );
        }
        return null;
    };

    return (
        <div className={b('wrap-outer')} onFocusCapture={() => setPausedByFocus(true)}>
            <div className={b('container')}>
                <div
                    className={b('left-pane', {
                        blockStyle:
                            currentStory.textBlockStyle || StoriesTextBlockStyle.Transparent,
                    })}
                >
                    {renderCounter()}
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
                                    <Flex gap="spacing-4" className={b('action-block')}>
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
                    aria-label={t('label_close')}
                >
                    <Icon data={Xmark} size={20} />
                </Button>
                {indexType !== IndexType.Start && indexType !== IndexType.Single && (
                    <Button
                        onClick={handleGotoPrevious}
                        view="raised"
                        className={b('navigation-btn', {back: true})}
                        size="xl"
                        aria-label={t('label_back')}
                    >
                        <Icon size={20} data={ChevronLeft} />
                    </Button>
                )}
                {canAdvance && (
                    <Button
                        onClick={handleGotoNext}
                        className={b('navigation-btn', {next: true})}
                        view="raised"
                        size="xl"
                        aria-label={t('label_next')}
                    >
                        <Icon size={20} data={ChevronRight} />
                    </Button>
                )}
            </div>
        </div>
    );
};
