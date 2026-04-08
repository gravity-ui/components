import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {KeyCode} from '../../../../constants';
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
import {useBlurHandler} from '../useBlurHandler';

describe('useBlurHandler', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnApplyChanges = jest.fn();
    const mockGetFocusRules = jest.fn();
    const mockGetCursorOffset = jest.fn();
    const mockCheckKey = jest.fn();

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'value'},
        },
        callbacks: {
            onFocus: mockOnFocus,
            onBlur: mockOnBlur,
            getFocusRules: mockGetFocusRules,
        },
    };

    const mockInputInfo = {
        callbacks: {
            onApplyChanges: mockOnApplyChanges,
        },
    };

    const mockOptionsInfo = {
        shouldAllowBlur: jest.fn().mockReturnValue(true),
    };

    const mockShortcuts = {
        isTokenModifier: jest.fn(),
        isFieldModifier: jest.fn(),
        isApplyModifier: jest.fn(),
        isUndo: jest.fn(),
        isRedo: jest.fn(),
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

    it('should handle Escape key', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Escape);

        const {result} = renderHook(
            () =>
                useBlurHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {blur: jest.fn()},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect((event.target as HTMLInputElement).blur).toHaveBeenCalled();
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should handle Enter key with apply modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Enter);
        mockShortcuts.isApplyModifier.mockReturnValue(true);

        const {result} = renderHook(
            () =>
                useBlurHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {blur: jest.fn()},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnApplyChanges).toHaveBeenCalled();
        expect((event.target as HTMLInputElement).blur).toHaveBeenCalled();
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('should handle Enter key without apply modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Enter);
        mockShortcuts.isApplyModifier.mockReturnValue(false);
        mockGetCursorOffset.mockReturnValue(5);
        mockGetFocusRules.mockReturnValue({
            nextToken: {idx: 1, key: 'value'},
        });

        const {result} = renderHook(
            () =>
                useBlurHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {blur: jest.fn()},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnApplyChanges).toHaveBeenCalled();
        expect(mockGetCursorOffset).toHaveBeenCalledWith(event.target);
        expect(mockGetFocusRules).toHaveBeenCalledWith({
            idx: 0,
            key: 'value',
            offset: 5,
        });
        expect(mockOnFocus).toHaveBeenCalledWith({idx: 1, key: 'value'});
        expect((event.target as HTMLInputElement).blur).not.toHaveBeenCalled();
    });

    it('should return false for other keys', () => {
        mockCheckKey.mockReturnValue(false);

        const {result} = renderHook(
            () =>
                useBlurHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {blur: jest.fn()},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(false);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});
