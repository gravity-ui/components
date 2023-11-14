import React, {FC, useMemo} from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import {PlaceholderContainer} from '../../../PlaceholderContainer';
import {block} from '../../../utils/cn';
import i18n from '../../i18n';

import './ErrorContainer.scss';

const b = block('changelog-dialog-error-container');

interface ErrorContainerProps {
    onRetryClick?: () => void;
    error?: boolean | {title?: string; description?: string};
}

export const ErrorContainer: FC<ErrorContainerProps> = ({onRetryClick, error}) => {
    const {title, description} = useMemo(() => {
        return error && typeof error === 'object' ? error : {};
    }, [error]);

    return (
        <PlaceholderContainer
            size={'s'}
            title={title || i18n('label_error-title')}
            description={description}
            image={
                <div className={b('error-image-container')}>
                    <Icon data={TriangleExclamation} className={b('error-image')} size={32} />
                </div>
            }
            action={
                onRetryClick && {
                    text: i18n('button_retry'),
                    handler: onRetryClick,
                }
            }
        />
    );
};
