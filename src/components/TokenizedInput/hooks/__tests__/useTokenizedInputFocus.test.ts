import {act, renderHook} from '@testing-library/react';

import type {Token, TokenField, TokenizedInputInfo} from '../../types';
import {useTokenizedInputFocus} from '../useTokenizedInputFocus';

describe('useTokenizedInputFocus', () => {
    const mockFields: TokenField<any>[] = [{key: 'key'}, {key: 'value'}];

    const mockTokens: Token<any>[] = [
        {id: '1', kind: 'regular', value: {key: 'User', value: 'Ivan'}},
        {id: '2', kind: 'new', value: {key: 'Status', value: ''}},
    ];

    const mockOnApplyChanges = jest.fn();

    const mockInputInfo = {
        state: {
            tokens: mockTokens,
        },
        callbacks: {
            onApplyChanges: mockOnApplyChanges,
        },
    } as unknown as TokenizedInputInfo<any>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with no focus if autoFocus is false', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        expect(result.current.state.focus).toBeUndefined();
    });

    it('should initialize with focus on new token if autoFocus is true', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: true,
            }),
        );

        expect(result.current.state.focus).toEqual({
            idx: 1, // index of new token
            key: 'key',
            offset: -1,
        });
    });

    it('should handle onFocus to a regular token', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        act(() => {
            result.current.callbacks.onFocus({idx: 0, key: 'value', offset: 0});
        });

        expect(result.current.state.focus).toEqual({
            idx: 0,
            key: 'value',
            offset: 0,
        });
    });

    it('should handle onBlur', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: true,
            }),
        );

        expect(result.current.state.focus).toBeDefined();

        act(() => {
            result.current.callbacks.onBlur();
        });

        expect(result.current.state.focus).toBeUndefined();
    });

    it('should return correct focus rules', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        const rules = result.current.callbacks.getFocusRules({idx: 0, key: 'key', offset: -1});

        expect(rules.prevField).toEqual({idx: 0, key: 'key', offset: 0}); // Cannot go before first field of first token
        expect(rules.nextField).toEqual({idx: 0, key: 'value', offset: -1});
        expect(rules.prevToken).toEqual({idx: 0, key: 'key', offset: 0}); // Cannot go before first token
        expect(rules.nextToken).toEqual({idx: 0, key: 'value', offset: -1});
    });

    it('should return correct focus rules when moving between tokens', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        const rules = result.current.callbacks.getFocusRules({idx: 0, key: 'value', offset: -1});

        expect(rules.prevField).toEqual({idx: 0, key: 'value', offset: 0});
        expect(rules.nextField).toEqual({idx: 1, key: 'key', offset: -1});
        expect(rules.prevToken).toEqual({idx: 0, key: 'key', offset: 0});
        expect(rules.nextToken).toEqual({idx: 1, key: 'key', offset: -1}); // Next token is new token, so key is first field
    });
});
