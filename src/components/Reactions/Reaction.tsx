import * as React from 'react';

import {Button, ButtonSize, PaletteOption, PopoverProps, Popup} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {useReactionsContext} from './context';
import {useReactionsPopup} from './hooks';

export type ReactionProps = Pick<PaletteOption, 'value' | 'content' | 'title'>;

export interface ReactionState {
    /**
     * Reaction's unique value (ID).
     */
    value: string;
    /**
     * Should be true when the user used this reaction.
     */
    selected?: boolean;
    /**
     * Display a number after the icon.
     * Represents the number of users who used this reaction.
     */
    counter?: React.ReactNode;
}

export interface RenderReactionProps<ReactionRef extends HTMLElement = HTMLButtonElement> {
    /** Reaction content */
    content: React.ReactNode;
    /** Click handler */
    onClick: () => void;
    /** Button reference needed for popup positioning */
    ref?: React.RefObject<ReactionRef>;
    /** Counter value */
    counter?: React.ReactNode;
    /** Is reaction selected */
    selected?: boolean;
}

export interface ReactionInnerProps<ReactionRef extends HTMLElement = HTMLButtonElement>
    extends Pick<PaletteOption, 'content'> {
    reaction: ReactionState;
    size: ButtonSize;
    tooltip?: React.ReactNode;
    onClick?: (value: string) => void;
    /**
     * Custom render function for the reaction button
     * Allows to fully customize the appearance of the button
     */
    renderReaction?: (props: RenderReactionProps<ReactionRef>) => React.ReactNode;
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

export function Reaction<ReactionRef extends HTMLElement = HTMLButtonElement>(
    props: ReactionInnerProps<ReactionRef>,
) {
    const {value, selected, counter} = props.reaction;
    const {size, content, tooltip, onClick, renderReaction} = props;

    const onClickCallback = React.useCallback(() => onClick?.(value), [onClick, value]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const reactionRef = React.useRef<ReactionRef>(null);
    const {onMouseEnter, onMouseLeave} = useReactionsPopup(props.reaction, buttonRef);
    const {openedTooltip: currentHoveredReaction} = useReactionsContext();

    const defaultButton = (
        <Button
            ref={buttonRef}
            size={size}
            selected={selected}
            view="outlined"
            extraProps={{value}}
            pin="circle-circle"
            onClick={onClickCallback}
            className={b('reaction-button', {size})}
        >
            <Button.Icon>
                <span className={b('reaction-button-content', {size})}>{content}</span>
            </Button.Icon>
            {counter === undefined || counter === null ? null : (
                <span className={b('reaction-button-content', {size, text: true})}>{counter}</span>
            )}
        </Button>
    );

    const button = renderReaction
        ? renderReaction({
              content,
              counter,
              selected,
              ref: reactionRef,
              onClick: onClickCallback,
          })
        : defaultButton;

    return tooltip ? (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {button}

            {currentHoveredReaction && currentHoveredReaction.reaction.value === value ? (
                <Popup
                    className={b('popup')}
                    anchorRef={currentHoveredReaction.ref}
                    placement={popupDefaultPlacement}
                    open={currentHoveredReaction.open}
                    hasArrow
                >
                    {tooltip}
                </Popup>
            ) : null}
        </div>
    ) : (
        button
    );
}
