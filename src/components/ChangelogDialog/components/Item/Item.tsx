import React from 'react';

import {CirclePlay} from '@gravity-ui/icons';
import {Button, Icon, Label} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {i18n} from '../../i18n';
import type {ChangelogItem} from '../../types';
import {Picture} from '../Picture/Picture';

import './Item.scss';

const b = block('changelog-dialog-item');

export interface ItemProps {
    className?: string;
    data: ChangelogItem;
    onStoryClick?: (storyId: string) => void;
    onLinkClick?: (link: string) => void;
}

export function Item({className, data, onStoryClick, onLinkClick}: ItemProps) {
    const handleLinkClick = React.useCallback(() => {
        if (onLinkClick && data.link) {
            onLinkClick(data.link);
        }
    }, [data.link, onLinkClick]);

    const handleStoryClick = React.useCallback(() => {
        if (onStoryClick && data.storyId) {
            onStoryClick(data.storyId);
        }
    }, [data.storyId, onStoryClick]);

    return (
        <article className={b(null, className)}>
            <div className={b('meta')}>
                <div className={b('date')}>{data.date}</div>
                {data.isNew ? (
                    <Label className={b('label-new')} theme="info">
                        {i18n('label_new')}
                    </Label>
                ) : null}
            </div>
            <div className={b('content')}>
                <h3 className={b('title')}>{data.title}</h3>
                {data.image && data.image.src ? (
                    <Picture
                        className={b('image')}
                        src={data.image.src}
                        ratio={data.image.ratio}
                        alt={data.image.alt}
                    />
                ) : null}
                {data.description ? (
                    <div className={b('description')}>{data.description}</div>
                ) : null}
                {data.link ? (
                    <Button
                        className={b('button')}
                        view="outlined"
                        href={data.link}
                        target={'_blank'}
                        onClick={handleLinkClick}
                    >
                        {i18n('action_read-more')}
                    </Button>
                ) : null}
                {data.storyId && onStoryClick ? (
                    <Button
                        className={b('button')}
                        view="outlined-action"
                        onClick={handleStoryClick}
                    >
                        {i18n('button_view_story')}
                        <Icon data={CirclePlay} size={14} />
                    </Button>
                ) : null}
            </div>
        </article>
    );
}
