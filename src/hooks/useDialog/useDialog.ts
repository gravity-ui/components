import React from 'react';

import {DialogContext} from './DialogContext';

export const useDialog = () => {
    return React.useContext(DialogContext);
};
