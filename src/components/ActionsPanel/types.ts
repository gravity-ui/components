export type ActionItem = {
    // Uniq action id
    id: string;
    // Render-props for the content inside Button or DropdownMenu components
    renderContent: (component: 'button' | 'dropdown') => React.ReactNode;
    // click handler
    handler?: () => void;
};

export type ActionsPanelProps = {
    // Array of actions ActionItem[].
    actions: ActionItem[];
    // Close button click handler
    onClose?: () => void;
    // Render-a prop for displaying the content of a note
    renderNote?: () => React.ReactNode;
    className?: string;
};
