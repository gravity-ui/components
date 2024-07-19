import React from 'react';

import {Button, ButtonSize, PaletteOption, PopoverProps, Popup} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {useReactionsContext} from './context';
import {useReactionsPopup} from './hooks';

export type ReactionProps = Pick<PaletteOption, 'value' | 'content' | 'title'>;

export interface ReactionStateProps {
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
    /**
     * If present, when a user hovers over the reaction, a popover appears with `tooltip.content`.
     * Can be used to display users who used this reaction.
     */
    tooltip?: React.ReactNode;
}

interface ReactionInnerProps extends Pick<PaletteOption, 'content'> {
    reaction: ReactionStateProps;
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
    const {value, selected, counter, tooltip} = props.reaction;
    const {size, content, onClick} = props;

    const onClickCallback = React.useCallback(() => onClick?.(value), [onClick, value]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const {onMouseEnter, onMouseLeave} = useReactionsPopup(props.reaction, buttonRef);
    const {openedTooltip: currentHoveredReaction} = useReactionsContext();

    const button = (
        <Button
            className={b('reaction-button', {size})}
            ref={buttonRef}
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
                    contentClassName={b('popup')}
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
