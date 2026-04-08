import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {
    FocusContext,
    InputContext,
    OptionsContext,
} from '../../../../context/TokenizedInputContext';
import type {
    TokenValueBase,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
    TokenizedInputOptionsInfo,
} from '../../../../types';
import {useSuggestions} from '../useSuggestions';

describe('useSuggestions', () => {
    const mockOnSuggest = jest.fn();
    const mockOnChangeToken = jest.fn();
    const mockOnFocus = jest.fn();

    const mockInputInfo = {
        state: {
            tokens: [{id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}}],
            fields: [{key: 'key'}, {key: 'value'}],
        },
        callbacks: {
            onChangeToken: mockOnChangeToken,
        },
    };

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'key'},
        },
        callbacks: {
            onFocus: mockOnFocus,
        },
    };

    const mockOptionsInfo = {
        onSuggest: mockOnSuggest,
        debounceDelay: 0, // Set to 0 for easier testing
        suggestionsInitialCall: {
            value: {current: true},
            setValue: jest.fn(),
        },
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <InputContext.Provider
            value={mockInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
        >
            <FocusContext.Provider
                value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
            >
                <OptionsContext.Provider
                    value={mockOptionsInfo as unknown as TokenizedInputOptionsInfo<TokenValueBase>}
                >
                    {children}
                </OptionsContext.Provider>
            </FocusContext.Provider>
        </InputContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should fetch suggestions and update state', async () => {
        const mockSuggestions = {
            items: [{label: 'Status', search: 'Status', value: {key: 'Status'}}],
        };
        mockOnSuggest.mockResolvedValue(mockSuggestions);

        const {result} = renderHook(
            () =>
                useSuggestions({idx: 0, fieldKey: 'key', value: '', offset: 0, inputElement: null}),
            {wrapper},
        );

        expect(result.current.state.isLoading).toBe(true);

        await act(async () => {
            jest.runAllTimers();
        });

        expect(mockOnSuggest).toHaveBeenCalled();
        expect(result.current.state.isLoading).toBe(false);
        expect(result.current.state.suggestions.items).toEqual(mockSuggestions.items);
    });

    it('should not fetch suggestions if onSuggest is not provided', async () => {
        const optionsWithoutSuggest = {
            ...mockOptionsInfo,
            onSuggest: undefined,
        };

        const customWrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider
                value={mockInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
                >
                    <OptionsContext.Provider
                        value={
                            optionsWithoutSuggest as unknown as TokenizedInputOptionsInfo<TokenValueBase>
                        }
                    >
                        {children}
                    </OptionsContext.Provider>
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(
            () =>
                useSuggestions({idx: 0, fieldKey: 'key', value: '', offset: 0, inputElement: null}),
            {wrapper: customWrapper},
        );

        await act(async () => {
            jest.runAllTimers();
        });

        expect(result.current.state.isLoading).toBe(false);
        expect(result.current.state.suggestions.items).toEqual([]);
    });
});
