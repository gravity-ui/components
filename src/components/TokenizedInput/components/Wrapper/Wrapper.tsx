/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {useWrapper} from './hooks';

export function Wrapper({children}: React.PropsWithChildren<unknown>) {
    const wrapperInfo = useWrapper();

    const {isClearable, classNames, wrapperRef} = wrapperInfo.state;
    const {onBlur, onKeyDown, onClear} = wrapperInfo.callbacks;

    return (
        <div className={classNames.wrapper} onBlur={onBlur} onKeyDown={onKeyDown} ref={wrapperRef}>
            {children}
            {isClearable && (
                <button className={classNames.clearButton} onClick={onClear} tabIndex={-1}>
                    <Xmark />
                </button>
            )}
        </div>
    );
}
