import type * as React from 'react';

import {ButtonProps} from '@gravity-ui/uikit';

export type StoriesItemMedia = {url: string} & (
    | {
          type: 'image';
          /** url for img srcSet props - apply on Retina display */
          url2x?: string;
      }
    | {
          type: 'video';
          /** A URL for an image to be shown while the video is downloading */
          posterUrl?: string;
      }
);

export enum StoriesTextBlockStyle {
    Card = 'card',
    Transparent = 'transparent',
}

export enum StoriesMediaBlockStyle {
    HalfSizeWithMargins = 'half-size-with-margins',
    HalfSize = 'half-size',
    FullSize = 'full-size',
}

export interface StoriesItemTextColorStyles {
    titleColor?: string;
    descriptionColor?: string;
    counterColor?: string;
}

export type StoriesProgressColor = string | {light?: string; dark?: string};

export interface StoriesAutoPlayProps {
    /** Automatically advance stories. Disabled by default. */
    autoPlay?: boolean;
    /** Time per slide in milliseconds. Defaults to 5000. Non-positive/non-finite values disable autoplay. */
    autoPlayInterval?: number;
}

export interface StoriesItem {
    title?: string;
    content?: React.ReactNode;
    textColorStyles?: StoriesItemTextColorStyles;
    /** Progress color, independent of text colors, optionally configured per theme. */
    progressColor?: StoriesProgressColor;
    textBlockStyle: StoriesTextBlockStyle;
    mediaBlockStyle: StoriesMediaBlockStyle;
    firstAction?: ButtonProps;
    secondAction?: ButtonProps;
    /** Url for link "more" */
    url?: string;
    media?: StoriesItemMedia;
}
