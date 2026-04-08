import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {TokenizedInputComponentContextProvider} from '../../../../../context/TokenizedInputComponentsContext';
import {
    FocusContext,
    InputContext,
    OptionsContext,
} from '../../../../../context/TokenizedInputContext';
import type {
    TokenValueBase,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
    TokenizedInputOptionsInfo,
} from '../../../../../types';
import {useRegularToken} from '../useRegularToken';

describe('useRegularToken', () => {
    const mockOnChangeToken = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnRemoveToken = jest.fn();
    const mockOnApplyChanges = jest.fn();

    const mockFields = [
        {key: 'key', type: 'text'},
        {key: 'value', type: 'text'},
    ];

    const mockToken = {
        id: '1',
        kind: 'regular',
        value: {key: 'User', value: 'Ivan'},
    };

    const mockInputInfo = {
        state: {
            tokens: [mockToken],
            fields: mockFields,
            placeholder: 'Placeholder',
            isEditable: true,
        },
        callbacks: {
            onChangeToken: mockOnChangeToken,
            onRemoveToken: mockOnRemoveToken,
            onApplyChanges: mockOnApplyChanges,
        },
    };

    const mockFocusInfo = {
        state: {
            autoFocus: false,
        },
        callbacks: {
            onFocus: mockOnFocus,
        },
    };

    const mockOptionsInfo = {
        shouldAllowBlur: jest.fn().mockReturnValue(true),
    };

    const mockComponentsInfo = {
        Field: () => <div />,
        Wrapper: () => <div />,
        TokenList: () => <div />,
        Token: () => <div />,
        Suggestions: () => <div />,
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
                    <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                        {children}
                    </TokenizedInputComponentContextProvider>
                </OptionsContext.Provider>
            </FocusContext.Provider>
        </InputContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return token state and callbacks', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        expect(result.current.state.token).toEqual(mockToken);
        expect(result.current.state.showRemoveButton).toBe(true);
        expect(result.current.state.isEditable).toBe(true);
    });

    it('should handle onChangeField', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        act(() => {
            result.current.callbacks.onChangeField(0, 'key', 'NewUser');
        });

        expect(mockOnChangeToken).toHaveBeenCalledWith(0, {key: 'NewUser'});
    });

    it('should handle onRemove', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        act(() => {
            result.current.callbacks.onRemove();
        });

        expect(mockOnRemoveToken).toHaveBeenCalledWith(0);
        expect(mockOnFocus).toHaveBeenCalledWith({idx: 0, key: 'key'});
    });

    it('should handle onBlur and apply changes if there are changes', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        act(() => {
            result.current.callbacks.onChangeField(0, 'key', 'NewUser');
        });

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(false),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        act(() => {
            result.current.callbacks.onBlur(event);
        });

        expect(mockOnApplyChanges).toHaveBeenCalledWith(true);
    });

    it('should not apply changes on blur if there are no changes', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(false),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        act(() => {
            result.current.callbacks.onBlur(event);
        });

        expect(mockOnApplyChanges).not.toHaveBeenCalled();
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
            <InputContext.Provider
                value={inputInfoWithFnPlaceholder as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
                >
                    <OptionsContext.Provider
                        value={
                            mockOptionsInfo as unknown as TokenizedInputOptionsInfo<TokenValueBase>
                        }
                    >
                        <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                            {children}
                        </TokenizedInputComponentContextProvider>
                    </OptionsContext.Provider>
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useRegularToken(0), {wrapper: wrapperWithFnPlaceholder});

        expect(result.current.callbacks.getPlaceholder(0)).toBe('Dynamic Placeholder');
        expect(placeholderFn).toHaveBeenCalledWith('regular', {key: 'User', value: 'Ivan'}, 0);
    });

    it('should return undefined placeholder if placeholder is not a function', () => {
        const {result} = renderHook(() => useRegularToken(0), {wrapper});

        expect(result.current.callbacks.getPlaceholder(0)).toBeUndefined();
    });
});
