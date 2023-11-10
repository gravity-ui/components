import React from 'react';

import {Skeleton} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import './ItemSkeleton.scss';

const b = block('changelog-dialog-item');

interface ItemSkeletonProps {
    className?: string;
    isNew?: boolean;
    withImage?: boolean;
    withDescription?: boolean;
    withLink?: boolean;
    withStory?: boolean;
}

export function ItemSkeleton({
    className,
    withImage,
    isNew,
    withDescription,
    withLink,
    withStory,
}: ItemSkeletonProps) {
    return (
        <article className={b(null, className)}>
            <div className={b('meta')}>
                <div className={b('date')}>
                    <Skeleton className={b('date-skeleton')} />
                    {isNew && <Skeleton className={b('label-new-skeleton')} />}
                </div>
            </div>
            <div className={b('content')}>
                <h3 className={b('title')}>
                    <Skeleton className={b('title-skeleton')} />
                </h3>
                {withImage && <Skeleton className={b('image-skeleton')} />}
                {withDescription && (
                    <div className={b('description')}>
                        <Skeleton className={b('description-skeleton')} />
                    </div>
                )}
                {withLink && <Skeleton className={b('button-skeleton')} />}
                {withStory && <Skeleton className={b('button-skeleton')} />}
            </div>
        </article>
    );
}
