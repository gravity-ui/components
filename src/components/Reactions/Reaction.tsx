import React from 'react';

import {Button, ButtonSize, Popover, Text} from '@gravity-ui/uikit';

export interface ReactionProps {
    /**
     * The reaction (emoji/icon/letter/GIF/image etc).
     */
    icon: React.ReactNode;
    /**
     * Actual value that is sent to backend for example.
     */
    value: string;
    /**
     * Display a number after the icon.
     * Represents the number of users who used this reaction.
     */
    count?: number;
    /**
     * Is the reaction button disabled.
     */
    disabled?: boolean;
    /**
     * Is the reaction highlighted.
     * Should be true when the user used this reaction.
     */
    isHighlighted?: boolean;
    /**
     * If present, when a user hovers over the reaction, a popover appears with the `popoverContent`.
     * Can be used to display users who used this reaction.
     */
    popoverContent?: React.ReactNode;
}

export interface ReactionInnerProps extends ReactionProps {
    size: ButtonSize;
}

export const Reaction = React.memo(function Reaction(props: ReactionInnerProps) {
    const button = (
        <Button
            disabled={props.disabled}
            size={props.size}
            view={props.isHighlighted ? 'outlined-info' : 'outlined'}
        >
            <Button.Icon>{props.icon}</Button.Icon>
            {props.count === undefined ? null : <Text>{props.count}</Text>}
        </Button>
    );

    return props.popoverContent ? (
        <Popover content={props.popoverContent} hasArrow={false}>
            {button}
        </Popover>
    ) : (
        button
    );
});
