import React from 'react';

import type {DialogContextType} from './types';

export const DialogContext = React.createContext<DialogContextType>({
    openDialog: () => Promise.resolve({success: false}),
});
