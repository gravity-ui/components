import React, {useRef, useState} from 'react';
import {Popup} from '@gravity-ui/uikit';

import {block} from 'src/components/utils/cn';
import {useFocusTrap} from 'src/hooks/use-focus-trap';

import {FieldValue} from '../FieldValue';

import type {ClassNameProps} from 'src/utils/types';

import './FieldControl.scss';

const b = block('field-control');

export interface FieldControlProps extends ClassNameProps {
    onClear: VoidFunction;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLBodyElement>;

    fieldName: string;
    fieldValue?: string;
    emptyValueText?: string;

    hideFieldName?: boolean;
    defaultOpen?: boolean;
    enableFocusTrap?: boolean;
    disableOpening?: boolean;

    popupClassName?: string;

    children: (props: {onClose: () => void}) => React.ReactNode;
}

export function FieldControl(props: FieldControlProps) {
    const {
        defaultOpen,
        children,
        fieldName,
        fieldValue,
        emptyValueText,
        hideFieldName,
        onClear,
        onClick,
        popupClassName,
        className,
        enableFocusTrap,
        disableOpening,
    } = props;

    const [open, setOpen] = useState(defaultOpen);
    const controlRef = useRef<HTMLSpanElement>(null);

    const handleClose = () => setOpen(false);

    const handleClickCallback = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            if (typeof onClick === 'function') {
                onClick(event);
            }

            setOpen((o) => !o);
        },
        [setOpen, onClick],
    );

    const handleClick = React.useMemo(
        () => (disableOpening ? undefined : handleClickCallback),
        [handleClickCallback, disableOpening],
    );

    const [setTrap, containerProps] = useFocusTrap({
        enabled: enableFocusTrap && open,
        restoreFocusRef: controlRef,
    });

    return (
        <span ref={controlRef} className={b(null, className)}>
            <FieldValue
                onClick={handleClick}
                onClear={onClear}
                fieldName={fieldName}
                fieldValue={fieldValue}
                emptyValueText={emptyValueText}
                hideFieldName={hideFieldName}
            />
            <Popup open={open} anchorRef={controlRef} onClose={handleClose}>
                <div ref={setTrap} {...containerProps} className={b('popup', popupClassName)}>
                    {children({onClose: handleClose})}
                </div>
            </Popup>
        </span>
    );
}
