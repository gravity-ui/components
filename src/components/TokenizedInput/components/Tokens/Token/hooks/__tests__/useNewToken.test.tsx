import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {FocusContext, InputContext} from '../../../../../context/TokenizedInputContext';
import {useNewToken} from '../useNewToken';

describe('useNewToken', () => {
    const mockOnChangeToken = jest.fn();
    const mockOnFocus = jest.fn();

    const mockFields = [
        {key: 'key', type: 'text'},
        {key: 'value', type: 'text'},
    ];

    const mockInputInfo = {
        state: {
            tokens: [],
            fields: mockFields,
            placeholder: 'Placeholder',
        },
        callbacks: {
            onChangeToken: mockOnChangeToken,
        },
    };

    const mockFocusInfo = {
        state: {
            autoFocus: true,
        },
        callbacks: {
            onFocus: mockOnFocus,
        },
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <InputContext.Provider value={mockInputInfo as any}>
            <FocusContext.Provider value={mockFocusInfo as any}>{children}</FocusContext.Provider>
        </InputContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return default token if not present in tokens array', () => {
        const {result} = renderHook(() => useNewToken(0), {wrapper});

        expect(result.current.state.token).toEqual({
            id: 'new-token',
            value: {key: '', value: ''},
            kind: 'new',
        });
    });

    it('should return existing token if present in tokens array', () => {
        const inputInfoWithTokens = {
            ...mockInputInfo,
            state: {
                ...mockInputInfo.state,
                tokens: [{id: '1', kind: 'new', value: {key: 'User', value: ''}}],
            },
        };

        const wrapperWithTokens = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={inputInfoWithTokens as any}>
                <FocusContext.Provider value={mockFocusInfo as any}>
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useNewToken(0), {wrapper: wrapperWithTokens});

        expect(result.current.state.token).toEqual({
            id: '1',
            kind: 'new',
            value: {key: 'User', value: ''},
        });
    });

    it('should check if field is hidden', () => {
        const {result} = renderHook(() => useNewToken(0), {wrapper});

        expect(result.current.callbacks.checkIsHidden(0)).toBe(false); // First field is never hidden
        expect(result.current.callbacks.checkIsHidden(1)).toBe(true); // Second field is hidden because first is empty
    });

    it('should check if field is autoFocused', () => {
        const {result} = renderHook(() => useNewToken(0), {wrapper});

        expect(result.current.callbacks.checkIsAutoFocus(0)).toBe(true); // First field is autoFocused if autoFocus is true
        expect(result.current.callbacks.checkIsAutoFocus(1)).toBe(false); // Second field is never autoFocused
    });

    it('should return correct placeholder', () => {
        const {result} = renderHook(() => useNewToken(0), {wrapper});

        expect(result.current.callbacks.getPlaceholder(0)).toBe('Placeholder');
        expect(result.current.callbacks.getPlaceholder(1)).toBeUndefined();
    });

    it('should return correct placeholder from function', () => {
        const placeholderFn = jest.fn().mockReturnValue('Dynamic Placeholder');
        const inputInfoWithFnPlaceholder = {
            ...mockInputInfo,
            state: {
                ...mockInputInfo.state,
                placeholder: placeholderFn,
            },
        };

        const wrapperWithFnPlaceholder = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={inputInfoWithFnPlaceholder as any}>
                <FocusContext.Provider value={mockFocusInfo as any}>
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useNewToken(0), {wrapper: wrapperWithFnPlaceholder});

        expect(result.current.callbacks.getPlaceholder(0)).toBe('Dynamic Placeholder');
        expect(placeholderFn).toHaveBeenCalledWith('new', {key: '', value: ''}, 0);
    });
});
