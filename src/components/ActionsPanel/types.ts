import {ButtonProps, DropdownMenuItem} from '@gravity-ui/uikit';

export type ActionItem = {
    /** Uniq action id */
    id: string;
    /** If true, then always inside the dropdown */
    collapsed?: boolean;
    /** Settings for dropdown action */
    dropdown: {
        item: DropdownMenuItem;
        group?: string;
    };
    /** Settings for button action */
    button: {
        props: ButtonProps;
    };
};

export type ActionsPanelProps = {
    /** Array of actions ActionItem[] */
    actions: ActionItem[];
    /** Close button click handler */
    onClose?: () => void;
    /** Render-prop for displaying the content of a note */
    renderNote?: () => React.ReactNode;
    className?: string;
};
