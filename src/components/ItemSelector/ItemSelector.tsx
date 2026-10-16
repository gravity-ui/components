import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, List, TextInput, useListFocusOwner} from '@gravity-ui/uikit';
import {ListHelloPangeaDnd} from '@gravity-ui/uikit/hello-pangea-dnd';
import {ListVirtualizer} from '@gravity-ui/uikit/virtualizer';

import {block} from '../utils/cn';

import {i18n} from './i18n';

import './ItemSelector.scss';

const b = block('item-selector');

function getItemIdDefault<T>(item: T) {
    return `${item}`;
}

export interface ItemSelectorProps<T> {
    selectorTitle?: string;

    items: T[];
    value: string[];
    hideSelected?: boolean;
    hideSelectAllButton?: boolean;

    onUpdate: (value: string[]) => void;
    getItemId: (item: T) => string;

    renderItemValue?: (item: T) => React.ReactNode;
    renderItem?: (item: T, active: boolean, index: number) => React.ReactNode;
    renderValueItem?: ItemSelectorProps<T>['renderItem'];
    filterItem?: (filter: string) => (item: T) => boolean;
}

function ItemSelectorList<T>({
    items,
    getItemId,
    renderItem,
    filterItem,
    label,
    onItemsUpdate,
}: {
    items: T[];
    getItemId: ItemSelectorProps<T>['getItemId'];
    renderItem: NonNullable<ItemSelectorProps<T>['renderItem']>;
    filterItem: NonNullable<ItemSelectorProps<T>['filterItem']>;
    label: string;
    onItemsUpdate?: (items: T[]) => void;
}) {
    const {t} = i18n.useTranslation();
    const [filter, setFilter] = React.useState('');
    const [activeItemId, setActiveItemId] = React.useState<string | null>(null);
    const focusOwner = useListFocusOwner();
    const {onKeyDown, ...inputProps} = focusOwner.getInputProps();
    const filteredItems = filter ? items.filter(filterItem(filter)) : items;
    const list = (
        <List
            role="grid"
            aria-label={label}
            items={filteredItems}
            focusOwner={onItemsUpdate ? undefined : focusOwner}
            activeItemId={activeItemId}
            onActiveItemUpdate={setActiveItemId}
            getItemId={getItemId}
            getItemTextValue={getItemId}
            className={b('items')}
            renderItem={(ctx, helpers) => {
                // In List v8 `active` stays on the last hovered row; hover is handled by CSS
                const active = ctx.state.active && Boolean(ctx.state.cursorVisible);
                return onItemsUpdate ? (
                    <ListHelloPangeaDnd.Row ctx={ctx} helpers={helpers} className={b('list-item')}>
                        {renderItem(ctx.item, active, ctx.index)}
                    </ListHelloPangeaDnd.Row>
                ) : (
                    <List.ItemView
                        {...helpers.getItemProps()}
                        {...helpers.getItemViewProps()}
                        className={b('list-item')}
                    >
                        <div {...helpers.getCellProps()}>
                            {renderItem(ctx.item, active, ctx.index)}
                        </div>
                    </List.ItemView>
                );
            }}
        />
    );

    return (
        <React.Fragment>
            <TextInput
                className={b('filter')}
                placeholder={t('placeholder_search')}
                value={filter}
                controlProps={{
                    ...(onItemsUpdate ? {} : inputProps),
                    'aria-haspopup': onItemsUpdate ? undefined : 'grid',
                    'aria-label': `${label}: ${t('placeholder_search')}`,
                }}
                onKeyDown={onItemsUpdate ? undefined : onKeyDown}
                onUpdate={(query) => {
                    setFilter(query);
                    const firstItem = items.find(filterItem(query));
                    setActiveItemId(firstItem === undefined ? null : getItemId(firstItem));
                }}
                hasClear
            />
            <ListVirtualizer estimateItemSize={28}>
                {onItemsUpdate ? (
                    <ListHelloPangeaDnd
                        items={filteredItems}
                        getItemId={getItemId}
                        onItemsUpdate={onItemsUpdate}
                        getItemDragDisabled={() => Boolean(filter)}
                    >
                        {list}
                    </ListHelloPangeaDnd>
                ) : (
                    list
                )}
            </ListVirtualizer>
        </React.Fragment>
    );
}

