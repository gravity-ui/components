import {Xmark} from '@gravity-ui/icons';

import i18n from '../../../i18n';

import {useRegularToken} from './hooks';
import type {TokenBaseProps} from './types';

export type RegularTokenProps = TokenBaseProps;

export function RegularToken({idx}: RegularTokenProps) {
    const regularTokenInfo = useRegularToken(idx);

    const {token, fields, showRemoveButton, Field, classNames, isEditable} = regularTokenInfo.state;
    const {onChangeField, onFocusField, onBlur, onRemove, getPlaceholder} =
        regularTokenInfo.callbacks;

    return (
        <div className={classNames.wrapper}>
            {fields.map(({className, key}, index) => {
                return (
                    <Field
                        idx={idx}
                        key={`${key} ${token.id}`}
                        fieldKey={key}
                        onChange={onChangeField}
                        onFocus={onFocusField}
                        onBlur={onBlur}
                        value={token.value[key] ?? ''}
                        readOnly={token.options?.readOnlyFields?.includes(key)}
                        className={className}
                        error={token.errors?.[key]}
                        placeholder={getPlaceholder(index)}
                    />
                );
            })}
            {showRemoveButton && (
                <button
                    className={classNames.removeButton}
                    onClick={onRemove}
                    tabIndex={-1}
                    disabled={!isEditable}
                    aria-label={i18n('remove_token', {index: idx})}
                >
                    <Xmark />
                </button>
            )}
        </div>
    );
}
