import {FilePreview, Text} from '@gravity-ui/uikit';

import {getGalleryItemImage} from '../../../components';
import {GalleryContextProvider} from '../GalleryContextProvider';
import {useGallery} from '../useGallery';

import {images} from './mockData';

const UseGalleryExample = () => {
    const openGallery = useGallery();

    const handleOpen = (index: number) => {
        openGallery(
            images.map((image) => getGalleryItemImage({src: image, name: image})),
            index,
        );
    };

    return (
        <div>
            <Text variant="subheader-3" as={'h2' as const}>
                Click an item to open the gallery
            </Text>
            <div
                style={{
                    display: 'grid',
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridGap: 8,
                    width: 800,
                }}
            >
                {images.map((image, index) => (
                    <FilePreview
                        onClick={() => handleOpen(index)}
                        key={image}
                        imageSrc={image}
                        file={{name: image, type: 'image/jpeg'} as File}
                    />
                ))}
            </div>
        </div>
    );
};

export const UseGalleryShowcase = () => {
    return (
        <GalleryContextProvider>
            <UseGalleryExample />
        </GalleryContextProvider>
    );
};
