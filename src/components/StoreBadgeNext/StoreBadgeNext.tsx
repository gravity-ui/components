import * as React from 'react';

import {Icon, Link, LinkProps} from '@gravity-ui/uikit';

import {AppStoreColor} from '../../icons/stores/AppStoreColor';
import {AppStoreMono} from '../../icons/stores/AppStoreMono';
import {GooglePlayColor} from '../../icons/stores/GooglePlayColor';
import {GooglePlayMono} from '../../icons/stores/GooglePlayMono';
import {AppGalleryColor} from '../../icons/stores/AppGalleryColor';
import {AppGalleryMono} from '../../icons/stores/AppGalleryMono';
import {RuStoreColor} from '../../icons/stores/RuStoreColor';
import {RuStoreMono} from '../../icons/stores/RuStoreMono';
import {cn} from '../utils/cn';

const b = cn('store-badge');

const playmarketPlatform = 'playmarket';
const appstorePlatform = 'appstore';
const huaweiPlatform = 'huaweystore';
const rustorePlatform = 'rustore';

const color = 'color';
const monochrome = 'monochrome';

export type StoreBadgePlatform = typeof playmarketPlatform | typeof appstorePlatform | typeof huaweiPlatform | typeof rustorePlatform;

export type appearanceColor = typeof color | typeof monochrome;

export interface StoreBadgeNextProps extends Omit<LinkProps, 'view' | 'onClick'> {
    /** store platform name */
    store: StoreBadgePlatform;
    appearance?: appearanceColor;
    onClick?: React.MouseEventHandler<HTMLElement>;
}


const badgeData: Record<
    StoreBadgePlatform,
    Record<appearanceColor, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>
> = {
    [appstorePlatform]: {
        color: AppStoreColor,
        monochrome: AppStoreMono,
    },
    [playmarketPlatform]: {
        color: GooglePlayColor,
        monochrome: GooglePlayMono,
    },
    [huaweiPlatform]: {
        color: AppGalleryColor,
        monochrome: AppGalleryMono,
    },
    [rustorePlatform]: {
        color: RuStoreColor,
        monochrome: RuStoreMono,
    },
};

export const StoreBadgeNext = ({
    store,
    className,
    onClick,
    href,
    appearance = color,
    ...restLinkProps
}: StoreBadgeNextProps) => {
    const iconData = badgeData?.[store][appearance];

    if (!iconData) {
        return null;
    }

    if (!href) {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
            <div role="button" onClick={onClick}>
                <Icon className={b(null, className)} data={iconData} />
            </div>
        );
    }

    return (
        <Link
            className={b(null, className)}
            onClick={onClick}
            href={href}
            target="_blank"
            rel="noopener"
            {...restLinkProps}
            extraProps={{
                ...restLinkProps.extraProps,
            }}
        >
            <Icon data={iconData} />
        </Link>
    );
};
