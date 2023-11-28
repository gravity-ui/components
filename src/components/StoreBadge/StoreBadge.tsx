import React from 'react';

import {Icon, Link, LinkProps} from '@gravity-ui/uikit';

import {i18n} from '../../i18n';
import {AppStoreEn} from '../../icons/stores/AppStoreEn';
import {AppStoreRu} from '../../icons/stores/AppStoreRu';
import {GooglePlayEn} from '../../icons/stores/GooglePlayEn';
import {GooglePlayRu} from '../../icons/stores/GooglePlayRu';
import {cn} from '../utils/cn';
import {Lang} from '../utils/configure';

const b = cn('store-badge');

const androidPlatform = 'android';
const iosPlatform = 'ios';

export type StoreBadgePlatform = typeof androidPlatform | typeof iosPlatform;

export interface StoreBadgeProps extends Omit<LinkProps, 'view'> {
    /** store platform name */
    platform: StoreBadgePlatform;
}

const badgeData: Record<
    StoreBadgePlatform,
    Record<Lang, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>
> = {
    [iosPlatform]: {
        ru: AppStoreRu,
        en: AppStoreEn,
    },
    [androidPlatform]: {
        ru: GooglePlayRu,
        en: GooglePlayEn,
    },
};

export const StoreBadge = ({
    platform,
    className,
    onClick,
    href,
    ...restLinkProps
}: StoreBadgeProps) => {
    const lang = i18n.lang as Lang;
    const iconData = badgeData?.[platform][lang];

    if (!iconData) {
        return null;
    }

    if (!href) {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
            <div role="link" onClick={onClick}>
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
        >
            <Icon data={iconData} />
        </Link>
    );
};
