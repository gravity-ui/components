import * as React from 'react';

import type {TokenValueBase} from '../../types';
import {FieldPopup} from '../Field/FieldPopup';

import {SuggestionsList} from './SuggestionsList';
import {useSuggestions} from './hooks';
import type {SuggestionsData} from './types';

export type SuggestionsProps = SuggestionsData<TokenValueBase> & {
    inputElement: HTMLInputElement | null;
    List?: typeof SuggestionsList;
    withPopup?: boolean;
};

export function Suggestions({
    List = SuggestionsList,
    withPopup = true,
    ...props
}: SuggestionsProps) {
    const suggestionsInfo = useSuggestions(props);

    const {
        suggestions,
        isLoading,
        selected,
        isPopupOpened,
        inputElement,
        popupWidth,
        popupOffset,
        fullWidthSuggestions,
    } = suggestionsInfo.state;
    const {onApplySuggestion} = suggestionsInfo.callbacks;

    const renderHint = () => {
        if (!suggestions.hint || isLoading) {
            return null;
        }

        return suggestions.hint;
    };

    const renderList = () => {
        return (
            <List
                suggestions={suggestions}
                isLoading={isLoading}
                onApplySuggestion={onApplySuggestion}
                selected={selected}
                fullWidth={fullWidthSuggestions}
            />
        );
    };

    if (withPopup) {
        return (
            <FieldPopup
                anchorElement={inputElement}
                placement={['bottom-start', 'top-start']}
                strategy={'absolute'}
                offset={popupOffset}
                open={isPopupOpened}
                style={{width: popupWidth}}
            >
                {renderHint()}
                {renderList()}
            </FieldPopup>
        );
    }

    return (
        <React.Fragment>
            {renderHint()}
            {renderList()}
        </React.Fragment>
    );
}
