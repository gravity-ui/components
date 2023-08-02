import React, {useRef, useState} from 'react';

import {Popup, Sheet, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {FilterValue} from '../FilterValue';

import i18n from './i18n';

import './FilterControl.scss';

const b = block('filter-control');

export interface FilterControlProps {
    sheetId: string;

    className?: string;

    onClear: VoidFunction;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLBodyElement>;

    fieldName: React.ReactNode;
    fieldValue?: React.ReactNode;
    emptyValueText?: React.ReactNode;

    hideFieldName?: boolean;
    defaultOpen?: boolean;
    disableOpening?: boolean;

    popupClassName?: string;

    children: (props: {onClose: () => void}) => React.ReactNode;
}

export function FilterControl(props: FilterControlProps) {
    const {
        sheetId,
        defaultOpen = false,
        children,
        fieldName,
        fieldValue,
        emptyValueText,
        hideFieldName,
        onClear,
        onClick,
        popupClassName,
        className,
        disableOpening,
    } = props;

    const [open, setOpen] = useState<boolean>(defaultOpen);
    const controlRef = useRef<HTMLSpanElement>(null);

    const [mobile] = useMobile();

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

    const sheetTitle = typeof fieldName === 'string' ? fieldName : i18n('title');

    return (
        <span ref={controlRef} className={b(null, className)}>
            <FilterValue
                onClick={handleClick}
                onClear={onClear}
                fieldName={fieldName}
                fieldValue={fieldValue}
                emptyValueText={emptyValueText}
                hideFieldName={hideFieldName}
            />
            {mobile ? (
                <Sheet id={sheetId} title={sheetTitle} visible={open} onClose={handleClose}>
                    {children({onClose: handleClose})}
                </Sheet>
            ) : (
                <Popup open={open} anchorRef={controlRef} onClose={handleClose}>
                    <div className={b('popup', popupClassName)}>
                        {children({onClose: handleClose})}
                    </div>
                </Popup>
            )}
        </span>
    );
}
