import * as React from 'react';

import {act, fireEvent, render, renderHook, screen} from '../../../../test-utils/utils';
import {GalleryProvider} from '../GalleryProvider';
import {useGallery} from '../useGallery';

jest.mock('../AsyncGallery', () => ({
    AsyncGallery: ({onOpenChange}: {onOpenChange: (open: boolean) => void}) => (
        <button onClick={() => onOpenChange(false)}>Close gallery</button>
    ),
}));

describe('GalleryProvider', () => {
    it('should notify only on open and close under StrictMode', () => {
        const onOpenChange = jest.fn();
        const {result, rerender, unmount} = renderHook(useGallery, {
            wrapper: ({children}) => (
                <React.StrictMode>
                    <GalleryProvider>{children}</GalleryProvider>
                </React.StrictMode>
            ),
        });

        act(() => result.current.openGallery([], 0, {onOpenChange}));
        rerender();

        expect(result.current.open).toBe(true);
        expect(onOpenChange.mock.calls).toEqual([[true]]);

        act(() => {
            result.current.closeGallery();
            result.current.closeGallery();
        });

        expect(result.current.open).toBe(false);
        expect(onOpenChange.mock.calls).toEqual([[true], [false]]);

        act(() => result.current.openGallery([], 0, {onOpenChange}));
        unmount();

        expect(onOpenChange.mock.calls).toEqual([[true], [false], [true]]);
    });

    it('should notify each owner when replacing the open gallery', () => {
        const events: string[] = [];
        const onA = (open: boolean) => events.push(`A:${open}`);
        const onB = (open: boolean) => events.push(`B:${open}`);
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});

        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => result.current.openGallery([], 0, {onOpenChange: onB}));

        expect(result.current.open).toBe(true);
        expect(events).toEqual(['A:true', 'A:false', 'A:true', 'A:false', 'B:true']);

        act(() => result.current.openGallery([]));
        const expected = ['A:true', 'A:false', 'A:true', 'A:false', 'B:true', 'B:false'];
        expect(events).toEqual(expected);

        act(() => result.current.closeGallery());

        expect(result.current.open).toBe(false);
        expect(events).toEqual(expected);
    });

    it('should skip a pending opening cancelled by the previous owner', () => {
        const events: string[] = [];
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});
        const onA = (open: boolean) => {
            events.push(`A:${open}`);
            if (!open) result.current.closeGallery();
        };
        const onB = (open: boolean) => events.push(`B:${open}`);

        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => result.current.openGallery([], 0, {onOpenChange: onB}));

        expect(result.current.open).toBe(false);
        expect(events).toEqual(['A:true', 'A:false']);
    });

    it('should skip a pending opening replaced by the previous owner', () => {
        const events: string[] = [];
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});
        const onC = (open: boolean) => events.push(`C:${open}`);
        const onA = (open: boolean) => {
            events.push(`A:${open}`);
            if (!open) result.current.openGallery([], 0, {onOpenChange: onC});
        };
        const onB = (open: boolean) => events.push(`B:${open}`);

        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => result.current.openGallery([], 0, {onOpenChange: onB}));

        expect(result.current.open).toBe(true);

        act(() => result.current.closeGallery());

        expect(events).toEqual(['A:true', 'A:false', 'C:true', 'C:false']);
    });

    it('should allow closing from the opening callback', () => {
        const events: boolean[] = [];
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});
        const onOpenChange = (open: boolean) => {
            events.push(open);
            if (open) result.current.closeGallery();
        };

        act(() => result.current.openGallery([], 0, {onOpenChange}));

        expect(result.current.open).toBe(false);
        expect(events).toEqual([true, false]);
    });

    it('should allow opening from the closing callback', () => {
        const events: string[] = [];
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});
        const onB = (open: boolean) => events.push(`B:${open}`);
        const onA = (open: boolean) => {
            events.push(`A:${open}`);
            if (!open) result.current.openGallery([], 0, {onOpenChange: onB});
        };

        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => result.current.closeGallery());

        expect(result.current.open).toBe(true);
        expect(events).toEqual(['A:true', 'A:false', 'B:true']);
    });

    it('should notify its owner when the gallery requests closing', () => {
        const onOpenChange = jest.fn();
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});

        act(() => result.current.openGallery([], 0, {onOpenChange}));
        fireEvent.click(screen.getByRole('button', {name: 'Close gallery'}));

        expect(result.current.open).toBe(false);
        expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });

    it('should keep the callback after the component that opened it unmounts', () => {
        const onOpenChange = jest.fn();
        const {rerender} = render(
            <GalleryProvider>
                <GallerySource onOpenChange={onOpenChange} />
            </GalleryProvider>,
        );

        fireEvent.click(screen.getByRole('button', {name: 'Open gallery'}));
        rerender(<GalleryProvider />);

        expect(onOpenChange.mock.calls).toEqual([[true]]);

        fireEvent.click(screen.getByRole('button', {name: 'Close gallery'}));

        expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });

    it('should notify the new owner if the previous callback throws', () => {
        const error = new Error('Closing callback failed');
        const onOpenChange = jest.fn();
        const {result} = renderHook(useGallery, {wrapper: GalleryProvider});
        const onA = (open: boolean) => {
            if (!open) throw error;
        };

        act(() => result.current.openGallery([], 0, {onOpenChange: onA}));
        act(() => {
            expect(() => result.current.openGallery([], 0, {onOpenChange})).toThrow(error);
        });
        act(() => result.current.closeGallery());

        expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });
});

function GallerySource({onOpenChange}: {onOpenChange: (open: boolean) => void}) {
    const {openGallery} = useGallery();

    return <button onClick={() => openGallery([], 0, {onOpenChange})}>Open gallery</button>;
}
