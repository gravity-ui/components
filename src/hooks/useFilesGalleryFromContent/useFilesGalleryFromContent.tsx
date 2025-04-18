import * as React from 'react';

import {getGalleryItemImage, getGalleryItemVideo} from '../../components';
import {useGallery} from '../useGallery';

import {extensionRegex, supportedExtensions, supportedVideoExtensions} from './constants';
import {GalleryItemPropsWithUrl} from './types';

export function useFilesGalleryFromContent(customFiles?: GalleryItemPropsWithUrl[]) {
    const openFilesGallery = useGallery();

    return React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target instanceof HTMLElement) {
                let fileLink = '';

                if (event.target.tagName === 'IMG' && !event.target.closest('a')) {
                    fileLink = event.target.getAttribute('src') ?? '';
                } else if (event.target.tagName === 'A') {
                    fileLink = event.target.getAttribute('href') ?? '';
                }

                if (!fileLink) {
                    return;
                }

                const filesFromContent = [
                    ...(event.currentTarget?.querySelectorAll('img,a') ?? []),
                ].reduce<GalleryItemPropsWithUrl[]>((result, element) => {
                    const isImage = element.tagName === 'IMG';
                    const link = isImage
                        ? element.getAttribute('src')
                        : element.getAttribute('href');

                    if (link && !customFiles?.some((item) => item.url === link)) {
                        const extension = link.match(extensionRegex)?.[0] || '';

                        if (isImage || supportedExtensions.includes(extension)) {
                            const name =
                                (isImage
                                    ? element.getAttribute('alt')
                                    : element.getAttribute('title')) || '';

                            result.push({
                                ...(supportedVideoExtensions.includes(extension)
                                    ? getGalleryItemVideo({src: link, name: name})
                                    : getGalleryItemImage({src: link, name: name})),
                                url: link,
                            });
                        }
                    }

                    return result;
                }, []);

                const files = [...(customFiles ?? []), ...filesFromContent];

                const initialItemIndex = files.findIndex((item) => item.url === fileLink);

                if (initialItemIndex !== -1) {
                    event.preventDefault();
                    openFilesGallery(files, initialItemIndex);
                }
            }
        },
        [customFiles, openFilesGallery],
    );
}
