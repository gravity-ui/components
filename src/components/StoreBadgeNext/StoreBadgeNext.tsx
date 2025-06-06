import * as React from 'react';

import {Icon, Link, LinkProps} from '@gravity-ui/uikit';

import {AppGalleryColor} from '../../icons/stores/AppGalleryColor';
import {AppGalleryMono} from '../../icons/stores/AppGalleryMono';
import {AppStoreColor} from '../../icons/stores/AppStoreColor';
import {AppStoreMono} from '../../icons/stores/AppStoreMono';
import {GooglePlayColor} from '../../icons/stores/GooglePlayColor';
import {GooglePlayMono} from '../../icons/stores/GooglePlayMono';
import {RuStoreColor} from '../../icons/stores/RuStoreColor';
import {RuStoreMono} from '../../icons/stores/RuStoreMono';
import {cn} from '../utils/cn';

import {i18n} from './i18n';

const b = cn('store-badge');

const playmarketPlatform = 'playmarket';
const appstorePlatform = 'appstore';
const huaweiPlatform = 'huaweystore';
const rustorePlatform = 'rustore';

export type StoreBadgePlatform =
    | typeof playmarketPlatform
    | typeof appstorePlatform
    | typeof huaweiPlatform
    | typeof rustorePlatform;

export type StoreBadgeAppearance = 'color' | 'monochrome';

export interface StoreBadgeNextProps extends Omit<LinkProps, 'view' | 'onClick'> {
    /** store name */
    store: StoreBadgePlatform;
    appearance?: StoreBadgeAppearance;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const badgeData: Record<
    StoreBadgePlatform,
    Record<StoreBadgeAppearance, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>
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
    appearance = 'color',
    ...restLinkProps
}: StoreBadgeNextProps) => {
    const iconData = badgeData?.[store][appearance];

    if (!iconData) {
        return null;
    }

    if (!href) {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
            <div role="button" onClick={onClick} aria-label={i18n(`${store}`)}>
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
                'aria-label': i18n(`${store}`),
                ...restLinkProps.extraProps,
            }}
        >
            <Icon data={iconData} />
        </Link>
    );
};
