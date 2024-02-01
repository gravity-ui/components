import React from 'react';

import {ChevronRight} from '@gravity-ui/icons';
import {ArrowToggle, Checkbox, Disclosure, Icon, Label, Link, Text} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import {FoldableListItem, FoldableListProps} from './types';

import './FoldableList.scss';

const b = block('foldable-list');

export const FoldableList = ({items, className, isMobile, onChooseItem}: FoldableListProps) => {
    const [checkedItems, setChecked] = React.useState<number[]>(() =>
        items.reduce((acc: number[], item: FoldableListItem, index: number) => {
            if (item.checked) {
                acc.push(index);
            }

            return acc;
        }, []),
    );

    const onCheckItem = (index: number) => {
        return () => {
            let newState;

            if (checkedItems.includes(index)) {
                newState = checkedItems.filter((intemIndex: number) => intemIndex !== index);
            } else {
                newState = [...checkedItems, index];
            }

            onChooseItem?.(newState);
            setChecked(newState);
        };
    };

    return (
        <div className={b(null, className)}>
            {items.map(
                ({title, titleLabel, text, link, checked, disabled, defaultExpand}, index) => {
                    const isChecked = checkedItems.includes(index);

                    return (
                        <Disclosure
                            key={index}
                            size="l"
                            defaultExpanded={defaultExpand}
                            className={b('item', {mobile: isMobile})}
                        >
                            <Disclosure.Summary>
                                {({onClick, ariaControls, expanded}) => (
                                    <div className={b('item-title-wrapper')}>
                                        <Checkbox
                                            className={b('item-checkbox', {
                                                multiline: Boolean(titleLabel),
                                            })}
                                            checked={checked || isChecked}
                                            size="l"
                                            onChange={onCheckItem(index)}
                                            disabled={disabled}
                                        />
                                        <button
                                            type="button"
                                            className={b('item-button')}
                                            onClick={onClick}
                                            aria-controls={ariaControls}
                                            aria-expanded={expanded}
                                        >
                                            <div className={b('title')}>
                                                <div className={b('title-text')}>
                                                    <Text
                                                        className={b('title-text')}
                                                        variant="subheader-2"
                                                    >
                                                        {title}
                                                    </Text>
                                                    {titleLabel ? (
                                                        <Label className={b('title-label')}>
                                                            {titleLabel}
                                                        </Label>
                                                    ) : null}
                                                </div>
                                                <ArrowToggle
                                                    className={b('title-arrow', {
                                                        multiline: Boolean(titleLabel),
                                                    })}
                                                    direction={expanded ? 'top' : 'bottom'}
                                                    size={20}
                                                />
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </Disclosure.Summary>
                            <div className={b('content')}>
                                <Text variant="body-2" className={b('content-text')}>
                                    {text}
                                </Text>
                                {link ? (
                                    <Link
                                        {...link}
                                        className={b('content-link')}
                                        href={link.href}
                                        target="_blank"
                                    >
                                        {link.title}
                                        <Icon
                                            className={b('content-icon')}
                                            data={ChevronRight}
                                            size={16}
                                        />
                                    </Link>
                                ) : null}
                            </div>
                        </Disclosure>
                    );
                },
            )}
        </div>
    );
};
