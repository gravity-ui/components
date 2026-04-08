import {renderHook} from '@testing-library/react';

import type {TokenValueBase, TokenizedInputFocusInfo} from '../../types';
import {useTokenizedInputComponentFocus} from '../useTokenizedInputComponentFocus';

describe('useTokenizedInputComponentFocus', () => {
    it('should call onFocus when focus changes from empty to not empty', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();

        const {rerender} = renderHook(
            ({focusInfo}) =>
                useTokenizedInputComponentFocus({
                    focusInfo,
                    onFocus,
                    onBlur,
                }),
            {
                initialProps: {
                    focusInfo: {
                        state: {focus: undefined},
                    } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
                },
            },
        );

        expect(onFocus).not.toHaveBeenCalled();
        expect(onBlur).not.toHaveBeenCalled();

        rerender({
            focusInfo: {
                state: {focus: {idx: 0, key: 'key'}},
            } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
        });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).not.toHaveBeenCalled();
    });

    it('should call onBlur when focus changes from not empty to empty', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();

        const {rerender} = renderHook(
            ({focusInfo}) =>
                useTokenizedInputComponentFocus({
                    focusInfo,
                    onFocus,
                    onBlur,
                }),
            {
                initialProps: {
                    focusInfo: {
                        state: {focus: {idx: 0, key: 'key'}},
                    } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
                },
            },
        );

        expect(onFocus).toHaveBeenCalledTimes(1); // called on initial render because it goes from null to 0
        expect(onBlur).not.toHaveBeenCalled();

        rerender({
            focusInfo: {
                state: {focus: undefined},
            } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
        });

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should not call onFocus or onBlur when focus changes between different tokens', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();

        const {rerender} = renderHook(
            ({focusInfo}) =>
                useTokenizedInputComponentFocus({
                    focusInfo,
                    onFocus,
                    onBlur,
                }),
            {
                initialProps: {
                    focusInfo: {
                        state: {focus: {idx: 0, key: 'key'}},
                    } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
                },
            },
        );

        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onBlur).not.toHaveBeenCalled();

        rerender({
            focusInfo: {
                state: {focus: {idx: 1, key: 'key'}},
            } as unknown as TokenizedInputFocusInfo<TokenValueBase>,
        });

        expect(onFocus).toHaveBeenCalledTimes(1); // not called again
        expect(onBlur).not.toHaveBeenCalled();
    });
});
