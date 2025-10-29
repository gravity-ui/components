import {Link} from '@gravity-ui/icons';
import {ActionTooltip, Button, CopyToClipboard, Icon} from '@gravity-ui/uikit';

import {GalleryItemAction} from '../GalleryItem';
import {i18n} from '../i18n';

export type GetGalleryItemCopyLinkActionArgs = {
    copyUrl: string;
    onCopy?: () => void;
};

export function getGalleryItemCopyLinkAction({
    copyUrl,
    onCopy,
}: GetGalleryItemCopyLinkActionArgs): GalleryItemAction {
    const {t} = i18n.useTranslation();

    return {
        id: 'copy-url',
        title: t('copy-link'),
        icon: <Icon data={Link} />,
        render: (props) => (
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
