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

import {Reaction, ReactionProps, ReactionState} from './Reaction';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';
import {i18n} from './i18n';

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
    reactionsState: ReactionState[];
    /**
     * Reactions' palette props.
     */
    paletteProps?: ReactionsPaletteProps;
    /**
     * Reactions' readonly state (when a user is unable to react for some reason).
     */
    readOnly?: boolean;
    /**
     * Position of the "Add reaction" button.
     *
     * @default 'end'
     */
    addButtonPlacement?: 'start' | 'end';
    /**
     * Should we hide the "Add reaction" button.
     *
     * @default false
     */
    hideAddButton?: boolean;
    /**
     * If present, when a user hovers over the reaction, a popover appears with renderTooltip(state) content.
     * Can be used to display users who used this reaction.
     */
    renderTooltip?: (state: ReactionState) => React.ReactNode;
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
    qa,
    addButtonPlacement = 'end',
    hideAddButton = false,
    renderTooltip,
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

    const addReactionButton = readOnly ? null : (
        <Popover
            content={paletteContent}
            tooltipContentClassName={b('add-reaction-popover')}
            openOnHover={false}
            hasArrow={false}
            focusTrap
            autoFocus
        >
            <Button
                className={b('reaction-button')}
                size={size}
                extraProps={{'aria-label': i18n('add-reaction')}}
                view="flat-secondary"
            >
                <Button.Icon>
                    <Icon data={FaceSmile} size={buttonSizeToIconSize[size]} />
                </Button.Icon>
            </Button>
        </Popover>
    );

    return (
        <ReactionsContextProvider
            value={{
                openedTooltip: currentHoveredReaction,
                setOpenedTooltip: setCurrentHoveredReaction,
            }}
        >
            <Flex className={b(null, className)} style={style} gap={1} wrap={true} qa={qa}>
                {!hideAddButton && addButtonPlacement === 'start' ? addReactionButton : null}

                {/* Reactions' list */}
                {reactionsState.map((reaction) => {
                    const content = paletteOptionsMap[reaction.value]?.content ?? '?';

                    return (
                        <Reaction
                            key={reaction.value}
                            content={content}
                            reaction={reaction}
                            size={size}
                            tooltip={renderTooltip ? renderTooltip(reaction) : undefined}
                            onClick={readOnly ? undefined : onToggle}
                        />
                    );
                })}

                {!hideAddButton && addButtonPlacement === 'end' ? addReactionButton : null}
            </Flex>
        </ReactionsContextProvider>
    );
}
