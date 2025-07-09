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

export interface RenderReactionProps {
    /** Reaction content */
    content: React.ReactNode;
    /** Click handler */
    onClick: () => void;
    /** Button reference needed for popup positioning */
    buttonRef?: React.RefObject<HTMLButtonElement>;
    /** Counter value */
    counter?: React.ReactNode;
    /** Button size */
    size?: ButtonSize;
    /** Is reaction selected */
    selected?: boolean;
    /** CSS block helper */
    buttonClassName?: string;
    contentClassName?: string;
    counterClassName?: string;
}

export interface ReactionInnerProps extends Pick<PaletteOption, 'content'> {
    reaction: ReactionState;
    size: ButtonSize;
    tooltip?: React.ReactNode;
    onClick?: (value: string) => void;
    /**
     * Custom render function for the reaction button
     * Allows to fully customize the appearance of the button
     */
    renderReaction?: (props: RenderReactionProps) => React.ReactNode;
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
    const {value, selected, counter} = props.reaction;
    const {size, content, tooltip, onClick, renderReaction} = props;

    const onClickCallback = React.useCallback(() => onClick?.(value), [onClick, value]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const {onMouseEnter, onMouseLeave} = useReactionsPopup(props.reaction, buttonRef);
    const {openedTooltip: currentHoveredReaction} = useReactionsContext();

    const defaultButton = (
        <Button
            ref={buttonRef}
            size={size}
            selected={selected}
            view="outlined"
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
              size,
              selected,
              buttonRef,
              onClick: onClickCallback,
              buttonClassName: b('reaction-button', {size}),
              contentClassName: b('reaction-button-content', {size}),
              counterClassName: b('reaction-button-content', {size, text: true}),
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
