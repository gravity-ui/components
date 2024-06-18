import React from 'react';

import {ArrowLeft as ArrowLeftIcon} from '@gravity-ui/icons';
import {Button, Icon, Sheet} from '@gravity-ui/uikit';

import {block} from '../../utils/cn';
import {FilePreviewActionProps} from '../FilePreviewAction';
import {i18n} from '../i18n';

import './MobileImagePreview.scss';

const cn = block('mobile-image-preview');

export interface FilePreviewProps {
    fileName?: string;
    previewSrc?: string;
    visible: boolean;
    onClose: () => void;
    actions?: FilePreviewActionProps[];
}

export function MobileImagePreview({
    previewSrc,
    visible,
    onClose,
    actions,
    fileName,
}: FilePreviewProps) {
    const [showError, setShowError] = React.useState(false);
    const showSheet = Boolean(previewSrc && visible);

    const handleImagesError = () => {
        setShowError(true);
    };

    const handleActionClick = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
        action: FilePreviewActionProps,
    ) => {
        action.onClick?.(e);
        if (action.closeSheetAfterAction) {
            onClose();
        }
    };

    return (
        <Sheet visible={showSheet} onClose={onClose} contentClassName={cn('sheet-content')}>
            <div className={cn('container')} style={{}}>
                {showError ? (
                    <div className={cn('error-label')}>{i18n('label_image-preview-error')}</div>
                ) : (
                    <img
                        className={cn('image')}
                        src={previewSrc}
                        alt={fileName}
                        onError={handleImagesError}
                    />
                )}
                <Button view="raised" size="xl" className={cn('back-button')} onClick={onClose}>
                    <Icon data={ArrowLeftIcon} size={20} />
                </Button>
                <div className={cn('action-buttons')}>
                    {actions?.map((action) => (
                        <Button
                            size="xl"
                            key={action.id}
                            onClick={(e) => handleActionClick(e, action)}
                            view="raised"
                        >
                            <Icon data={action.icon} size={20} />
                        </Button>
                    ))}
                </div>
            </div>
        </Sheet>
    );
}

MobileImagePreview.displayName = 'MobileImagePreview';
