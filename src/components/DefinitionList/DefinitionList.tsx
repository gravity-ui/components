import React from 'react';

import {Definition} from './components/Definition';
import {GroupLabel} from './components/GroupLabel';
import {Term} from './components/Term';
import {DefinitionListProps} from './types';
import {b, getFlattenItems, getTitle, isGroup, isUnbreakableOver} from './utils';

import './DefinitionList.scss';

export function DefinitionList({
    items,
    responsive,
    nameMaxWidth,
    contentMaxWidth = 'auto',
    className,
    itemClassName,
    copyPosition = 'outside',
    qa,
}: DefinitionListProps) {
    const keyStyle = nameMaxWidth
        ? {
              flexBasis: nameMaxWidth,
          }
        : {};

    const valueStyle =
        typeof contentMaxWidth === 'number'
            ? {
                  flexBasis: contentMaxWidth,
                  maxWidth: contentMaxWidth,
              }
            : {};

    const normalizedItems = React.useMemo(() => {
        return getFlattenItems(items).map((value, index) => ({...value, key: index}));
    }, [items]);

    return (
        <dl className={b({responsive}, className)} data-qa={qa}>
            {normalizedItems.map((item) => {
                if (isGroup(item)) {
                    const {key, label} = item;
                    return <GroupLabel key={key} label={label} />;
                }
                const {
                    name,
                    key,
                    content,
                    contentTitle,
                    nameTitle,
                    copyText,
                    note,
                    multilineName,
                    isGrouped,
                } = item;

                return (
                    <div key={key} className={b('item', {grouped: isGrouped}, itemClassName)}>
                        <dt
                            className={b('term-container', {multiline: multilineName})}
                            style={keyStyle}
                        >
                            <Term
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
