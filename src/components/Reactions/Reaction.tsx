import React from 'react';

import {Button, ButtonSize, PaletteOption, PopoverProps, Popup} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {useReactionsContext} from './context';
import {useReactionsPopup} from './hooks';

export interface ReactionProps
    extends Pick<PaletteOption, 'disabled' | 'title' | 'value' | 'content'> {
    /**
     * Should be true when the user used this reaction.
     */
    selected?: boolean;
    /**
     * Display a number after the icon.
     * Represents the number of users who used this reaction.
     */
    counter?: React.ReactNode;
    /**
     * If present, when a user hovers over the reaction, a popover appears with `tooltip.content`.
     * Can be used to display users who used this reaction.
     */
    tooltip?: ReactionTooltipProps;
}

export interface ReactionTooltipProps
    extends Pick<PopoverProps, 'strategy' | 'placement' | 'modifiers'> {
    /**
     * Tooltip's content.
     */
    content: React.ReactNode;
    /**
     * Tooltip content's HTML class attribute.
     */
    className?: string;
    /**
     * Fires when the `onMouseLeave` callback is called.
     * Usage example:
     * you have some popup inside a tooltip, you hover on it, you don't want the tooltip to be closed because of that.
     */
    canClosePopup?: () => boolean;
}

interface ReactionInnerProps {
    reaction: ReactionProps;
    size: ButtonSize;
    onClick?: (value: string) => void;
}

const popupDefaultPlacement: PopoverProps['placement'] = [
    'bottom-start',
    'bottom',
    'bottom-end',
    'top-start',
    'top',
    'top-end',
];

const b = block('reactions');

export function Reaction(props: ReactionInnerProps) {
    const {value, disabled, selected, content, counter, tooltip} = props.reaction;
    const {size, onClick} = props;

    const onClickCallback = React.useCallback(() => onClick?.(value), [onClick, value]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const {onMouseEnter, onMouseLeave} = useReactionsPopup(props.reaction, buttonRef);
    const {openedTooltip: currentHoveredReaction} = useReactionsContext();

    const button = (
        <Button
            className={b('reaction-button', {size})}
            ref={buttonRef}
            disabled={disabled}
            size={size}
            selected={selected}
            view="outlined"
            extraProps={{value}}
            onClick={onClickCallback}
        >
            <Button.Icon>{content}</Button.Icon>
            {counter === undefined || counter === null ? null : (
                <span className={b('reaction-button-text', {size})}>{counter}</span>
            )}
        </Button>
    );

    return tooltip ? (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {button}

            {currentHoveredReaction && currentHoveredReaction.reaction.value === value ? (
                <Popup
                    anchorRef={currentHoveredReaction.ref}
                    contentClassName={b('popup', tooltip.className)}
                    placement={tooltip.placement ?? popupDefaultPlacement}
                    strategy={tooltip.strategy}
                    modifiers={tooltip.modifiers}
                    open={currentHoveredReaction.open}
                    hasArrow
                >
                    {tooltip.content}
                </Popup>
            ) : null}
        </div>
    ) : (
        button
    );
}
