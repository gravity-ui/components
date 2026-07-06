import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {useNavigation} from '../useNavigation';

const createItemRefs = (count: number): React.RefObject<HTMLButtonElement | null>[] =>
    Array.from({length: count}, () => ({current: document.createElement('button')}));

const dispatchKey = (key: string) => {
    act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {key}));
    });
};

describe('useNavigation', () => {
    beforeAll(() => {
        HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('uncontrolled mode', () => {
        it('should default to index 0', () => {
            const {result} = renderHook(() => useNavigation({itemRefs: createItemRefs(3)}));

            expect(result.current.activeItemIndex).toBe(0);
        });

        it('should respect initialItemIndex', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 2, itemRefs: createItemRefs(3)}),
            );

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should update the active index via setActiveItemIndex', () => {
            const {result} = renderHook(() => useNavigation({itemRefs: createItemRefs(3)}));

            act(() => {
                result.current.setActiveItemIndex(2);
            });

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should support a functional updater in setActiveItemIndex', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 1, itemRefs: createItemRefs(3)}),
            );

            act(() => {
                result.current.setActiveItemIndex((previous) => previous + 1);
            });

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should go to the next item', () => {
            const {result} = renderHook(() => useNavigation({itemRefs: createItemRefs(3)}));

            act(() => {
                result.current.handleGoToNext();
            });

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should wrap around to the first item after the last one', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 2, itemRefs: createItemRefs(3)}),
            );

            act(() => {
                result.current.handleGoToNext();
            });

            expect(result.current.activeItemIndex).toBe(0);
        });

        it('should go to the previous item', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 2, itemRefs: createItemRefs(3)}),
            );

            act(() => {
                result.current.handleGoToPrevious();
            });

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should wrap around to the last item before the first one', () => {
            const {result} = renderHook(() => useNavigation({itemRefs: createItemRefs(3)}));

            act(() => {
                result.current.handleGoToPrevious();
            });

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should call onActiveItemIndexChange with the next index', () => {
            const onActiveItemIndexChange = jest.fn();
            const {result} = renderHook(() =>
                useNavigation({onActiveItemIndexChange, itemRefs: createItemRefs(3)}),
            );

            act(() => {
                result.current.handleGoToNext();
            });

            expect(onActiveItemIndexChange).toHaveBeenCalledWith(1);
        });
    });

    describe('index clamping', () => {
        it('should clamp an initialItemIndex above the range', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 10, itemRefs: createItemRefs(3)}),
            );

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should clamp a negative initialItemIndex to 0', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: -5, itemRefs: createItemRefs(3)}),
            );

            expect(result.current.activeItemIndex).toBe(0);
        });

        it('should return 0 when there are no items', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 2, itemRefs: createItemRefs(0)}),
            );

            expect(result.current.activeItemIndex).toBe(0);
        });
    });

    describe('controlled mode', () => {
        it('should use the controlled activeItemIndex', () => {
            const {result} = renderHook(() =>
                useNavigation({activeItemIndex: 1, itemRefs: createItemRefs(3)}),
            );

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should clamp the controlled activeItemIndex', () => {
            const {result} = renderHook(() =>
                useNavigation({activeItemIndex: 10, itemRefs: createItemRefs(3)}),
            );

            expect(result.current.activeItemIndex).toBe(2);
        });

        it('should not change the value internally but notify via onActiveItemIndexChange', () => {
            const onActiveItemIndexChange = jest.fn();
            const {result} = renderHook(() =>
                useNavigation({
                    activeItemIndex: 1,
                    onActiveItemIndexChange,
                    itemRefs: createItemRefs(3),
                }),
            );

            act(() => {
                result.current.handleGoToNext();
            });

            expect(onActiveItemIndexChange).toHaveBeenCalledWith(2);
            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should reflect a new controlled activeItemIndex on rerender', () => {
            const {result, rerender} = renderHook(
                ({activeItemIndex}) =>
                    useNavigation({activeItemIndex, itemRefs: createItemRefs(3)}),
                {initialProps: {activeItemIndex: 0}},
            );

            expect(result.current.activeItemIndex).toBe(0);

            rerender({activeItemIndex: 2});

            expect(result.current.activeItemIndex).toBe(2);
        });
    });

    describe('keyboard navigation', () => {
        it('should go to the next item on ArrowRight', () => {
            const {result} = renderHook(() => useNavigation({itemRefs: createItemRefs(3)}));

            dispatchKey('ArrowRight');

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should go to the previous item on ArrowLeft', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 2, itemRefs: createItemRefs(3)}),
            );

            dispatchKey('ArrowLeft');

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should ignore unrelated keys', () => {
            const {result} = renderHook(() =>
                useNavigation({initialItemIndex: 1, itemRefs: createItemRefs(3)}),
            );

            dispatchKey('Enter');

            expect(result.current.activeItemIndex).toBe(1);
        });

        it('should remove the keydown listener on unmount', () => {
            const onActiveItemIndexChange = jest.fn();
            const {unmount} = renderHook(() =>
                useNavigation({onActiveItemIndexChange, itemRefs: createItemRefs(3)}),
            );

            unmount();
            dispatchKey('ArrowRight');

            expect(onActiveItemIndexChange).not.toHaveBeenCalled();
        });

        it('should not re-subscribe the keydown listener when the parent passes a new inline handler', () => {
            const itemRefs = createItemRefs(3);
            const addSpy = jest.spyOn(document, 'addEventListener');
            const removeSpy = jest.spyOn(document, 'removeEventListener');

            const {rerender} = renderHook(
                ({onActiveItemIndexChange}) => useNavigation({onActiveItemIndexChange, itemRefs}),
                {initialProps: {onActiveItemIndexChange: () => {}}},
            );

            const countKeydown = (spy: jest.SpyInstance) =>
                spy.mock.calls.filter(([type]) => type === 'keydown').length;
            const keydownAddsAfterMount = countKeydown(addSpy);

            // A fresh inline handler identity on each parent render must not tear down the listener.
            rerender({onActiveItemIndexChange: () => {}});
            rerender({onActiveItemIndexChange: () => {}});

            expect(countKeydown(addSpy)).toBe(keydownAddsAfterMount);
            expect(countKeydown(removeSpy)).toBe(0);

            addSpy.mockRestore();
            removeSpy.mockRestore();
        });

        it('should not re-subscribe the keydown listener while navigating', () => {
            const itemRefs = createItemRefs(3);
            const addSpy = jest.spyOn(document, 'addEventListener');
            const removeSpy = jest.spyOn(document, 'removeEventListener');

            const {result} = renderHook(() => useNavigation({itemRefs}));

            const countKeydown = (spy: jest.SpyInstance) =>
                spy.mock.calls.filter(([type]) => type === 'keydown').length;
            const keydownAddsAfterMount = countKeydown(addSpy);

            act(() => {
                result.current.handleGoToNext();
            });
            act(() => {
                result.current.handleGoToNext();
            });

            expect(countKeydown(addSpy)).toBe(keydownAddsAfterMount);
            expect(countKeydown(removeSpy)).toBe(0);

            addSpy.mockRestore();
            removeSpy.mockRestore();
        });

        it('should invoke the latest onActiveItemIndexChange after a rerender', () => {
            const itemRefs = createItemRefs(3);
            const first = jest.fn();
            const second = jest.fn();

            const {rerender} = renderHook(
                ({onActiveItemIndexChange}) => useNavigation({onActiveItemIndexChange, itemRefs}),
                {initialProps: {onActiveItemIndexChange: first}},
            );

            rerender({onActiveItemIndexChange: second});
            dispatchKey('ArrowRight');

            expect(first).not.toHaveBeenCalled();
            expect(second).toHaveBeenCalledWith(1);
        });

        describe('keyboardScope', () => {
            it('should ignore document-level keys when scoped to an element', () => {
                const scope = document.createElement('div');
                const {result} = renderHook(() =>
                    useNavigation({
                        itemRefs: createItemRefs(3),
                        keyboardScope: {current: scope},
                    }),
                );

                dispatchKey('ArrowRight');

                expect(result.current.activeItemIndex).toBe(0);
            });

            it('should navigate on keys dispatched within the scoped element', () => {
                const scope = document.createElement('div');
                document.body.appendChild(scope);

                const {result} = renderHook(() =>
                    useNavigation({
                        itemRefs: createItemRefs(3),
                        keyboardScope: {current: scope},
                    }),
                );

                act(() => {
                    scope.dispatchEvent(
                        new KeyboardEvent('keydown', {key: 'ArrowRight', bubbles: true}),
                    );
                });

                expect(result.current.activeItemIndex).toBe(1);

                document.body.removeChild(scope);
            });
        });
    });

    describe('scroll into view', () => {
        it('should scroll the active preview into view', () => {
            const itemRefs = createItemRefs(3);
            const scrollIntoView = itemRefs[2].current!.scrollIntoView as jest.Mock;

            renderHook(() => useNavigation({initialItemIndex: 2, itemRefs}));

            expect(scrollIntoView).toHaveBeenCalled();
        });
    });
});
