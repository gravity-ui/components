import React from 'react';
import block from 'bem-cn-lite';

import {Link, Icon, LinkProps} from '@gravity-ui/uikit';

import {GooglePlayEn} from '../../icons/stores/GooglePlayEn';
import {GooglePlayRu} from '../../icons/stores/GooglePlayRu';
import {AppStoreEn} from '../../icons/stores/AppStoreEn';
import {AppStoreRu} from '../../icons/stores/AppStoreRu';

import {Lang} from '../utils/configure';
import {i18n} from '../../i18n';

const b = block('store-badge');

const androidPlatform = 'android';
const iosPlatform = 'ios';

export type BadgePlatform = typeof androidPlatform | typeof iosPlatform;

export interface StoreBadgeProps extends Omit<LinkProps, 'view'> {
    /** store platform name */
    platform: BadgePlatform;
}

const badgeData: Record<BadgePlatform, Record<Lang, React.FC<React.SVGProps<SVGSVGElement>>>> = {
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
