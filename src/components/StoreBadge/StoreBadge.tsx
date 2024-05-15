import React from 'react';

import {Icon, Lang, Link, LinkProps} from '@gravity-ui/uikit';

import {AppStoreEn} from '../../icons/stores/AppStoreEn';
import {AppStoreRu} from '../../icons/stores/AppStoreRu';
import {GooglePlayEn} from '../../icons/stores/GooglePlayEn';
import {GooglePlayRu} from '../../icons/stores/GooglePlayRu';
import {cn} from '../utils/cn';

const b = cn('store-badge');

const androidPlatform = 'android';
const iosPlatform = 'ios';

export type StoreBadgePlatform = typeof androidPlatform | typeof iosPlatform;

export interface StoreBadgeProps extends Omit<LinkProps, 'view' | 'onClick'> {
    /** store platform name */
    platform: StoreBadgePlatform;
    lang?: `${Lang}`;
    onClick?: React.MouseEventHandler<HTMLElement>;
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
const badgeLabelData: Record<StoreBadgePlatform, Record<Lang, string>> = {
    [iosPlatform]: {
        ru: 'Скачать в App Store',
        en: 'Download on the App Store',
    },
    [androidPlatform]: {
        ru: 'Скачать из Google Play',
        en: 'Get it on Google Play',
    },
};

export const StoreBadge = ({
    platform,
    className,
    onClick,
    href,
    lang = Lang.En,
    ...restLinkProps
}: StoreBadgeProps) => {
    // const lang = i18n.lang as Lang;
    const iconData = badgeData?.[platform][lang];
    const iconLabelData = badgeLabelData?.[platform][lang];

    if (!iconData) {
        return null;
    }

    if (!href) {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
            <div role="button" onClick={onClick} aria-label={iconLabelData}>
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
                'aria-label': iconLabelData,
                ...restLinkProps.extraProps,
            }}
        >
            <Icon data={iconData} />
        </Link>
    );
};
