import {useNewToken} from './hooks';
import type {TokenBaseProps} from './types';

export type NewTokenProps = TokenBaseProps;

export function NewToken({idx}: NewTokenProps) {
    const newTokenInfo = useNewToken(idx);

    const {token, fields, Field, classNames} = newTokenInfo.state;
    const {onChangeField, onFocusField, checkIsHidden, checkIsAutoFocus, getPlaceholder} =
        newTokenInfo.callbacks;

    return (
        <div className={classNames.wrapper}>
            {fields.map(({key}, i) => {
                return (
                    <Field
                        idx={idx}
                        key={`${key}new`}
                        fieldKey={key}
                        placeholder={getPlaceholder(i)}
                        onChange={onChangeField}
                        onFocus={onFocusField}
                        hidden={checkIsHidden(i)}
                        value={token.value[key] ?? ''}
                        autoFocus={checkIsAutoFocus(i)}
                        isNew
                    />
                );
            })}
        </div>
    );
}
