import React from 'react';

import {Popup, Sheet, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import type {ListRef} from '../FilterListContainer/FilterListContainer';
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

    children: (props: {onClose: () => void; extraProps: Record<string, any>}) => React.ReactNode;
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

    const [open, setOpen] = React.useState<boolean>(defaultOpen);

    const controlRef = React.useRef<HTMLSpanElement>(null);
    const listRef: ListRef = React.useRef(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

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

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            if (event.key === 'Enter' && open) {
                event.preventDefault();
            }

            listRef.current?.onKeyDown(event);
        },
        [open],
    );

    React.useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    }, []);

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
                onKeyDown={handleKeyDown}
                buttonRef={buttonRef}
            />
            {mobile ? (
                <Sheet id={sheetId} title={sheetTitle} visible={open} onClose={handleClose}>
                    {children({onClose: handleClose, extraProps: {listRef}})}
                </Sheet>
            ) : (
                <Popup open={open} anchorRef={controlRef} onClose={handleClose}>
                    <div className={b('popup', popupClassName)}>
                        {children({onClose: handleClose, extraProps: {listRef}})}
                    </div>
                </Popup>
            )}
        </span>
    );
}
