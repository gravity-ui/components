import React from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {ActionTooltip, Button, Icon} from '@gravity-ui/uikit';

import {Gallery, GalleryProps} from '../Gallery';
import {block} from '../utils/cn';

import {useFullScreen} from './hooks/useFullScreen';
import {i18n} from './i18n';
import {GalleryFileBase} from './types';
import {renderActiveItemInfo} from './utils/renderActiveItemInfo';
import {renderItemPreview} from './utils/renderItemPreview';

import './FilesGallery.scss';

export const cnFilesGallery = block('files-gallery');

export type FilesGalleryProps<GalleryFileType extends GalleryFileBase> = Omit<
    GalleryProps<GalleryFileType>,
    'fullScreen' | 'renderItemPreview' | 'renderActiveItemInfo'
> & {};

export const FilesGallery = <GalleryFileType extends GalleryFileBase>({
    renderActions: providedRenderActions,
    activeItemInfoClassName,
    ...galleryProps
}: FilesGalleryProps<GalleryFileType>) => {
    const {fullScreen, handleSwitchFullScreenMode} = useFullScreen();

    const renderActions = React.useCallback<
        NonNullable<GalleryProps<GalleryFileType>['renderActions']>
    >(
        (item) => {
            return (
                <React.Fragment>
                    {providedRenderActions?.(item)}
                    <ActionTooltip
                        title={fullScreen ? i18n('exit-full-screen') : i18n('enter-full-screen')}
                        hotkey="Shift+F"
                    >
                        <Button
                            size="l"
                            view="flat"
                            extraProps={{
                                'aria-label': fullScreen
                                    ? i18n('exit-full-screen')
                                    : i18n('enter-full-screen'),
                            }}
                            onClick={handleSwitchFullScreenMode}
                        >
                            <Icon
                                data={fullScreen ? ChevronsCollapseUpRight : ChevronsExpandUpRight}
                            />
                        </Button>
                    </ActionTooltip>
                </React.Fragment>
            );
        },
        [fullScreen, handleSwitchFullScreenMode, providedRenderActions],
    );

    return (
        <Gallery<GalleryFileType>
            fullScreen={fullScreen}
            renderItemPreview={renderItemPreview}
            renderActions={renderActions}
            renderActiveItemInfo={renderActiveItemInfo}
            activeItemInfoClassName={cnFilesGallery('active-item-info', activeItemInfoClassName)}
            {...galleryProps}
        />
    );
};
