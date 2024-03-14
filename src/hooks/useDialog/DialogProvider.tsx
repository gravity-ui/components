import React from 'react';

import {getUniqId} from '@gravity-ui/uikit';
import omit from 'lodash/omit';

import {DialogContext} from './DialogContext';
import type {DialogRendererProps, DialogResult} from './types';

type DialogProviderProps = {
    children: React.ReactNode | React.ReactNode[];
};

export const DialogProvider = ({children}: DialogProviderProps) => {
    const [dialogs, setDialogs] = React.useState<Record<number, React.ReactNode>>({});
    const dialogsRef: React.MutableRefObject<Record<number, React.ReactNode>> =
        React.useRef(dialogs);

    if (dialogsRef.current !== dialogs) {
        dialogsRef.current = dialogs;
    }

    const contextValue = React.useMemo(
        () => ({
            openDialog: <ResultType extends unknown>(
                renderDialog: ({
                    onSuccess,
                    asyncOnSuccess,
                    onCancel,
                }: DialogRendererProps<ResultType>) => React.ReactNode,
            ) =>
                new Promise<{success: boolean; value?: ResultType}>((resolve) => {
                    const key = getUniqId();

                    const handleClose = (result: DialogResult<ResultType>) => {
                        resolve(result);

                        setDialogs(omit(dialogsRef.current, key));
                    };

                    const handleSuccess = (value: ResultType) => {
                        handleClose({success: true, value});
                    };

                    const handleSuccessPromise = async (
                        getValue: Promise<ResultType>,
                        onError?: (error: unknown) => void,
                    ) => {
                        try {
                            const value = await getValue;

                            handleClose({success: true, value});
                        } catch (error) {
                            if (onError) {
                                onError(error);
                                return;
                            }

                            throw error;
                        }
                    };

                    const handleCancel = () => {
                        handleClose({success: false});
                    };

                    const dialog = renderDialog({
                        onSuccess: handleSuccess,
                        asyncOnSuccess: handleSuccessPromise,
                        onCancel: handleCancel,
                    });

                    requestAnimationFrame(() => {
                        setDialogs({
                            ...dialogsRef.current,
                            [key]: dialog,
                        });
                    });
                }),
        }),
        [],
    );

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
            {Object.entries(dialogs).map(([key, dialog]) => (
                <React.Fragment key={key}>{dialog}</React.Fragment>
            ))}
        </DialogContext.Provider>
    );
};
