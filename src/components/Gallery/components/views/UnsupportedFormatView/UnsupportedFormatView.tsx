import {FilePreview, FilePreviewProps, Flex, Text} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {i18n} from '../../../i18n';

import './UnsupportedFormatView.scss';

const cnUnsupportedFormatView = block('gallery-unsupported-format-view');

export type UnsupportedFormatViewProps = {
    file: FilePreviewProps['file'];
};

export const UnsupportedFormatView = ({file}: UnsupportedFormatViewProps) => {
    const fileType = file.type || 'unknown';

    return (
        <Flex
            justifyContent="center"
            width="100%"
            height="100%"
            alignItems="center"
            className={cnUnsupportedFormatView()}
        >
            <Text className={cnUnsupportedFormatView('message')} variant="body-1">
                {i18n('format-not-supported')}
            </Text>
            <FilePreview view="compact" file={{name: file.name, type: fileType} as File} />
            <Text className={cnUnsupportedFormatView('filename')} variant="body-2">
                {file.name}
            </Text>
            {file.size && (
                <Text
                    className={cnUnsupportedFormatView('size')}
                    variant="caption-2"
                    color="secondary"
                >
                    {file.size}
                </Text>
            )}
        </Flex>
    );
};
