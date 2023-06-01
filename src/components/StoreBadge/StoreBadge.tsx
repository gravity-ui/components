import React from 'react';
import block from 'bem-cn-lite';

import {Link, Platform, Icon, LinkProps} from '@gravity-ui/uikit';

import {GooglePlayEn} from '../../icons/stores/GooglePlayEn';
import {GooglePlayRu} from '../../icons/stores/GooglePlayRu';
import {AppStoreEn} from '../../icons/stores/AppStoreEn';
import {AppStoreRu} from '../../icons/stores/AppStoreRu';

import {Lang} from '../utils/configure';
import {i18n} from '../../i18n';

const b = block('store-badge');

export type BadgePlatform = Platform.ANDROID | Platform.IOS;

export interface StoreBadgeProps extends Omit<LinkProps, 'view'> {
    platform: BadgePlatform;
}

const badgeData: Record<BadgePlatform, Record<Lang, unknown>> = {
    [Platform.IOS]: {
        ru: AppStoreRu,
        en: AppStoreEn,
    },
    [Platform.ANDROID]: {
        ru: GooglePlayRu,
        en: GooglePlayEn,
    },
};

/**
 * Component for rendering store badges
 *
 * @param platform - platform name
 *
 * @returns JSX
 */
export const StoreBadge = ({
    platform,
    className,
    onClick,
    href,
    ...restLinkProps
}: StoreBadgeProps) => {
    const lang = i18n.lang as Lang;
    const iconData = badgeData?.[platform][lang] as string;

    if (!iconData) {
        return null;
    }

    if (!href) {
        return (
            <div onClick={onClick}>
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
