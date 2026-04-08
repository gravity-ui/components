import {act, renderHook} from '@testing-library/react';

import type {Token, TokenField, TokenValueBase, TokenizedInputInfo} from '../../types';
import {useTokenizedInputFocus} from '../useTokenizedInputFocus';

describe('useTokenizedInputFocus', () => {
    const mockFields: TokenField<TokenValueBase>[] = [{key: 'key'}, {key: 'value'}];

    const mockTokens: Token<TokenValueBase>[] = [
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
    } as unknown as TokenizedInputInfo<TokenValueBase>;

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

    it('should return correct focus rules for the first token', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        const rules = result.current.callbacks.getFocusRules({idx: 0, key: 'key', offset: -1});

        expect(rules.prevField).toEqual({idx: 0, key: 'key', offset: 0});
        expect(rules.nextField).toEqual({idx: 0, key: 'value', offset: -1});
        expect(rules.prevToken).toEqual({idx: 0, key: 'key', offset: 0});
        expect(rules.nextToken).toEqual({idx: 0, key: 'value', offset: -1});
    });

    it('should return correct focus rules for the last (new) token', () => {
        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: mockFields,
                inputInfo: mockInputInfo,
                autoFocus: false,
            }),
        );

        const rules = result.current.callbacks.getFocusRules({idx: 1, key: 'value', offset: -1});

        expect(rules.prevField).toEqual({idx: 1, key: 'value', offset: 0});
        expect(rules.nextField).toEqual({idx: 2, key: 'key', offset: -1});
        expect(rules.prevToken).toEqual({idx: 1, key: 'key', offset: 0});
        expect(rules.nextToken).toEqual({idx: 2, key: 'key', offset: -1});
    });

    it('should handle single field tokens', () => {
        const singleFieldMockInputInfo = {
            state: {
                tokens: mockTokens,
            },
            callbacks: {
                onApplyChanges: mockOnApplyChanges,
            },
        } as unknown as TokenizedInputInfo<TokenValueBase>;

        const {result} = renderHook(() =>
            useTokenizedInputFocus({
                fields: [{key: 'key'}],
                inputInfo: singleFieldMockInputInfo,
                autoFocus: false,
            }),
        );

        const rules = result.current.callbacks.getFocusRules({idx: 0, key: 'key', offset: -1});

        expect(rules.prevField).toEqual({idx: 0, key: 'key', offset: 0});
        expect(rules.nextField).toEqual({idx: 1, key: 'key', offset: -1});
        expect(rules.prevToken).toEqual({idx: 0, key: 'key', offset: 0});
        expect(rules.nextToken).toEqual({idx: 1, key: 'key', offset: -1});
    });
});
