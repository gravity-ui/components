import React from 'react';

import {ChevronDown, ChevronRight, ChevronUp} from '@gravity-ui/icons';
import {Button, Checkbox, Disclosure, Icon, Link, Text} from '@gravity-ui/uikit';

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
                                {(props) => (
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
                                        <Button
                                            view="flat"
                                            width="max"
                                            className={b('item-button')}
                                            {...props}
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
                                                        <Text
                                                            className={b('title-label')}
                                                            variant="body-1"
                                                        >
                                                            {titleLabel}
                                                        </Text>
                                                    ) : null}
                                                </div>
                                                <Icon
                                                    className={b('title-arrow', {
                                                        multiline: Boolean(titleLabel),
                                                    })}
                                                    data={props.expanded ? ChevronUp : ChevronDown}
                                                    size={20}
                                                />
                                            </div>
                                        </Button>
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
