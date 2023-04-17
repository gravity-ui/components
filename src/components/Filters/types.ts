import type {FieldControlProps} from './components/FieldControl/FieldControl';

export interface FilterSchema<Value = string, Options = any> {
    readonly id: string;
    readonly name: string;

    description?: string;
    emptyValueText?: string;

    initialValue: Value;

    showEmptyLabel?: boolean;

    fieldSelectTitleRenderer?: (id: string, value: Value) => React.ReactElement;
    fieldSwitchRenderer?: (props: FieldControlProps) => React.ReactElement;
    fieldControlRenderer?: (
        value: Value,
        fieldControlOptions: Options,
        handlers: {onClose: () => void; onSubmit: (id: string, value: any) => void},
    ) => React.ReactElement;

    renderValue: (value: Value) => string | undefined;

    onChange?: (value: Value) => void;

    fieldControlRendererOptions?: Options;

    skipControlRenderer?: boolean;
    readOnlyAfterApply?: boolean;
}
