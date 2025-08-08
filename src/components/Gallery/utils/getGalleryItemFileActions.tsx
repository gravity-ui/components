import {ArrowDownToLine, Link} from '@gravity-ui/icons';
import {ActionTooltip, Button, CopyToClipboard, Icon} from '@gravity-ui/uikit';

import type {GalleryItemAction} from '../GalleryItem';
import {i18n} from '../i18n';

export type GetGalleryItemActionsProps = {
    downloadLink?: string;
    copyLink?: string;
    onLinkCopied?: () => void;
    onDownloaded?: () => void;
    actions?: GalleryItemAction[];
};

export function getGalleryItemFileActions({
    downloadLink,
    copyLink,
    onLinkCopied,
    onDownloaded,
    actions: providedActions,
}: GetGalleryItemActionsProps) {
    const actions: GalleryItemAction[] = providedActions ?? [];

    if (copyLink) {
        actions.push({
            id: 'copy-url',
            title: i18n('copy-link'),
            icon: <Icon data={Link} />,
            render: (props) => (
                <CopyToClipboard text={copyLink} onCopy={onLinkCopied}>
                    {() => (
                        <div>
                            <ActionTooltip title={i18n('copy-link')}>
                                <Button {...props} />
                            </ActionTooltip>
                        </div>
                    )}
                </CopyToClipboard>
            ),
        });
    }

    if (downloadLink) {
        const handleDownload = (event?: MouseEvent) => {
            event?.stopPropagation();
            onDownloaded?.();
        };

        actions.push({
            id: 'download',
            title: i18n('download'),
            icon: <Icon data={ArrowDownToLine} />,
            href: downloadLink,
            onClick: handleDownload,
        });
    }

    return actions;
}
