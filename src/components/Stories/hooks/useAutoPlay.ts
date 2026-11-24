import * as React from 'react';

interface UseAutoPlayOptions {
    open: boolean;
    interval: number;
    onComplete?: () => void;
}

// Each slide mounts its own timer. Only time spent in an open story on a visible tab counts.
export function useAutoPlay({open, interval, onComplete}: UseAutoPlayOptions) {
    const [progress, setProgress] = React.useState(0);
    const [hidden, setHidden] = React.useState(
        () => typeof document !== 'undefined' && document.hidden,
    );
    const elapsed = React.useRef(0);
    const onCompleteRef = React.useRef(onComplete);

    React.useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    React.useEffect(() => {
        const handleVisibilityChange = () => setHidden(document.hidden);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    React.useEffect(() => {
        elapsed.current = 0;
        setProgress(0);
    }, [open, interval]);

    React.useEffect(() => {
        if (!open || hidden || elapsed.current >= interval) {
            return undefined;
        }

        const startedAt = Date.now();
        const previousElapsed = elapsed.current;
        let timeout: ReturnType<typeof setTimeout>;

        const tick = () => {
            elapsed.current = Math.min(previousElapsed + Date.now() - startedAt, interval);
            setProgress(elapsed.current / interval);

            if (elapsed.current >= interval) {
                onCompleteRef.current?.();
            } else {
                timeout = setTimeout(tick, Math.min(16, interval - elapsed.current));
            }
        };

        timeout = setTimeout(tick, Math.min(16, interval - elapsed.current));

        return () => {
            clearTimeout(timeout);
            elapsed.current = Math.min(previousElapsed + Date.now() - startedAt, interval);
        };
    }, [open, hidden, interval]);

    return progress;
}
