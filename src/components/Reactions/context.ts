import * as React from 'react';

import type {ReactionState} from './Reaction';

export interface ReactionsContextTooltipProps {
    reaction: ReactionState;
    element: HTMLButtonElement;
    open: boolean;
}

export interface ReactionsContext {
    openedTooltip?: ReactionsContextTooltipProps;
    setOpenedTooltip: (props: ReactionsContextTooltipProps | undefined) => void;
}

const context = React.createContext<ReactionsContext>({
    setOpenedTooltip: () => undefined,
});

export const ReactionsContextProvider = context.Provider;

export function useReactionsContext(): ReactionsContext {
    return React.useContext(context);
}
