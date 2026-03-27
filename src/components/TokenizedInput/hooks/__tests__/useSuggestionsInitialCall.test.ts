import {renderHook} from '@testing-library/react';

import {useSuggestionsInitialCall} from '../useSuggestionsInitialCall';

describe('useSuggestionsInitialCall', () => {
    it('should initialize with true', () => {
        const {result} = renderHook(() => useSuggestionsInitialCall(undefined, 'focus-input'));

        expect(result.current.value.current).toBe(true);
    });

    it('should set initialCallRef to false when focus is provided and strategy is focus-input', () => {
        const {result} = renderHook(() =>
            useSuggestionsInitialCall({idx: 0, key: 'key'}, 'focus-input'),
        );

        expect(result.current.value.current).toBe(false);
    });

    it('should set initialCallRef to true when focus is not provided and strategy is focus-input', () => {
        const {result} = renderHook(() => useSuggestionsInitialCall(undefined, 'focus-input'));

        expect(result.current.value.current).toBe(true);
    });

    it('should set initialCallRef to true when strategy is not focus-input', () => {
        const {result} = renderHook(() =>
            useSuggestionsInitialCall({idx: 0, key: 'key'}, 'focus-field'),
        );

        expect(result.current.value.current).toBe(true);
    });

    it('should allow setting value manually', () => {
        const {result} = renderHook(() => useSuggestionsInitialCall(undefined, 'focus-input'));

        expect(result.current.value.current).toBe(true);

        result.current.setValue(false);

        expect(result.current.value.current).toBe(false);
    });

    it('should update initialCallRef when focus changes', () => {
        const {result, rerender} = renderHook(
            ({focus}) => useSuggestionsInitialCall(focus, 'focus-input'),
            {
                initialProps: {focus: undefined as any},
            },
        );

        expect(result.current.value.current).toBe(true);

        rerender({focus: {idx: 0, key: 'key'}});

        expect(result.current.value.current).toBe(false);
    });
});
