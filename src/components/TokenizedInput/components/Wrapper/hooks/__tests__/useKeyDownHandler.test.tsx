import * as React from 'react';

import {renderHook} from '@testing-library/react';

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
import {useKeyDownHandler} from '../useKeyDownHandler';

jest.mock('../useShortcuts', () => ({
    useShortcuts: () => ({
        isTokenModifier: jest.fn(),
        isFieldModifier: jest.fn(),
        isApplyModifier: jest.fn(),
        isUndo: jest.fn(),
        isRedo: jest.fn(),
    }),
}));

jest.mock('../useNavigationHandler', () => ({
    useNavigationHandler: () => jest.fn().mockReturnValue(false),
}));

jest.mock('../useDeleteHandler', () => ({
    useDeleteHandler: () => jest.fn().mockReturnValue(false),
}));

jest.mock('../useBlurHandler', () => ({
    useBlurHandler: () => jest.fn().mockReturnValue(false),
}));

jest.mock('../useUndoRedoHandler', () => ({
    useUndoRedoHandler: () => jest.fn().mockReturnValue(false),
}));

describe('useKeyDownHandler', () => {
    const mockOnApplyChanges = jest.fn();
    const mockOnChangeToken = jest.fn();
    const mockOnFocus = jest.fn();
    const mockOnKeyDown = jest.fn();

    const mockAction = jest.fn();

    const mockInputInfo = {
        state: {
            tokens: [{id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}}],
            fields: [
                {
                    key: 'key',
                    specialKeysActions: [
                        {key: 'Enter', action: mockAction},
                        {key: (e: React.KeyboardEvent) => e.key === 'Space', action: mockAction},
                    ],
                },
                {key: 'value'},
            ],
        },
        callbacks: {
            onApplyChanges: mockOnApplyChanges,
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
        onKeyDown: mockOnKeyDown,
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

    it('should handle external onKeyDown', () => {
        mockOnKeyDown.mockReturnValue(true);

        const {result} = renderHook(() => useKeyDownHandler(), {wrapper});

        const event = {key: 'A', target: {selectionStart: 0}} as unknown as React.KeyboardEvent;
        result.current(event);

        expect(mockOnKeyDown).toHaveBeenCalledWith({
            token: mockInputInfo.state.tokens[0],
            offset: 0,
            focus: mockFocusInfo.state.focus,
            onFocus: mockOnFocus,
            onChange: mockOnChangeToken,
            onApply: mockOnApplyChanges,
            event,
        });
    });

    it('should handle specialKeysActions with string key', () => {
        mockOnKeyDown.mockReturnValue(false);

        const {result} = renderHook(() => useKeyDownHandler(), {wrapper});

        const event = {key: 'Enter', target: {selectionStart: 0}} as unknown as React.KeyboardEvent;
        result.current(event);

        expect(mockAction).toHaveBeenCalledWith({
            token: mockInputInfo.state.tokens[0],
            offset: 0,
            focus: mockFocusInfo.state.focus,
            onFocus: mockOnFocus,
            onChange: mockOnChangeToken,
            onApply: mockOnApplyChanges,
            event,
        });
    });

    it('should handle specialKeysActions with function key', () => {
        mockOnKeyDown.mockReturnValue(false);

        const {result} = renderHook(() => useKeyDownHandler(), {wrapper});

        const event = {key: 'Space', target: {selectionStart: 0}} as unknown as React.KeyboardEvent;
        result.current(event);

        expect(mockAction).toHaveBeenCalledWith({
            token: mockInputInfo.state.tokens[0],
            offset: 0,
            focus: mockFocusInfo.state.focus,
            onFocus: mockOnFocus,
            onChange: mockOnChangeToken,
            onApply: mockOnApplyChanges,
            event,
        });
    });

    it('should not handle specialKeysActions if focus is not on the field', () => {
        mockOnKeyDown.mockReturnValue(false);

        const focusInfoValue = {
            ...mockFocusInfo,
            state: {
                focus: {idx: 0, key: 'value'},
            },
        };

        const valueWrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider
                value={mockInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={focusInfoValue as unknown as TokenizedInputFocusInfo<TokenValueBase>}
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

        const {result} = renderHook(() => useKeyDownHandler(), {wrapper: valueWrapper});

        const event = {key: 'Enter', target: {selectionStart: 0}} as unknown as React.KeyboardEvent;
        result.current(event);

        expect(mockAction).not.toHaveBeenCalled();
    });
});
