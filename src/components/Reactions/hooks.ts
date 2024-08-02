import React from 'react';

import type {ReactionState} from './Reaction';
import {useReactionsContext} from './context';

const DELAY = {
    focusTimeout: 600,
    openTimeout: 200,
    closeTimeout: 200,
} as const;

export function useReactionsPopup(
    reaction: ReactionState,
    ref: React.RefObject<HTMLButtonElement>,
) {
    const {value} = reaction;

    const {openedTooltip: currentHoveredReaction, setOpenedTooltip: setCurrentHoveredReaction} =
        useReactionsContext();

    const {delayedCall: setDelayedOpen, clearTimeoutRef: clearOpenTimeout} = useTimeoutRef();
    const {delayedCall: setDelayedClose, clearTimeoutRef: clearCloseTimeout} = useTimeoutRef();

    const open = React.useCallback(() => {
        setCurrentHoveredReaction({reaction, open: true, ref});
    }, [reaction, ref, setCurrentHoveredReaction]);

    const close = React.useCallback(() => {
        clearOpenTimeout();

        if (currentHoveredReaction?.reaction.value === value && currentHoveredReaction.open) {
            setCurrentHoveredReaction({...currentHoveredReaction, open: false});
        }
    }, [clearOpenTimeout, currentHoveredReaction, setCurrentHoveredReaction, value]);

    const focus = React.useCallback(() => {
        clearCloseTimeout();

        // If already hovered over current reaction
        if (currentHoveredReaction && currentHoveredReaction.reaction.value === reaction.value) {
            // But if it's not opened yet
            if (!currentHoveredReaction.open) {
                setDelayedOpen(open, DELAY.openTimeout);
            }
        } else {
            setCurrentHoveredReaction({reaction, open: false, ref});

            setDelayedOpen(open, DELAY.openTimeout);
        }
    }, [
        clearCloseTimeout,
        currentHoveredReaction,
        open,
        reaction,
        ref,
        setCurrentHoveredReaction,
        setDelayedOpen,
    ]);

    const delayedOpenPopup = React.useCallback(() => {
        clearCloseTimeout();
        setDelayedOpen(focus, DELAY.focusTimeout);
    }, [clearCloseTimeout, focus, setDelayedOpen]);

    const delayedClosePopup = React.useCallback(() => {
        clearOpenTimeout();

        setDelayedClose(close, DELAY.closeTimeout);
    }, [clearOpenTimeout, close, setDelayedClose]);

    const onMouseEnter: React.MouseEventHandler<
        HTMLDivElement | HTMLButtonElement | HTMLAnchorElement
    > = delayedOpenPopup;

    const onMouseLeave: React.MouseEventHandler<
        HTMLDivElement | HTMLButtonElement | HTMLAnchorElement
    > = delayedClosePopup;

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

    const clearTimeoutRef = React.useCallback(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const delayedCall = React.useCallback(
        (handler: () => void, delay: number) => {
            clearTimeoutRef();
            timeoutRef.current = setTimeout(handler, delay);
        },
        [clearTimeoutRef],
    );

    return {delayedCall, clearTimeoutRef};
}
