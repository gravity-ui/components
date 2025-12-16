import {Link} from '@gravity-ui/icons';
import {ActionTooltip, Button, CopyToClipboard, Icon} from '@gravity-ui/uikit';

import {GalleryItemAction} from '../GalleryItem';

export type GetGalleryItemCopyLinkActionArgs = {
    copyUrl: string;
    onCopy?: () => void;
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
        __renderT: (props, {t}) => (
            <CopyToClipboard text={copyUrl} onCopy={onCopy}>
                {() => (
                    <div>
                        <ActionTooltip title={t('copy-link')}>
                            <Button {...props} />
                        </ActionTooltip>
                    </div>
                )}
            </CopyToClipboard>
        ),
    };
}
