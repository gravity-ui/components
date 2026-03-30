import {act, renderHook} from '@testing-library/react';

import type {TokenField, TokenValueBase} from '../../types';
import {useTokenizedInputInfo} from '../useTokenizedInputInfo';

describe('useTokenizedInputInfo', () => {
    const mockFields: TokenField<TokenValueBase>[] = [{key: 'key'}, {key: 'value'}];

    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with external tokens', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        expect(result.current.state.tokens).toHaveLength(1);
        expect(result.current.state.tokens[0].value).toEqual({key: 'User', value: 'Ivan'});
        expect(result.current.state.tokens[0].kind).toBe('regular');
    });

    it('should handle onChangeToken for existing token', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onChangeToken(0, {value: 'Petr'});
        });

        expect(result.current.state.tokens[0].value).toEqual({key: 'User', value: 'Petr'});
        expect(mockOnChange).not.toHaveBeenCalled(); // onChange is called on apply
    });

    it('should handle onChangeToken for new token', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onChangeToken(1, {key: 'Status'});
        });

        expect(result.current.state.tokens).toHaveLength(2);
        expect(result.current.state.tokens[1].value).toEqual({key: 'Status', value: ''});
        expect(result.current.state.tokens[1].kind).toBe('new');
    });

    it('should remove empty token on onChangeToken', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onChangeToken(0, {key: ' ', value: ' '});
        });

        expect(result.current.state.tokens).toHaveLength(0);
    });

    it('should handle onApplyChanges', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onChangeToken(1, {key: 'Status', value: 'Active'});
        });

        act(() => {
            result.current.callbacks.onApplyChanges();
        });

        expect(mockOnChange).toHaveBeenCalledWith([
            {key: 'User', value: 'Ivan'},
            {key: 'Status', value: 'Active'},
        ]);
        expect(result.current.state.tokens[1].kind).toBe('regular');
    });

    it('should handle onRemoveToken', () => {
        const externalTokens = [
            {key: 'User', value: 'Ivan'},
            {key: 'Status', value: 'Active'},
        ];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onRemoveToken(0);
        });

        expect(result.current.state.tokens).toHaveLength(1);
        expect(result.current.state.tokens[0].value).toEqual({key: 'Status', value: 'Active'});
        expect(mockOnChange).toHaveBeenCalledWith([{key: 'Status', value: 'Active'}]);
    });

    it('should handle onClearInput', () => {
        const externalTokens = [
            {key: 'User', value: 'Ivan'},
            {key: 'Status', value: 'Active'},
        ];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onClearInput();
        });

        expect(result.current.state.tokens).toHaveLength(0);
        expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it('should handle undo and redo', () => {
        const externalTokens = [{key: 'User', value: 'Ivan'}];

        const {result} = renderHook(() =>
            useTokenizedInputInfo({
                tokens: externalTokens,
                fields: mockFields,
                onChange: mockOnChange,
            }),
        );

        act(() => {
            result.current.callbacks.onChangeToken(1, {key: 'Status', value: 'Active'});
        });

        act(() => {
            result.current.callbacks.onApplyChanges();
        });

        expect(result.current.state.tokens).toHaveLength(2);

        act(() => {
            result.current.callbacks.onUndo();
        });

        expect(result.current.state.tokens).toHaveLength(1);
        expect(mockOnChange).toHaveBeenCalledWith([{key: 'User', value: 'Ivan'}]);

        act(() => {
            result.current.callbacks.onRedo();
        });

        expect(result.current.state.tokens).toHaveLength(2);
        expect(mockOnChange).toHaveBeenCalledWith([
            {key: 'User', value: 'Ivan'},
            {key: 'Status', value: 'Active'},
        ]);
    });
});
