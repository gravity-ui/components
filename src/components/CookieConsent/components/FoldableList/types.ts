import type {LinkProps} from '@gravity-ui/uikit';

export interface FoldableListItem {
    /* Title */
    title: string;
    /* Text in the hidden part */
    text: string;
    /* Label, it is locates near the title */
    titleLabel?: string;
    /* Link is locates at the end of the hidden part */
    link?: Pick<LinkProps, 'href' | 'title'>;
    /* Inintial expand */
    defaultExpand?: boolean;
    /* Inintial check */
    checked?: boolean;
    /* Inintial disable */
    disabled?: boolean;
}

export interface FoldableListProps {
    items: FoldableListItem[];
    className?: string;
    onChooseItem?: (checkedItems: number[]) => void;
    isMobile?: boolean;
}
