import * as React from 'react';

export const useOnIntersected = (
    element: Element | null,
    onIntersected: () => void,
    options?: IntersectionObserverInit,
) => {
    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersected();
            }
        }, options);

        if (element) {
            observer.observe(element);
        }

        return () => (element === null ? undefined : observer.unobserve(element));
    }, [element, onIntersected, options]);
};
