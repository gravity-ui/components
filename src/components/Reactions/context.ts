import React from 'react';

import type {ReactionProps} from './Reaction';

export interface ReactionsContextTooltipProps {
    reaction: ReactionProps;
    ref: React.RefObject<HTMLButtonElement>;
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
