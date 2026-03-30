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
import {useWrapper} from '../useWrapper';

jest.mock('../useKeyDownHandler', () => ({
    useKeyDownHandler: () => jest.fn(),
}));

describe('useWrapper', () => {
    const mockOnApplyChanges = jest.fn();
    const mockOnClearInput = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnFocus = jest.fn();

    const mockInputInfo = {
        state: {
            tokens: [{id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}}],
            fields: [{key: 'key'}, {key: 'value'}],
            isEditable: true,
            isClearable: true,
            className: 'custom-class',
            wrapperRef: {current: null},
        },
        callbacks: {
            onApplyChanges: mockOnApplyChanges,
            onClearInput: mockOnClearInput,
        },
    };

    const mockFocusInfo = {
        state: {
            focus: undefined,
        },
        callbacks: {
            onBlur: mockOnBlur,
            onFocus: mockOnFocus,
        },
    };

    const mockOptionsInfo = {
        shouldAllowBlur: jest.fn().mockReturnValue(true),
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
    });

    it('should return state and callbacks', () => {
        const {result} = renderHook(() => useWrapper(), {wrapper});

        expect(result.current.state.isEditable).toBe(true);
        expect(result.current.state.isClearable).toBe(true);
        expect(result.current.state.classNames.wrapper).toContain('custom-class');
        expect(result.current.state.wrapperRef).toEqual({current: null});

        expect(typeof result.current.callbacks.onBlur).toBe('function');
        expect(typeof result.current.callbacks.onKeyDown).toBe('function');
        expect(typeof result.current.callbacks.onClear).toBe('function');
    });

    it('should handle onClear', () => {
        const {result} = renderHook(() => useWrapper(), {wrapper});

        act(() => {
            result.current.callbacks.onClear();
        });

        expect(mockOnClearInput).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1, // length of tokens array
            key: 'key', // first field key
        });
    });

    it('should handle onBlur', () => {
        const {result} = renderHook(() => useWrapper(), {wrapper});

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(false),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        act(() => {
            result.current.callbacks.onBlur(event);
        });

        expect(mockOnBlur).toHaveBeenCalled();
        expect(mockOnApplyChanges).toHaveBeenCalled();
    });

    it('should generate correct class names based on focus and disabled state', () => {
        const disabledInputInfo = {
            ...mockInputInfo,
            state: {
                ...mockInputInfo.state,
                isEditable: false,
            },
        };

        const focusedFocusInfo = {
            ...mockFocusInfo,
            state: {
                focus: {idx: 0, key: 'key'},
            },
        };

        const disabledWrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider
                value={disabledInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={focusedFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
                >
                    <OptionsContext.Provider
                        value={
                            mockOptionsInfo as unknown as TokenizedInputOptionsInfo<TokenValueBase>
                        }
                    >
                        {children}
                    </OptionsContext.Provider>
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useWrapper(), {wrapper: disabledWrapper});

        expect(result.current.state.classNames.wrapper).toContain(
            'gc-tokenized-input__wrapper_disabled',
        );
        expect(result.current.state.classNames.wrapper).toContain(
            'gc-tokenized-input__wrapper_focused',
        );
    });
});
