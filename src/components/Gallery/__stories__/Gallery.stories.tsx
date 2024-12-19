import React from 'react';

import {ChevronsCollapseUpRight, ChevronsExpandUpRight} from '@gravity-ui/icons';
import {Button, Icon, Text, usePortalContainer} from '@gravity-ui/uikit';
import type {Meta, StoryFn} from '@storybook/react';

import {cn} from '../../utils/cn';
import {Gallery, GalleryProps} from '../Gallery';

import './GalleryShowcase.scss';

const b = cn('gallery-showcase');

export default {
    title: 'Components/Gallery',
    component: Gallery,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta<typeof Gallery>;

const images = [
    'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
    'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
    'https://cs4.pikabu.ru/post_img/big/2015/02/27/6/1425024947_2006737473.jpeg',
    'https://i.pinimg.com/originals/ef/7b/97/ef7b9724ad06cd6dfce92193e95a5caa.jpg',
    'https://avatars.mds.yandex.net/i?id=ea31df78678a1b3f4f1fb7199090831d_l-5235412-images-thumbs&n=13',
    'https://i.ytimg.com/vi/WA63GQpLzjA/maxresdefault.jpg',
    'https://i.pinimg.com/originals/02/eb/fd/02ebfd63d5435ec87c7413b8b2428214.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2b800731080995.5640a39521da5.jpg',
    'https://pic.rutubelist.ru/video/7a/1b/7a1b88f88ff7a470ea6f8131d51c2c5c.jpg',
    'https://i.pinimg.com/originals/4b/c7/ed/4bc7ed612f2080303644deb0f857b70f.jpg',
    'https://img1.reactor.cc/pics/post/нейроарт-нейронные-сети-красивые-картинки-art-7821877.png',
    'https://steamuserimages-a.akamaihd.net/ugc/841461304090603934/D3243F5856FEAE2052FC7CDB748B5BB65E6B247A/?imw=512&amp;imh=306&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
    'https://celes.club/uploads/posts/2022-06/1654752045_50-celes-club-p-multyashnii-kosmos-oboi-krasivie-53.jpg',
    // duplicate the list to show the previews scroll
    'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
    'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
    'https://cs4.pikabu.ru/post_img/big/2015/02/27/6/1425024947_2006737473.jpeg',
    'https://i.pinimg.com/originals/ef/7b/97/ef7b9724ad06cd6dfce92193e95a5caa.jpg',
    'https://avatars.mds.yandex.net/i?id=ea31df78678a1b3f4f1fb7199090831d_l-5235412-images-thumbs&n=13',
    'https://i.ytimg.com/vi/WA63GQpLzjA/maxresdefault.jpg',
    'https://i.pinimg.com/originals/02/eb/fd/02ebfd63d5435ec87c7413b8b2428214.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2b800731080995.5640a39521da5.jpg',
    'https://pic.rutubelist.ru/video/7a/1b/7a1b88f88ff7a470ea6f8131d51c2c5c.jpg',
    'https://i.pinimg.com/originals/4b/c7/ed/4bc7ed612f2080303644deb0f857b70f.jpg',
    'https://img1.reactor.cc/pics/post/нейроарт-нейронные-сети-красивые-картинки-art-7821877.png',
    'https://steamuserimages-a.akamaihd.net/ugc/841461304090603934/D3243F5856FEAE2052FC7CDB748B5BB65E6B247A/?imw=512&amp;imh=306&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
    'https://celes.club/uploads/posts/2022-06/1654752045_50-celes-club-p-multyashnii-kosmos-oboi-krasivie-53.jpg',
];

const ImagesGalleryTemplate: StoryFn<GalleryProps<string>> = () => {
    const [open, setOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);

    const container = usePortalContainer();

    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleSwitchFullScreenMode = React.useCallback(() => {
        setFullScreen((value) => !value);
    }, []);

    const renderBody = React.useCallback((activeImage: string) => {
        return <img src={activeImage} alt="" className={b('view', {type: 'image'})} />;
    }, []);

    const renderItemPreview = React.useCallback((image: string) => {
        return <img src={image} alt="" className={b('preview-item')} />;
    }, []);

    const renderActiveItemInfo = React.useCallback((image: string) => {
        return (
            <Text
                className={b('active-item-info-text')}
                color="primary"
                variant="subheader-1"
                whiteSpace="nowrap"
            >
                {image}
            </Text>
        );
    }, []);

    const renderActions = React.useCallback(() => {
        return (
            <React.Fragment>
                <Button
                    size="l"
                    view="flat"
                    onClick={handleSwitchFullScreenMode}
                    extraProps={{
                        'aria-label': fullScreen ? 'Exit full screen' : 'Activate full screen',
                    }}
                >
                    <Icon data={fullScreen ? ChevronsCollapseUpRight : ChevronsExpandUpRight} />
                </Button>
            </React.Fragment>
        );
    }, [fullScreen, handleSwitchFullScreenMode]);

    React.useEffect(() => {
        if (!fullScreen) {
            return;
        }

        const handleCloseFullScreen = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setFullScreen(false);
            }
        };

        document.addEventListener('keyup', handleCloseFullScreen);

        return () => {
            document.removeEventListener('keyup', handleCloseFullScreen);
        };
    }, [fullScreen]);

    return (
        <React.Fragment>
            <Button onClick={handleOpen} view="action" size="l">
                Open gallery
            </Button>
            <Gallery<string>
                theme="dark"
                open={open}
                onClose={handleClose}
                container={container || undefined}
                items={images}
                renderBody={renderBody}
                renderItemPreview={renderItemPreview}
                fullScreen={fullScreen}
                renderActions={renderActions}
                renderActiveItemInfo={renderActiveItemInfo}
                activeItemInfoClassName={b('active-item-info')}
            />
        </React.Fragment>
    );
};

export const ImagesGallery = ImagesGalleryTemplate.bind({});
