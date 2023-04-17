import React from 'react';
import {createFocusTrap, FocusTrap} from 'focus-trap';
import {isFocusable} from 'tabbable';

interface UseFocusTrapProps {
    enabled?: boolean;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
}

export function useFocusTrap({
    enabled = true,
    restoreFocus = true,
    restoreFocusRef,
}: UseFocusTrapProps = {}) {
    const containerProps = useRestoreFocus({enabled, restoreFocus, restoreFocusRef});

    const trapRef = React.useRef<FocusTrap>();

    const setFocusTrap = React.useCallback(
        (node: HTMLElement | null) => {
            if (node && enabled) {
                trapRef.current = createFocusTrap(node, {
                    returnFocusOnDeactivate: false,
                    fallbackFocus: () => node,
                    escapeDeactivates: false,
                    allowOutsideClick: true,
                });
                trapRef.current.activate();
            } else {
                trapRef.current?.deactivate();
                trapRef.current = undefined;
            }
        },
        [enabled],
    );

    return [setFocusTrap, containerProps] as const;
}

interface UseRestoreFocusProps {
    enabled: boolean;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
}
function useRestoreFocus({enabled, restoreFocus, restoreFocusRef}: UseRestoreFocusProps) {
    const ref = React.useRef<HTMLElement | null>(null);

    const initialActiveElementRef = React.useRef<HTMLElement | null>(null);
    const lastActiveElementRef = React.useRef<HTMLElement | null>(null);

    const onFocus = (event: React.FocusEvent) => {
        if (enabled && initialActiveElementRef.current === null) {
            initialActiveElementRef.current = event.relatedTarget as HTMLElement | null;
        }
    };

    React.useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const element = event.target;
            if (element instanceof HTMLElement && isFocusable(element)) {
                lastActiveElementRef.current = element;
            } else {
                lastActiveElementRef.current = null;
            }
        };

        window.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('touchstart', handlePointerDown);
        return () => {
            window.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('touchstart', handlePointerDown);
        };
    }, [enabled]);

    React.useLayoutEffect(() => {
        ref.current = restoreFocus
            ? (restoreFocusRef?.current || initialActiveElementRef.current) ?? null
            : null;
    });

    React.useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        return () => {
            let element = ref.current;
            const lastActive = lastActiveElementRef.current;
            if (lastActive && document.contains(lastActive)) {
                element = lastActive;
            }
            if (
                element &&
                typeof element.focus === 'function' &&
                document.contains(element) &&
                element !== document.activeElement
            ) {
                element.focus();
            }
            initialActiveElementRef.current = null;
            lastActiveElementRef.current = null;
        };
    }, [enabled]);

    return {onFocus};
}
