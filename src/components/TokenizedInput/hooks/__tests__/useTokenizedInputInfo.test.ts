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

    describe('tokenErrors', () => {
        it('should merge external errors with validateToken errors', () => {
            const externalTokens = [{key: 'User', value: 'Ivan'}];
            const validateToken = () => ({key: 'internal error'});
            const tokenErrors = [{value: 'external error'}];

            const {result} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken,
                    tokenErrors,
                }),
            );

            expect(result.current.state.tokens[0].errors).toEqual({
                key: 'internal error',
                value: 'external error',
            });
        });

        it('should give external errors priority over validateToken for the same field', () => {
            const externalTokens = [{key: 'User', value: 'Ivan'}];
            const validateToken = () => ({key: 'internal'});
            const tokenErrors = [{key: 'external'}];

            const {result} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken,
                    tokenErrors,
                }),
            );

            expect(result.current.state.tokens[0].errors).toEqual({key: 'external'});
        });

        it('should not apply external errors to new tokens', () => {
            const externalTokens = [{key: 'User', value: 'Ivan'}];
            const tokenErrors = [undefined, {key: 'error'}];

            const {result} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken: false,
                    tokenErrors,
                }),
            );

            act(() => {
                result.current.callbacks.onChangeToken(1, {key: 'Status'});
            });

            expect(result.current.state.tokens[1].kind).toBe('new');
            expect(result.current.state.tokens[1].errors).toBeUndefined();
        });

        it('should skip undefined entries in tokenErrors', () => {
            const externalTokens = [
                {key: 'User', value: 'Ivan'},
                {key: 'Status', value: 'Active'},
            ];
            const tokenErrors = [undefined, {key: 'error'}];

            const {result} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken: false,
                    tokenErrors,
                }),
            );

            expect(result.current.state.tokens[0].errors).toBeUndefined();
            expect(result.current.state.tokens[1].errors).toEqual({key: 'error'});
        });

        it('should update displayed errors when tokenErrors prop changes', () => {
            const externalTokens = [{key: 'User', value: 'Ivan'}];
            let tokenErrors: ({key?: string} | undefined)[] = [{key: 'old error'}];

            const {result, rerender} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken: false,
                    tokenErrors,
                }),
            );

            expect(result.current.state.tokens[0].errors).toEqual({key: 'old error'});

            tokenErrors = [{key: 'new error'}];
            rerender();

            expect(result.current.state.tokens[0].errors).toEqual({key: 'new error'});
        });

        it('should show no errors when tokenErrors is undefined', () => {
            const externalTokens = [{key: 'User', value: 'Ivan'}];

            const {result} = renderHook(() =>
                useTokenizedInputInfo({
                    tokens: externalTokens,
                    fields: mockFields,
                    onChange: mockOnChange,
                    validateToken: false,
                }),
            );

            expect(result.current.state.tokens[0].errors).toBeUndefined();
        });
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
