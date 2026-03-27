import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {KeyCode} from '../../../../constants';
import {FocusContext, InputContext} from '../../../../context/TokenizedInputContext';
import {useDeleteHandler} from '../useDeleteHandler';

describe('useDeleteHandler', () => {
    const mockOnFocus = jest.fn();
    const mockOnRemoveToken = jest.fn();
    const mockOnChangeToken = jest.fn();
    const mockGetFocusRules = jest.fn();
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
        callbacks: {
            onRemoveToken: mockOnRemoveToken,
            onChangeToken: mockOnChangeToken,
        },
    };

    const mockShortcuts = {
        isTokenModifier: jest.fn(),
        isFieldModifier: jest.fn(),
        isApplyModifier: jest.fn(),
        isUndo: jest.fn(),
        isRedo: jest.fn(),
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <InputContext.Provider value={mockInputInfo as any}>
            <FocusContext.Provider value={mockFocusInfo as any}>{children}</FocusContext.Provider>
        </InputContext.Provider>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete token when token modifier is pressed', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Backspace);
        mockShortcuts.isTokenModifier.mockReturnValue(true);

        const {result} = renderHook(
            () =>
                useDeleteHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                }),
            {wrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {selectionStart: 0, selectionEnd: 0},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnRemoveToken).toHaveBeenCalledWith(1);
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1,
            key: 'key',
        });
    });

    it('should delete character when cursor is at the start of the input', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Backspace);
        mockShortcuts.isTokenModifier.mockReturnValue(false);
        mockGetFocusRules.mockReturnValue({
            prevField: {idx: 1, key: 'value'},
        });

        const deleteFocusInfo = {
            ...mockFocusInfo,
            state: {
                focus: {idx: 2, key: 'key'},
            },
        };

        const deleteInputInfo = {
            ...mockInputInfo,
            state: {
                ...mockInputInfo.state,
                tokens: [
                    ...mockInputInfo.state.tokens,
                    {id: '3', kind: 'regular', value: {key: 'key', value: 'value'}},
                ],
            },
            callbacks: {
                ...mockInputInfo.callbacks,
            },
        };

        const deleteWrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={deleteInputInfo as any}>
                <FocusContext.Provider value={deleteFocusInfo as any}>
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(
            () =>
                useDeleteHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                }),
            {wrapper: deleteWrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {selectionStart: 0, selectionEnd: 0},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnChangeToken).not.toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1,
            key: 'value',
            offset: -1,
        });
    });

    it('should not delete character if readOnlyField', () => {
        mockCheckKey.mockImplementation((_, key) => key === KeyCode.Backspace);
        mockShortcuts.isTokenModifier.mockReturnValue(false);
        mockGetFocusRules.mockReturnValue({
            prevField: {idx: 1, key: 'value'},
        });

        const readOnlyInputInfo = {
            ...mockInputInfo,
            state: {
                ...mockInputInfo.state,
                tokens: [
                    {id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}},
                    {
                        id: '2',
                        kind: 'regular',
                        value: {key: 'Status', value: 'Active'},
                        options: {readOnlyFields: ['value']},
                    },
                ],
            },
        };

        const readOnlyWrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={readOnlyInputInfo as any}>
                <FocusContext.Provider value={mockFocusInfo as any}>
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(
            () =>
                useDeleteHandler({
                    shortcuts: mockShortcuts,
                    checkKey: mockCheckKey,
                }),
            {wrapper: readOnlyWrapper},
        );

        const event = {
            preventDefault: jest.fn(),
            target: {selectionStart: 0, selectionEnd: 0},
        } as unknown as React.KeyboardEvent;

        const handled = result.current(event);

        expect(handled).toBe(false);
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(mockOnChangeToken).not.toHaveBeenCalled();
    });
});
