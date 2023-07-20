import React from 'react';

/**
 * Debounce-like hook to delay value update.
 *
 * @param value External value that will be eventually replaced by user input.
 * @param onChange Function to update value param after specified delay.
 * @param delay Time to wait after last delayedOnChange invocation before onChange is called.
 *
 * @example
 * const [searchTerm, setSearchTerm] = React.useState('');
 *
 * const {currentValue: userSearchTermInput, delayedOnChange: handleUserSearchTermInput} = useDelayedValue(searchTerm, setSearchTerm);
 */
export function useDelayedValue<TValue = unknown>(
    value: TValue,
    onChange: (value: TValue) => void,
    delay = 200,
) {
    const [currentValue, setCurrentValue] = React.useState<TValue>(value);

    const timeoutRef = React.useRef<number>();

    const delayedOnChange = React.useCallback(
        (nextValue: TValue) => {
            setCurrentValue(nextValue);

            window.clearTimeout(timeoutRef.current);

            timeoutRef.current = window.setTimeout(() => {
                onChange(nextValue);
            }, delay);
        },
        [delay, onChange],
    );

    React.useEffect(() => {
        setCurrentValue((currValue) => (currValue === value ? currValue : value));
    }, [value]);

    return {
        currentValue,
        delayedOnChange,
    };
}
