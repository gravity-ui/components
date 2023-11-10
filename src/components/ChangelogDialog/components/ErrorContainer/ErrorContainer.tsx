import React, {FC, useMemo} from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';

import {PlaceholderContainer} from '../../../PlaceholderContainer';
import {block} from '../../../utils/cn';
import i18n from '../../i18n';

import './ErrorContainer.scss';

const b = block('changelog-dialog-error-container');

interface ErrorContainerProps {
    onRetryClick?: () => void;
    error?: boolean | {title?: string; description?: string};
}

const ErrorContainer: FC<ErrorContainerProps> = ({onRetryClick, error}) => {
    const {title, description} = useMemo(() => {
        return error && typeof error === 'object' ? error : {};
    }, [error]);

    return (
        <PlaceholderContainer
            size={'s'}
            title={title || i18n('context_error-title')}
            description={description}
            image={
                <div className={b('error-image-container')}>
                    <TriangleExclamation className={b('error-image')} />
                </div>
            }
            action={
                onRetryClick && {
                    text: i18n('action_retry'),
                    handler: onRetryClick,
                }
            }
        />
    );
};

export default ErrorContainer;
