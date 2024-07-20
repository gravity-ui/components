import React from 'react';

import {Definition} from './components/Definition';
import {GroupLabel} from './components/GroupLabel';
import {Term} from './components/Term';
import {
    DefinitionListGranularProps,
    DefinitionListGroupedProps,
    DefinitionListProps,
} from './types';
import {
    b,
    getAllItemsAsGroups,
    getKeyStyles,
    getTitle,
    getValueStyles,
    isUnbreakableOver,
    onlySingleItems,
} from './utils';

import './DefinitionList.scss';

function DefinitionListGranular({
    items,
    responsive,
    direction = 'horizontal',
    nameMaxWidth,
    contentMaxWidth = 'auto',
    className,
    itemClassName,
    copyPosition = 'outside',
    qa,
}: DefinitionListGranularProps) {
    const keyStyle = getKeyStyles({nameMaxWidth, direction});

    const valueStyle = getValueStyles({contentMaxWidth, direction});

    const normalizedItems = React.useMemo(() => {
        return items.map((value, index) => ({...value, key: index}));
    }, [items]);

    return (
        <dl className={b({responsive, vertical: direction === 'vertical'}, className)} data-qa={qa}>
            {normalizedItems.map((item) => {
                const {name, key, content, contentTitle, nameTitle, copyText, note, multilineName} =
                    item;

                return (
                    <div key={key} className={b('item', itemClassName)}>
                        <dt
                            className={b('term-container', {multiline: multilineName})}
                            style={keyStyle}
                        >
                            <Term
                                direction={direction}
                                name={name}
                                nameTitle={nameTitle}
                                note={note}
                                multilineName={multilineName}
                            />
                        </dt>
                        <dd
                            className={b('definition')}
                            title={getTitle(contentTitle, content)}
                            style={{
                                ...valueStyle,
                                lineBreak:
                                    typeof content === 'string' && isUnbreakableOver(20)(content)
                                        ? 'anywhere'
                                        : undefined,
                            }}
                        >
                            <Definition
                                copyPosition={copyPosition}
                                copyText={copyText}
                                content={content}
                            />
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}

function DefinitionListGrouped({
    items,
    className,
    itemClassName,
    ...rest
}: DefinitionListGroupedProps) {
    const normalizedItems = React.useMemo(() => {
        return items.map((value, index) => ({...value, key: index}));
    }, [items]);

    return (
        <div className={b({vertical: rest.direction === 'vertical'}, className)}>
            {normalizedItems.map((item) => {
                const {key, label} = item;

                return (
                    <React.Fragment key={key}>
                        {label && <GroupLabel label={label} />}
                        {item.items && (
                            <DefinitionListGranular
                                {...rest}
                                className={b('group', {margin: !label})}
                                items={item.items}
                                itemClassName={b('item', {grouped: Boolean(label)}, itemClassName)}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export function DefinitionList({items, ...rest}: DefinitionListProps) {
    if (onlySingleItems(items)) {
        return <DefinitionListGranular {...rest} items={items} />;
    }

    const preparedItems = getAllItemsAsGroups(items);

    return <DefinitionListGrouped {...rest} items={preparedItems} />;
}
