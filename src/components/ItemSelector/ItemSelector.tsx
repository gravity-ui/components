import React from 'react';

import {Xmark} from '@gravity-ui/icons';
import {Button, Icon, List, ListProps} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import i18n from './i18n';

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
    renderItem?: ListProps<T>['renderItem'];
    filterItem?: ListProps<T>['filterItem'];
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
    renderItem = (item: T, active: boolean) => (
        <div className={b('item', {active})}>
            <span className={b('item-text')}>{this.renderItemTitle(item)}</span>
            <Button
                view="flat-secondary"
                size="s"
                className={b('item-select')}
                onClick={this.onAddItem.bind(this, item)}
            >
                {i18n('button_select')}
            </Button>
        </div>
    );
    filterItem = (filter: string) => (item: T) => {
        const {getItemId} = this.props;
        return getItemId(item).includes(filter);
    };
    renderValueItem = (item: T, active: boolean) => (
        <div className={b('value-item', {active})}>
            <span className={b('value-item-text')}>{this.renderItemTitle(item)}</span>
            <Button
                view="flat-secondary"
                size="s"
                className={b('value-item-remove')}
                onClick={() => this.onRemoveItem(item)}
            >
                <Icon data={Xmark} size={16} />
            </Button>
        </div>
    );
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
    onMoveItem = ({oldIndex, newIndex}: {oldIndex: number; newIndex: number}) => {
        if (oldIndex !== newIndex) {
            const value = this.props.value.slice();
            this.onUpdate(List.moveListElement(value, oldIndex, newIndex));
        }
    };
    onUpdate = (value: string[]) => {
        this.props.onUpdate(value);
    };

    render() {
        const {
            value,
            selectorTitle,
            renderItem = this.renderItem,
            filterItem = this.filterItem,
            hideSelectAllButton,
        } = this.props;
        const [items, selected] = this.getActualItems();
        return (
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
                                {i18n('button_select-all')}
                            </Button>
                        )}
                    </div>
                    <List
                        items={items}
                        renderItem={renderItem}
                        filterItem={filterItem}
                        filterPlaceholder={i18n('placeholder_search')}
                        itemsHeight={196}
                    />
                </div>
                <div className={b('list')}>
                    <div className={b('list-header')}>
                        <span className={b('list-title')}>
                            {`${i18n('label_selected')}: ${value.length}`}
                        </span>
                        <Button
                            view="flat"
                            size="s"
                            disabled={value.length === 0}
                            onClick={this.onErase}
                        >
                            {i18n('button_deselect-all')}
                        </Button>
                    </div>
                    <List
                        items={selected}
                        renderItem={this.renderValueItem}
                        filterItem={filterItem}
                        filterPlaceholder={i18n('placeholder_search')}
                        sortable={true}
                        onSortEnd={this.onMoveItem}
                        itemsHeight={196}
                    />
                </div>
            </div>
        );
    }
}
