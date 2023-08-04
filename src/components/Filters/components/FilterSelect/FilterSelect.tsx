import React from 'react';

import {Plus} from '@gravity-ui/icons';
import {Button, Icon, Popup, Sheet, useMobile} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';
import {FilterListContainer, type ListRef} from '../FilterListContainer/FilterListContainer';

import i18n from './i18n';

import './FilterSelect.scss';

const b = block('filter-select');

interface FilterSelectItem {
    value: string;
    label: string;
    description?: string;
}

interface FilterSelectProps {
    className?: string;

    text?: string;

    options: FilterSelectItem[];
    values: string[];

    onItemClick: (value: string) => void;

    defaultOpen?: boolean;
    showButtonText?: boolean;
}

export function FilterSelect(props: FilterSelectProps) {
    const {
        text = i18n('button.add-filter.text'),
        defaultOpen = false,
        options,
        values,
        onItemClick,
        showButtonText,
        className,
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const controlRef = React.useRef<HTMLSpanElement>(null);
    const listRef: ListRef = React.useRef(null);

    const [open, setOpen] = React.useState(defaultOpen);

    const [mobile] = useMobile();

    const handleClose = React.useCallback(() => setOpen(false), []);

    const handleSubmit = React.useCallback(
        (submitValues: string[]) => {
            onItemClick(submitValues[0]);
            setOpen(false);
        },
        [onItemClick],
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

    const ModalContent = (
        <FilterListContainer
            listRef={listRef}
            options={options.filter((option) => !values.find((value) => option.value === value))}
            value={[]}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            filterable={false}
            virtualized={false}
            multiple={false}
            hideControls={true}
        />
    );

    return (
        <span ref={controlRef} className={b(null, className)}>
            <Button
                ref={buttonRef}
                size="s"
                onClick={!open ? () => setOpen(true) : undefined}
                qa="add-filter"
                extraProps={{
                    onKeyDown: handleKeyDown,
                }}
            >
                <Icon className={b('button-icon')} data={Plus} size={12} />
                {showButtonText ? text : null}
            </Button>
            {mobile ? (
                <Sheet id={b()} visible={open} onClose={handleClose}>
                    {ModalContent}
                </Sheet>
            ) : (
                <Popup
                    open={open}
                    anchorRef={controlRef}
                    onClose={handleClose}
                    contentClassName={b('popup')}
                >
                    {ModalContent}
                </Popup>
            )}
        </span>
    );
}
