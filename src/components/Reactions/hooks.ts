import React from 'react';

import {useStableCallback} from '../utils/useStableCallback';

import type {ReactionProps} from './Reaction';
import {useReactionsContext} from './context';

const DELAY = {
    focusTimeout: 600,
    openTimeout: 200,
    closeTimeout: 100,
} as const;

export function useReactionsPopup(
    reaction: ReactionProps,
    ref: React.RefObject<HTMLButtonElement>,
) {
    const {value} = reaction;

    const {openedTooltip: currentHoveredReaction, setOpenedTooltip: setCurrentHoveredReaction} =
        useReactionsContext();

    const {delayedCall: setDelayedOpen, clearTimeoutRef: clearOpenTimeout} = useTimeoutRef();
    const {delayedCall: setDelayedClose, clearTimeoutRef: clearCloseTimeout} = useTimeoutRef();

    const open = useStableCallback(() => {
        setCurrentHoveredReaction({reaction, open: true, ref});
    });

    const close = useStableCallback(() => {
        clearOpenTimeout();

        if (currentHoveredReaction?.reaction.value === value && currentHoveredReaction.open) {
            setCurrentHoveredReaction({...currentHoveredReaction, open: false});
        }
    });

    const focus = useStableCallback(() => {
        clearCloseTimeout();
        setCurrentHoveredReaction({reaction, open: false, ref});

        setDelayedOpen(open, DELAY.openTimeout);
    });

    const delayedOpenPopup = useStableCallback(() => {
        setDelayedOpen(focus, DELAY.focusTimeout);
    });

    const delayedClosePopup = useStableCallback(() => {
        clearOpenTimeout();

        setDelayedClose(close, DELAY.closeTimeout);
    });

    const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = delayedOpenPopup;

    const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = delayedClosePopup;

    React.useEffect(() => {
        // When the tab gets focus we need to hide the popup,
        // because the user might have changed the cursor position.
        window.addEventListener('focus', close);

        return () => {
            window.removeEventListener('focus', close);
        };
    }, [close]);

    return {onMouseEnter, onMouseLeave};
}

function useTimeoutRef() {
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimeoutRef = useStableCallback(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    });

    const delayedCall = useStableCallback((handler: () => void, delay: number) => {
        clearTimeoutRef();
        timeoutRef.current = setTimeout(handler, delay);
    });

    return {delayedCall, clearTimeoutRef};
}
