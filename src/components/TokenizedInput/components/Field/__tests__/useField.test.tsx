import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {TokenizedInputComponentContextProvider} from '../../../context/TokenizedInputComponentsContext';
import {FocusContext, OptionsContext} from '../../../context/TokenizedInputContext';
import {useField} from '../useField';

describe('useField', () => {
    const mockOnFocus = jest.fn();
    const mockOnChange = jest.fn();

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'key'},
        },
    };

    const mockOptionsInfo = {
        onSuggest: jest.fn(),
        shouldAllowBlur: jest.fn().mockReturnValue(true),
        suggestionsInitialCall: {
            setValue: jest.fn(),
        },
    };

    const mockComponentsInfo = {
        Suggestions: () => <div />,
        Field: () => <div />,
        Wrapper: () => <div />,
        TokenList: () => <div />,
        Token: () => <div />,
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <FocusContext.Provider value={mockFocusInfo as any}>
            <OptionsContext.Provider value={mockOptionsInfo as any}>
                <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                    {children}
                </TokenizedInputComponentContextProvider>
            </OptionsContext.Provider>
        </FocusContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize correctly', () => {
        const {result} = renderHook(
            () =>
                useField({
                    idx: 0,
                    fieldKey: 'key',
                    value: 'value',
                    onFocus: mockOnFocus,
                    onChange: mockOnChange,
                }),
            {wrapper},
        );

        expect(result.current.state.isFocused).toBe(true);
        expect(result.current.state.visibleValue).toBe('value');
    });

    it('should handle onChange', () => {
        const {result} = renderHook(
            () =>
                useField({
                    idx: 0,
                    fieldKey: 'key',
                    value: 'value',
                    onFocus: mockOnFocus,
                    onChange: mockOnChange,
                }),
            {wrapper},
        );

        const event = {
            target: {value: 'new value'},
        } as React.ChangeEvent<HTMLInputElement>;

        act(() => {
            result.current.inputProps.onChange?.(event);
        });

        expect(mockOnChange).toHaveBeenCalledWith(0, 'key', 'new value');
        expect(result.current.state.hideSuggestions).toBe(false);
    });

    it('should handle onFocus', () => {
        const {result} = renderHook(
            () =>
                useField({
                    idx: 0,
                    fieldKey: 'key',
                    value: 'value',
                    onFocus: mockOnFocus,
                    onChange: mockOnChange,
                }),
            {wrapper},
        );

        act(() => {
            result.current.inputProps.onFocus?.({} as React.FocusEvent<HTMLInputElement>);
        });

        expect(mockOnFocus).toHaveBeenCalledWith(0, 'key');
    });

    it('should handle onMouseDown and onMouseUp', () => {
        const {result} = renderHook(
            () =>
                useField({
                    idx: 0,
                    fieldKey: 'key',
                    value: 'value',
                    onFocus: mockOnFocus,
                    onChange: mockOnChange,
                }),
            {wrapper},
        );

        act(() => {
            result.current.inputProps.onMouseDown?.({} as React.MouseEvent<HTMLInputElement>);
        });

        expect(mockOptionsInfo.suggestionsInitialCall.setValue).toHaveBeenCalledWith(true);

        act(() => {
            result.current.inputProps.onMouseUp?.({} as React.MouseEvent<HTMLInputElement>);
        });
    });

    it('should handle onClick', () => {
        const {result} = renderHook(
            () =>
                useField({
                    idx: 0,
                    fieldKey: 'key',
                    value: 'value',
                    onFocus: mockOnFocus,
                    onChange: mockOnChange,
                }),
            {wrapper},
        );

        act(() => {
            result.current.inputProps.onClick?.({} as React.MouseEvent<HTMLInputElement>);
        });

        expect(result.current.state.hideSuggestions).toBe(false);
    });
});
