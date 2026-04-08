/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';

import {Popup, type PopupProps} from '@gravity-ui/uikit';

import {b} from '../../constants';

export function FieldPopup({children, className, ...props}: React.PropsWithChildren<PopupProps>) {
    const onMouseDown = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
    }, []);

    if (!props.anchorElement) {
        return null;
    }

    return (
        <Popup
            {...props}
            className={b('field-popup', className)}
            returnFocus={false}
            strategy="fixed"
        >
            <div onMouseDown={onMouseDown}>{children}</div>
        </Popup>
    );
}
