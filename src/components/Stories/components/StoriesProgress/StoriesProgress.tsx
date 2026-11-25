import {Progress, useThemeType} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {useAutoPlay} from '../../hooks/useAutoPlay';
import {i18n} from '../../i18n';
import type {StoriesProgressColor} from '../../types';

import './StoriesProgress.scss';

const b = block('stories-progress');

interface StoriesProgressProps {
    count: number;
    index: number;
    open: boolean;
    paused: boolean;
    interval: number;
    color?: StoriesProgressColor;
    onComplete?: () => void;
}

export function StoriesProgress({count, index, color, ...timerProps}: StoriesProgressProps) {
    const {t} = i18n.useTranslation();
    const theme = useThemeType();
    const progress = useAutoPlay(timerProps);

    return (
        <div
            className={b()}
            style={{color: typeof color === 'string' ? color : color?.[theme]}}
            role="progressbar"
            aria-label={t('label_progress')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(((index + progress) / count) * 100)}
            aria-valuetext={t('label_story', {current: index + 1, total: count})}
        >
            {Array.from({length: count}, (_, segmentIndex) => {
                let value = 0;
                if (segmentIndex < index) value = 100;
                if (segmentIndex === index) value = progress * 100;
                return (
                    <Progress
                        key={segmentIndex}
                        className={b('segment')}
                        size="xs"
                        stack={[{value}, {value: 100 - value, className: b('remaining')}]}
                    />
                );
            })}
        </div>
    );
}