export class ItemSelector<T> extends React.Component<ItemSelectorProps<T>> {
    static defaultProps = {
        hideSelected: true,
        selectorTitle: '',
        getItemId: getItemIdDefault,
    };
    renderItemTitle = (item: T) => {
        const {renderItemValue, getItemId} = this.props;
        if (renderItemValue) {
            return renderItemValue(item);
        }
        return getItemId(item);
    };
    renderItem = (item: T, active: boolean) => {
        const title = this.renderItemTitle(item);
        const nativeTitle = typeof title === 'string' ? title : undefined;
        return (
            <div className={b('item', {active})}>
                <span className={b('item-text')} title={nativeTitle}>
                    {title}
                </span>
                <Button
                    view="flat-secondary"
                    size="s"
                    className={b('item-select')}
                    onClick={(event) => {
                        event.stopPropagation();
                        this.onAddItem(item);
                    }}
                >
                    <i18n.Translation>{({t}) => t('button_select')}</i18n.Translation>
                </Button>
            </div>
        );
    };
    filterItem = (filter: string) => (item: T) => {
        const {getItemId} = this.props;
        return getItemId(item).includes(filter);
    };
    renderValueItem = (item: T, active: boolean) => {
        const title = this.renderItemTitle(item);
        const nativeTitle = typeof title === 'string' ? title : undefined;
        return (
            <div className={b('value-item', {active})}>
                <span className={b('value-item-text')} title={nativeTitle}>
                    {title}
                </span>
                <Button
                    view="flat-secondary"
                    size="s"
                    className={b('value-item-remove')}
                    aria-label={typeof title === 'string' ? title : this.props.getItemId(item)}
                    onClick={(event) => {
                        event.stopPropagation();
                        this.onRemoveItem(item);
                    }}
                >
                    <Icon data={Xmark} size={16} />
                </Button>
            </div>
        );
    };
    getActualItems() {
        const {items, value, hideSelected, getItemId} = this.props;
        const actualItems = [];
        const selectedItems = new Array(value.length);
        const usedItems = new Map(value.map((id, index) => [id, index]));
        for (const item of items) {
            const selected = usedItems.get(getItemId(item));
            if (selected !== undefined) {
                selectedItems[selected] = item;
            }
            if (!hideSelected || selected === undefined) {
                actualItems.push(item);
            }
        }
        return [actualItems, selectedItems];
    }
    onAddItem = (item: T) => {
        const {getItemId, value} = this.props;
        const itemId = getItemId(item);
        const usedItems = new Set(value);
        const newValue = usedItems.has(itemId) ? value : [...value, itemId];
        setTimeout(() => {
            this.onUpdate(newValue);
        }, 0);
    };
    onRemoveItem = (item: T) => {
        const {value, getItemId} = this.props;
        const itemId = getItemId(item);
        const newValue = value.filter((id) => id !== itemId);
        setTimeout(() => {
            this.onUpdate(newValue);
        }, 0);
    };
    onErase = () => {
        this.onUpdate([]);
    };
    onSelectAll = () => {
        const {items, getItemId} = this.props;
        const value = items.map(getItemId);
        this.onUpdate(value);
    };
    onMoveItems = (items: T[]) => {
        this.onUpdate(items.map(this.props.getItemId));
    };
    onUpdate = (value: string[]) => {
        this.props.onUpdate(value);
    };

    render() {
        const {
            value,
            selectorTitle,
            renderItem = this.renderItem,
            renderValueItem = this.renderValueItem,
            filterItem = this.filterItem,
            hideSelectAllButton,
            getItemId,
        } = this.props;
        const [items, selected] = this.getActualItems();
        return (
            <i18n.Translation>
                {({t}) => (
                    <div className={b()}>
                        <div className={b('list')}>
                            <div className={b('list-header')}>
                                <span className={b('list-title')}>{selectorTitle}</span>
                                {!hideSelectAllButton && (
                                    <Button
                                        view="flat"
                                        size="s"
                                        disabled={items.length === 0}
                                        onClick={this.onSelectAll}
                                    >
                                        {t('button_select-all')}
                                    </Button>
                                )}
                            </div>
                            <ItemSelectorList
                                items={items}
                                getItemId={getItemId}
                                renderItem={renderItem}
                                filterItem={filterItem}
                                label={selectorTitle || t('placeholder_search')}
                            />
                        </div>
                        <div className={b('list')}>
                            <div className={b('list-header')}>
                                <span className={b('list-title')}>
                                    {`${t('label_selected')}: ${value.length}`}
                                </span>
                                <Button
                                    view="flat"
                                    size="s"
                                    disabled={value.length === 0}
                                    onClick={this.onErase}
                                >
                                    {t('button_deselect-all')}
                                </Button>
                            </div>
                            <ItemSelectorList
                                items={selected}
                                getItemId={getItemId}
                                renderItem={renderValueItem}
                                filterItem={filterItem}
                                label={t('label_selected')}
                                onItemsUpdate={this.onMoveItems}
                            />
                        </div>
                    </div>
                )}
            </i18n.Translation>
        );
    }
}
