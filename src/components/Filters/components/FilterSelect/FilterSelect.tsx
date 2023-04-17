import React from 'react';

import {Button, Icon, Popup} from '@gravity-ui/uikit';
import {Plus} from '@gravity-ui/icons';

import {block} from 'src/components/utils/cn';
import {useFocusTrap} from 'src/hooks/use-focus-trap';

import {FilterListContainer} from '../FilterListContainer/FilterListContainer';

import type {ClassNameProps} from 'src/utils/types';

import i18n from './i18n';

import './FilterSelect.scss';

const b = block('filter-select');

interface FilterSelectItem {
    value: string;
    label: string;
    description?: string;
}

interface FilterSelectProps extends ClassNameProps {
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

    const [open, setOpen] = React.useState(defaultOpen);

    const handleClose = React.useCallback(() => setOpen(false), []);

    const handleSubmit = React.useCallback(
        (submitValues: string[]) => {
            onItemClick(submitValues[0]);
            setOpen(false);
        },
        [onItemClick],
    );

    const [setTrap, containerProps] = useFocusTrap({
        enabled: open,
        restoreFocusRef: buttonRef,
    });

    return (
        <span ref={controlRef} className={b(null, className)}>
            <Button ref={buttonRef} size="s" onClick={() => setOpen((o) => !o)}>
                <Icon className={b('button-icon')} data={Plus} size={12} />
                {showButtonText ? text : null}
            </Button>
            <Popup open={open} anchorRef={controlRef} onClose={handleClose}>
                <div ref={setTrap} {...containerProps} className={b('popup')}>
                    <FilterListContainer
                        options={options}
                        value={values}
                        onClose={() => setOpen(false)}
                        onSubmit={handleSubmit}
                        filterable={false}
                        multiple={false}
                        hideControls={true}
                    />
                </div>
            </Popup>
        </span>
    );
}
