import * as React from 'react';

import {Alert} from '@gravity-ui/uikit';

import {i18n} from '../../i18n';

interface ErrorContainerProps {
    onRetryClick?: () => void;
    error?: boolean | {title?: string; description?: string};
}

export function ErrorContainer({onRetryClick, error}: ErrorContainerProps) {
    const {t} = i18n.useTranslation();

    const {title, description} = React.useMemo(() => {
        return error && typeof error === 'object' ? error : {};
    }, [error]);

    return (
        <Alert
            title={title || t('label_error-title')}
            message={description}
            theme={'danger'}
            actions={
                onRetryClick && [
                    {
                        text: t('button_retry'),
                        handler: onRetryClick,
                    },
                ]
            }
        />
    );
}
