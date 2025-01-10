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

export interface StoriesItem {
    title?: string;
    description?: string;
    textColorStyles?: StoriesItemTextColorStyles;
    textBlockStyle: StoriesTextBlockStyle;
    mediaBlockStyle: StoriesMediaBlockStyle;
    firstAction?: ButtonProps;
    secondAction?: ButtonProps;
    /** Url for link "more" */
    url?: string;
    media?: StoriesItemMedia;
}
