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
import {useNavigationHandler} from '../useNavigationHandler';

describe('useNavigationHandler', () => {
    const mockOnFocus = jest.fn();
    const mockGetFocusRules = jest.fn();
    const mockGetCursorOffset = jest.fn();
    const mockCheckKey = jest.fn();

    const mockFocusInfo = {
        state: {
            focus: {idx: 1, key: 'value'},
        },
        callbacks: {
            onFocus: mockOnFocus,
            getFocusRules: mockGetFocusRules,
        },
    };

    const mockInputInfo = {
        state: {
            fields: [{key: 'key'}, {key: 'value'}],
            tokens: [
                {id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}},
                {id: '2', kind: 'regular', value: {key: 'Status', value: 'Active'}},
            ],
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

    it('should handle Tab key to move to next field', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Tab);
        mockGetFocusRules.mockReturnValue({
            nextField: {idx: 1, key: 'value'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            shiftKey: false,
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1,
            key: 'value',
        });
    });

    it('should handle Shift+Tab key to move to prev field', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Tab);
        mockGetFocusRules.mockReturnValue({
            prevField: {idx: 0, key: 'value'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            shiftKey: true,
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 0,
            key: 'value',
        });
    });

    it('should handle ArrowRight key to move to next field with field modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.ArrowRight);
        mockShortcuts.isFieldModifier.mockReturnValue(true);
        mockGetFocusRules.mockReturnValue({
            nextField: {idx: 1, key: 'value'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1,
            key: 'value',
        });
    });

    it('should handle ArrowLeft key to move to prev field with field modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.ArrowLeft);
        mockShortcuts.isFieldModifier.mockReturnValue(true);
        mockGetFocusRules.mockReturnValue({
            prevField: {idx: 0, key: 'value'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 0,
            key: 'value',
        });
    });

    it('should handle ArrowRight key to move to next token with token modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.ArrowRight);
        mockShortcuts.isFieldModifier.mockReturnValue(false);
        mockShortcuts.isTokenModifier.mockReturnValue(true);
        mockGetFocusRules.mockReturnValue({
            nextToken: {idx: 2, key: 'key'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 2,
            key: 'key',
        });
    });

    it('should handle ArrowLeft key to move to prev token with token modifier', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.ArrowLeft);
        mockShortcuts.isFieldModifier.mockReturnValue(false);
        mockShortcuts.isTokenModifier.mockReturnValue(true);
        mockGetFocusRules.mockReturnValue({
            prevToken: {idx: 0, key: 'key'},
        });

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 0,
            key: 'key',
        });
    });

    it('should return false for other keys', () => {
        mockCheckKey.mockReturnValue(false);

        const {result} = renderHook(
            () =>
                useNavigationHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                    getCursorOffset: mockGetCursorOffset,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(false);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});
