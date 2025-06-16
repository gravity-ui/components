import {Text, useMobile} from '@gravity-ui/uikit';

export type GalleryItemNameProps = {
    name: string;
};

export const GalleryItemName = ({name}: GalleryItemNameProps) => {
    const mobile = useMobile();

    return (
        <Text
            color="primary"
            variant={mobile ? 'subheader-2' : 'subheader-1'}
            ellipsis
            whiteSpace="nowrap"
        >
            {name}
        </Text>
    );
};
