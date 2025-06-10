import * as React from 'react';

export interface ZoomContextValue {
    scale: number;
    position: {x: number; y: number};
    onDoubleClick?: () => void;
}

export const ZoomContext = React.createContext<ZoomContextValue | null>(null);

export const useZoom = () => {
    const context = React.useContext(ZoomContext);
    return context;
};

export interface ZoomProviderProps {
    children: React.ReactNode;
    value: ZoomContextValue;
}

export const ZoomProvider = ({children, value}: ZoomProviderProps) => {
    return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};
