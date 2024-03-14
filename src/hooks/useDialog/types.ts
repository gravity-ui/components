import type React from 'react';

export type DialogResult<ResultType> = {
    success: boolean;
    value?: ResultType;
};

export type DialogRendererProps<ResultType> = {
    onSuccess: (value: ResultType) => void;
    asyncOnSuccess: (getValue: Promise<ResultType>, onError: (error: unknown) => void) => void;
    onCancel: () => void;
};

export type DialogRenderer<ResultType extends unknown> = ({
    onSuccess,
    asyncOnSuccess,
    onCancel,
}: DialogRendererProps<ResultType>) => React.ReactNode;

export type DialogContextType = {
    openDialog: <ResultType extends unknown>(
        renderDialog: DialogRenderer<ResultType>,
    ) => Promise<DialogResult<ResultType>>;
};
