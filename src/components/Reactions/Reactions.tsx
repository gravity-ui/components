import React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {Button, Flex, Icon, Palette, PaletteProps, Popover} from '@gravity-ui/uikit';
import xor from 'lodash/xor';

import {block} from '../utils/cn';
import {useStableCallback} from '../utils/useStableCallback';

import {Reaction, ReactionProps} from './Reaction';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';

import './Reactions.scss';

const b = block('reactions');

export interface ReactionsProps extends Pick<PaletteProps, 'size' | 'disabled'> {
    /**
     * HTML class attribute.
     */
    className?: string;
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

export function Reactions({
    reactions,
    className,
    size = 'm',
    disabled,
    palette,
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

    return (
        <ReactionsContextProvider
            value={{
                openedTooltip: currentHoveredReaction,
                setOpenedTooltip: setCurrentHoveredReaction,
            }}
        >
            <Flex className={b(null, className)} gap={1}>
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
                        content={
                            <Palette
                                {...palette}
                                value={paletteValue}
                                disabled={disabled}
                                size={size}
                                onUpdate={onUpdatePalette}
                            />
                        }
                        openOnHover={false}
                        hasArrow={false}
                    >
                        <Button className={b('add-button')} size={size} view="flat">
                            <Button.Icon>
                                <Icon data={FaceSmile} />
                            </Button.Icon>
                        </Button>
                    </Popover>
                )}
            </Flex>
        </ReactionsContextProvider>
    );
}
