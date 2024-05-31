import React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {
    Button,
    DOMProps,
    Flex,
    Icon,
    Palette,
    PaletteProps,
    Popover,
    QAProps,
} from '@gravity-ui/uikit';
import xor from 'lodash/xor';

import {block} from '../utils/cn';
import {useStableCallback} from '../utils/useStableCallback';

import {Reaction, ReactionProps} from './Reaction';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';

import './Reactions.scss';

const b = block('reactions');

export interface ReactionsProps extends Pick<PaletteProps, 'size' | 'disabled'>, QAProps, DOMProps {
    /**
     * Users' reactions.
     */
    reactions: ReactionProps[];
    /**
     * Reactions' palette props.
     */
    palette: Omit<
        PaletteProps,
        'value' | 'defaultValue' | 'onUpdate' | 'size' | 'disabled' | 'multiple'
    >;
    /**
     * Callback for clicking on a reaction in the Palette or directly in the reactions' list.
     */
    onClickReaction?: (value: string) => void;
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
    className,
    style,
    size = 'm',
    disabled,
    palette,
    qa,
    onClickReaction,
}: ReactionsProps) {
    const [currentHoveredReaction, setCurrentHoveredReaction] = React.useState<
        ReactionsContextTooltipProps | undefined
    >(undefined);

    const paletteValue = React.useMemo(
        () => reactions.filter((reaction) => reaction.selected).map((reaction) => reaction.value),
        [reactions],
    );

    const onUpdatePalette = useStableCallback((updated: string[]) => {
        const diffValues = xor(paletteValue, updated);
        for (const diffValue of diffValues) {
            onClickReaction?.(diffValue);
        }
    });

    const paletteContent = React.useMemo(
        () => (
            <Palette
                {...palette}
                value={paletteValue}
                disabled={disabled}
                size={size}
                onUpdate={onUpdatePalette}
            />
        ),
        [paletteValue, disabled, size, palette, onUpdatePalette],
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
                {reactions.map((reaction) => {
                    return (
                        <Reaction
                            key={reaction.value}
                            reaction={disabled ? {...reaction, disabled} : reaction}
                            size={size}
                            onClick={onClickReaction}
                        />
                    );
                })}

                {/* Add reaction button */}
                {disabled ? null : (
                    <Popover
                        content={paletteContent}
                        tooltipContentClassName={b('add-reaction-popover')}
                        openOnHover={false}
                        hasArrow={false}
                    >
                        <Button
                            className={b('reaction-button', {size, 'add-button': true})}
                            size={size}
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
