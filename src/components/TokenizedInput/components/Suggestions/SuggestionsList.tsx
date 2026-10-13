import * as React from 'react';

import {List, Loader} from '@gravity-ui/uikit';

import {b} from '../../constants';
import i18n from '../../i18n';
import type {
    TokenValueBase,
    TokenizedInputSize,
    TokenizedSuggestions,
    TokenizedSuggestionsItem,
} from '../../types';

export type SuggestionsListProps = {
    selected: number;
    isLoading: boolean;
    suggestions: TokenizedSuggestions<TokenValueBase>;
    fullWidth?: boolean;
    size?: TokenizedInputSize;
    onApplySuggestion: (v: TokenizedSuggestionsItem<TokenValueBase>) => void;
};

export function SuggestionsList({
    selected,
    isLoading,
    suggestions,
    fullWidth,
    size = 'm',
    onApplySuggestion,
}: SuggestionsListProps) {
    const {items, options, currentWord} = suggestions;
    const showEmptyState = options?.showEmptyState !== false;
    const isEmpty = !isLoading && items.length === 0;
    const currentText = currentWord?.value ?? '';

    const EmptyPlaceholder = React.useMemo(() => {
        if (isLoading || !showEmptyState) {
            return null;
        }

        return (
            <p className={b('suggestions-list-item', {default: true})}>
                {i18n('suggestions.items_not_found', {text: currentText})}
            </p>
        );
    }, [currentText, isLoading, showEmptyState]);

    if (isEmpty && !showEmptyState) {
        return null;
    }

    return (
        <div
            className={b('suggestions-list-wrapper', {
                empty: isEmpty && showEmptyState,
                loading: isLoading,
                'full-width': fullWidth,
                size,
            })}
        >
            {items.length > 0 && (
                <List
                    aria-label={i18n('suggestions.title')}
                    className={b('suggestions-list')}
                    items={items.map((item, index) => ({id: String(index), item}))}
                    getItemContent={({item}) => item.label}
                    getItemTextValue={({item}) => item.search}
                    activeItemId={selected < 0 ? null : String(selected)}
                    activateOnHover={false}
                    onItemAction={(_id, {item}) => onApplySuggestion(item)}
                    renderItem={(ctx, helpers) => (
                        <List.ItemView
                            {...helpers.getItemProps()}
                            {...helpers.getItemViewProps()}
                            className={b('suggestions-list-item')}
                        >
                            {ctx.content}
                        </List.ItemView>
                    )}
                />
            )}
            {isLoading ? <Loader size="s" /> : isEmpty && EmptyPlaceholder}
        </div>
    );
}
