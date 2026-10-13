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
        mockOptionsInfo.debounceDelay = 0;
        mockOptionsInfo.suggestionsInitialCall.value.current = true;
    });

    it('debounces requests and fetches only the latest input', async () => {
        mockOptionsInfo.debounceDelay = 300;
        mockOptionsInfo.suggestionsInitialCall.value.current = false;
        mockOnSuggest.mockResolvedValue({items: [], options: {isFilterable: false}});
        const {rerender} = renderHook(
            ({value}) =>
                useSuggestions({
                    idx: 0,
                    fieldKey: 'key',
                    value,
                    offset: value.length,
                    inputElement: null,
                }),
            {wrapper, initialProps: {value: 'a'}},
        );

        act(() => jest.advanceTimersByTime(200));
        rerender({value: 'ab'});
        act(() => jest.advanceTimersByTime(299));
        expect(mockOnSuggest).not.toHaveBeenCalled();

        await act(async () => {
            jest.advanceTimersByTime(1);
        });
        expect(mockOnSuggest).toHaveBeenCalledTimes(1);
        expect(mockOnSuggest).toHaveBeenCalledWith(expect.objectContaining({value: 'ab'}));
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
