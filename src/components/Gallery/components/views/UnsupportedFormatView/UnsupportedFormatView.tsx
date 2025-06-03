import {File} from '@gravity-ui/icons';
import {FilePreview, Flex, Icon, Text} from '@gravity-ui/uikit';

import {block} from '../../../../utils/cn';
import {i18n} from '../../../i18n';

import './UnsupportedFormatView.scss';

const cnUnsupportedFormatView = block('gallery-unsupported-format-view');

export type UnsupportedFormatViewProps = {
    fileName: string;
    fileSize?: string;
    fileFormat?: string;
};

export const UnsupportedFormatView = ({
    fileName,
    fileSize,
    fileFormat,
}: UnsupportedFormatViewProps) => {
    return (
        <Flex
            justifyContent="center"
            width="100%"
            height="100%"
            alignItems="center"
            className={cnUnsupportedFormatView()}
        >
            <div className={cnUnsupportedFormatView('icon')}>
                <Icon data={File} size={48} />
            </div>
            <Text className={cnUnsupportedFormatView('message')} variant="body-1">
                {i18n('format-not-supported')}
            </Text>
            <FilePreview view="compact" file={{name: fileName, type: fileFormat} as File} />
            <Text className={cnUnsupportedFormatView('filename')} variant="body-2">
                {fileName}
            </Text>
            {fileSize && (
                <Text
                    className={cnUnsupportedFormatView('size')}
                    variant="caption-2"
                    color="secondary"
                >
                    {fileSize}
                </Text>
            )}
        </Flex>
    );
};
