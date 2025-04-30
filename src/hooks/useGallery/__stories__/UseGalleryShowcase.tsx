import {FilePreview, Text} from '@gravity-ui/uikit';

import {getGalleryItemImage} from '../../../components';
import {GalleryProvider} from '../GalleryProvider';
import {useGallery} from '../useGallery';

import {images} from './mockData';

const UseGalleryExample = () => {
    const {openGallery} = useGallery();

    const handleOpen = (index: number) => {
        openGallery(
            images.map((image) => getGalleryItemImage({src: image.url, name: image.name})),
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
                        key={index}
                        imageSrc={image.url}
                        file={{type: 'image/jpeg', name: image.name} as File}
                    />
                ))}
            </div>
        </div>
    );
};

export const UseGalleryShowcase = () => {
    return (
        <GalleryProvider>
            <UseGalleryExample />
        </GalleryProvider>
    );
};
