import React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {
    Button,
    DOMProps,
    Flex,
    Icon,
    Palette,
    PaletteOption,
    PaletteProps,
    Popover,
    QAProps,
} from '@gravity-ui/uikit';
import xor from 'lodash/xor';

import {block} from '../utils/cn';

import {Reaction, ReactionProps, ReactionStateProps} from './Reaction';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';

import './Reactions.scss';

const b = block('reactions');

export type ReactionsPaletteProps = Pick<
    PaletteProps,
    'columns' | 'rowClassName' | 'optionClassName'
>;

export interface ReactionsProps extends Pick<PaletteProps, 'size'>, QAProps, DOMProps {
    /**
     * All available reactions.
     */
    reactions: ReactionProps[];
    /**
     * Users' reactions.
     */
    reactionsState: ReactionStateProps[];
    /**
     * Reactions' palette props.
     */
    paletteProps?: ReactionsPaletteProps;
    /**
     * Reactions' readonly state (when a user is unable to react for some reason).
     */
    readOnly?: boolean;
    /**
     * How a reaction's tooltip should act:
     * 1. as a tooltip (you can't hover over the contents — it disappeares),
     * 2. as a popover (you can hover over the contents — it doesn't disappear).
     *
     * Default: 'tooltip'.
     */
    tooltipBehavior?: 'tooltip' | 'popover';
    /**
     * Callback for clicking on a reaction in the Palette or directly in the reactions' list.
     */
    onToggle?: (value: string) => void;
}

const buttonSizeToIconSize = {
    xs: '12px',
    s: '16px',
    m: '16px',
    l: '16px',
    xl: '20px',
};

export function Reactions({
    reactions,
    reactionsState,
    className,
    style,
    size = 'm',
    paletteProps,
    readOnly,
    tooltipBehavior,
    qa,
    onToggle,
}: ReactionsProps) {
    const [currentHoveredReaction, setCurrentHoveredReaction] = React.useState<
        ReactionsContextTooltipProps | undefined
    >(undefined);

    const paletteOptionsMap = React.useMemo(
        () =>
            reactions.reduce<Record<PaletteOption['value'], PaletteOption>>((acc, current) => {
                // eslint-disable-next-line no-param-reassign
                acc[current.value] = current;
                return acc;
            }, {}),
        [reactions],
    );

    const paletteValue = React.useMemo(
        () =>
            reactionsState
                .filter((reaction) => reaction.selected)
                .map((reaction) => reaction.value),
        [reactionsState],
    );

    const onUpdatePalette = React.useCallback(
        (updated: string[]) => {
            const diffValues = xor(paletteValue, updated);
            for (const diffValue of diffValues) {
                onToggle?.(diffValue);
            }
        },
        [onToggle, paletteValue],
    );

    const paletteContent = React.useMemo(
        () => (
            <Palette
                {...paletteProps}
                options={reactions}
                value={paletteValue}
                size={size}
                onUpdate={onUpdatePalette}
            />
        ),
        [paletteProps, reactions, paletteValue, size, onUpdatePalette],
    );

    return (
        <ReactionsContextProvider
            value={{
                openedTooltip: currentHoveredReaction,
                setOpenedTooltip: setCurrentHoveredReaction,
            }}
        >
            <Flex className={b(null, className)} style={style} gap={1} wrap={true} qa={qa}>
                {/* Reactions' list */}
                {reactionsState.map((reaction) => {
                    const content = paletteOptionsMap[reaction.value]?.content ?? '?';

                    return (
                        <Reaction
                            key={reaction.value}
                            content={content}
                            reaction={reaction}
                            tooltipBehavior={tooltipBehavior ?? 'tooltip'}
                            size={size}
                            onClick={readOnly ? undefined : onToggle}
                        />
                    );
                })}

                {/* Add reaction button */}
                {readOnly ? null : (
                    <Popover
                        content={paletteContent}
                        tooltipContentClassName={b('add-reaction-popover')}
                        openOnHover={false}
                        hasArrow={false}
                    >
                        <Button
                            className={b('reaction-button', {size, 'add-button': true})}
                            size={size}
                            extraProps={{'aria-label': 'add-reaction'}}
                            view="flat"
                        >
                            <Button.Icon>
                                <Icon data={FaceSmile} size={buttonSizeToIconSize[size]} />
                            </Button.Icon>
                        </Button>
                    </Popover>
                )}
            </Flex>
        </ReactionsContextProvider>
    );
}
