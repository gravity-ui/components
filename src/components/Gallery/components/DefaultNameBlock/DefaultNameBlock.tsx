import {Text, useMobile} from '@gravity-ui/uikit';

export type DefaultNameBlockProps = {
    name: string;
};

export const DefaultNameBlock = ({name}: DefaultNameBlockProps) => {
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
