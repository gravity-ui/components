import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {FocusContext} from '../../../../context/TokenizedInputContext';
import type {
    TokenValueBase,
    TokenizedInputFocusInfo,
    TokenizedSuggestionsItem,
} from '../../../../types';
import {useSuggestionsNavigation} from '../useSuggestionsNavigation';

describe('useSuggestionsNavigation', () => {
    const mockOnFocus = jest.fn();

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'key'},
        },
        callbacks: {
            onFocus: mockOnFocus,
        },
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <FocusContext.Provider
            value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
        >
            {children}
        </FocusContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call onSelectNext on ArrowDown', () => {
        const mockOnSelectNext = jest.fn();
        const mockOnSelectPrev = jest.fn();
        const mockOnApply = jest.fn();

        const inputElement = document.createElement('input');

        renderHook(
            () =>
                useSuggestionsNavigation({
                    inputElement,
                    onSelectNext: mockOnSelectNext,
                    onSelectPrev: mockOnSelectPrev,
                    onApply: mockOnApply,
                    suggestion: undefined as unknown as TokenizedSuggestionsItem<TokenValueBase>,
                }),
            {wrapper},
        );

        const event = new KeyboardEvent('keydown', {key: 'ArrowDown'});

        act(() => {
            inputElement.dispatchEvent(event);
        });

        expect(mockOnSelectNext).toHaveBeenCalled();
    });

    it('should call onSelectPrev on ArrowUp', () => {
        const mockOnSelectNext = jest.fn();
        const mockOnSelectPrev = jest.fn();
        const mockOnApply = jest.fn();

        const inputElement = document.createElement('input');

        renderHook(
            () =>
                useSuggestionsNavigation({
                    inputElement,
                    onSelectNext: mockOnSelectNext,
                    onSelectPrev: mockOnSelectPrev,
                    onApply: mockOnApply,
                    suggestion: undefined as unknown as TokenizedSuggestionsItem<TokenValueBase>,
                }),
            {wrapper},
        );

        const event = new KeyboardEvent('keydown', {key: 'ArrowUp'});

        act(() => {
            inputElement.dispatchEvent(event);
        });

        expect(mockOnSelectPrev).toHaveBeenCalled();
    });

    it('should call onApply on Enter', () => {
        const mockOnSelectNext = jest.fn();
        const mockOnSelectPrev = jest.fn();
        const mockOnApply = jest.fn();
        const suggestion = {label: '1', search: '1', value: {}};

        const inputElement = document.createElement('input');

        renderHook(
            () =>
                useSuggestionsNavigation({
                    inputElement,
                    onSelectNext: mockOnSelectNext,
                    onSelectPrev: mockOnSelectPrev,
                    onApply: mockOnApply,
                    suggestion,
                }),
            {wrapper},
        );

        const event = new KeyboardEvent('keydown', {key: 'Enter'});

        act(() => {
            inputElement.dispatchEvent(event);
        });

        expect(mockOnApply).toHaveBeenCalledWith(suggestion);
    });
});
