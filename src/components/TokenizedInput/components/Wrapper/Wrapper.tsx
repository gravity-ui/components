/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Icon} from '@gravity-ui/uikit';

import i18n from '../../i18n';

import {useWrapper} from './hooks';

export function Wrapper({children}: React.PropsWithChildren<unknown>) {
    const wrapperInfo = useWrapper();

    const {isClearable, classNames, wrapperRef} = wrapperInfo.state;
    const {onBlur, onKeyDown, onClear} = wrapperInfo.callbacks;

    // Narrows RefObject<T | null> back to RefObject<T>
    // for compatibility with @types/react@18 LegacyRef typing.
    const divRef = wrapperRef as React.RefObject<HTMLDivElement>;

    return (
        <div className={classNames.wrapper} onBlur={onBlur} onKeyDown={onKeyDown} ref={divRef}>
            {children}
            {isClearable && (
                <button
                    className={classNames.clearButton}
                    onClick={onClear}
                    tabIndex={-1}
                    aria-label={i18n('clear_input')}
                    title={i18n('clear_input')}
                >
                    <Icon data={Xmark} />
                </button>
            )}
        </div>
    );
}
