import {renderHook} from '@testing-library/react';

import {useShortcuts} from '../useShortcuts';

describe('useShortcuts', () => {
    let originalUserAgent: string;

    beforeEach(() => {
        originalUserAgent = navigator.userAgent;
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'userAgent', {
            value: originalUserAgent,
            configurable: true,
        });
    });

    it('should return mac shortcuts when userAgent contains MAC', () => {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
            configurable: true,
        });

        const {result} = renderHook(() => useShortcuts());

        const event = {
            metaKey: true,
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
            code: 'KeyZ',
        } as KeyboardEvent;

        expect(result.current.isTokenModifier(event as unknown as React.KeyboardEvent)).toBe(true);
        expect(result.current.isUndo(event as unknown as React.KeyboardEvent)).toBe(true);
    });

    it('should return win shortcuts when userAgent does not contain MAC', () => {
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            configurable: true,
        });

        const {result} = renderHook(() => useShortcuts());

        const event = {
            metaKey: false,
            altKey: false,
            ctrlKey: true,
            shiftKey: false,
            code: 'KeyZ',
        } as KeyboardEvent;

        expect(result.current.isApplyModifier(event as unknown as React.KeyboardEvent)).toBe(true);
        expect(result.current.isUndo(event as unknown as React.KeyboardEvent)).toBe(true);
    });
});
