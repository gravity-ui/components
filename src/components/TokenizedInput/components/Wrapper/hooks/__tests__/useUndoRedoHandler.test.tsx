import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {FocusContext, InputContext} from '../../../../context/TokenizedInputContext';
import {useUndoRedoHandler} from '../useUndoRedoHandler';

describe('useUndoRedoHandler', () => {
    const mockOnFocus = jest.fn();
    const mockOnUndo = jest.fn();
    const mockOnRedo = jest.fn();

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'value'},
        },
        callbacks: {
            onFocus: mockOnFocus,
        },
    };

    const mockInputInfo = {
        state: {
            fields: [{key: 'value'}],
        },
        callbacks: {
            onUndo: mockOnUndo,
            onRedo: mockOnRedo,
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

    it('should handle undo', () => {
        mockShortcuts.isUndo.mockReturnValue(true);
        mockShortcuts.isRedo.mockReturnValue(false);
        mockOnUndo.mockReturnValue([{id: '1', kind: 'regular', value: {}}]);

        const {result} = renderHook(() => useUndoRedoHandler({shortcuts: mockShortcuts}), {
            wrapper,
        });

        const event = {preventDefault: jest.fn()} as unknown as React.KeyboardEvent;
        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnUndo).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 1,
            key: 'value',
            ignoreChecks: true,
        });
    });

    it('should handle redo', () => {
        mockShortcuts.isUndo.mockReturnValue(false);
        mockShortcuts.isRedo.mockReturnValue(true);
        mockOnRedo.mockReturnValue([{id: '1', kind: 'new', value: {}}]);

        const {result} = renderHook(() => useUndoRedoHandler({shortcuts: mockShortcuts}), {
            wrapper,
        });

        const event = {preventDefault: jest.fn()} as unknown as React.KeyboardEvent;
        const handled = result.current(event);

        expect(handled).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockOnRedo).toHaveBeenCalled();
        expect(mockOnFocus).toHaveBeenCalledWith({
            idx: 0,
            key: 'value',
            ignoreChecks: true,
        });
    });

    it('should return false if not undo or redo', () => {
        mockShortcuts.isUndo.mockReturnValue(false);
        mockShortcuts.isRedo.mockReturnValue(false);

        const {result} = renderHook(() => useUndoRedoHandler({shortcuts: mockShortcuts}), {
            wrapper,
        });

        const event = {preventDefault: jest.fn()} as unknown as React.KeyboardEvent;
        const handled = result.current(event);

        expect(handled).toBe(false);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});
