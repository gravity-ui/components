import type React from 'react';

export type StoriesItemMedia = {url: string} & (
    | {
          /** default 'image' */
          type?: 'image';
      }
    | {
          type: 'video';
          /** A URL for an image to be shown while the video is downloading */
          posterUrl?: string;
      }
);

export interface StoriesItem {
    title?: string;
    /** @deprecated use `content` property instead */
    description?: string;
    content?: React.ReactNode;
    /** Url for link "more" */
    url?: string;
    media?: StoriesItemMedia;
}
