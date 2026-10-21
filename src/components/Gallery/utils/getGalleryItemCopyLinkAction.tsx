import {Link} from '@gravity-ui/icons';
import {ClipboardButton, type ClipboardButtonProps, Icon} from '@gravity-ui/uikit';

import {GalleryItemAction} from '../GalleryItem';

export type GetGalleryItemCopyLinkActionArgs = {
    copyUrl: string;
    onCopy?: ClipboardButtonProps['onCopy'];
};

export function getGalleryItemCopyLinkAction({
    copyUrl,
    onCopy,
}: GetGalleryItemCopyLinkActionArgs): GalleryItemAction {
    return {
        id: 'copy-url',
        title: 'copy-url',
        __titleT: ({t}) => t('copy-link'),
        icon: <Icon data={Link} />,
        __renderT: (props, {t}) => {
            if (props.href !== undefined) return null;

            return (
                <ClipboardButton
                    {...props}
                    text={copyUrl}
                    tooltipInitialText={t('copy-link')}
                    onCopy={onCopy}
                    icon={<Icon data={Link} />}
                />
            );
        },
    };
}
