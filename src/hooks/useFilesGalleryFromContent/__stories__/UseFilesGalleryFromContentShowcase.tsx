import {Text} from '@gravity-ui/uikit';

import {GalleryContextProvider} from '../../useGallery';
import {useFilesGalleryFromContent} from '../useFilesGalleryFromContent';

const UseFilesGalleryFromContentExample = () => {
    const openFilesGalleryFromContent = useFilesGalleryFromContent();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={openFilesGalleryFromContent}>
            <Text variant="subheader-3" as={'h2' as const}>
                Click image or video link to open the gallery
            </Text>
            <a href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
                My video
            </a>
            <br />
            <img
                src="https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg"
                alt="Corgi"
            />
        </div>
    );
};

export const UseFilesGalleryFromContentShowcase = () => {
    return (
        <GalleryContextProvider>
            <UseFilesGalleryFromContentExample />
        </GalleryContextProvider>
    );
};
