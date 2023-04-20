import {ButtonProps} from '@gravity-ui/uikit';

export type ActionItem = {
    /** Uniq action id */
    id: string;
    /** Render-props for the content inside Button or DropdownMenu components */
    renderContent: (component: 'button' | 'dropdown') => React.ReactNode;
    /** Click handler */
    handler?: () => void;
    /** Override props for action button */
    buttonProps?: ButtonProps;
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
