import * as React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {
    Button,
    DOMProps,
    Flex,
    Icon,
    Palette,
    PaletteOption,
    PaletteProps,
    Popup,
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
    renderTooltip,
    onToggle,
}: ReactionsProps) {
    const [addReactionsElement, setAddReactionsElement] = React.useState<HTMLButtonElement | null>(
        null,
    );

    const [palettePopupOpened, setPalettePopupOpened] = React.useState(false);

    const onOpenPalettePopup = React.useCallback(() => setPalettePopupOpened(true), []);
    const onClosePalettePopup = React.useCallback(() => setPalettePopupOpened(false), []);
    const onTogglePalettePopup = React.useCallback(
        () => (palettePopupOpened ? onClosePalettePopup() : onOpenPalettePopup()),
        [onClosePalettePopup, onOpenPalettePopup, palettePopupOpened],
    );

    const onOpenedChanged = React.useCallback(
        (opened: boolean) => {
            if (!opened) {
                onClosePalettePopup();
            }
        },
        [onClosePalettePopup],
    );

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

            onClosePalettePopup();
        },
        [onClosePalettePopup, onToggle, paletteValue],
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
        <Button
            className={b('reaction-button')}
            ref={setAddReactionsElement}
            size={size}
            aria-label={i18n('add-reaction')}
            onClick={onTogglePalettePopup}
            view="flat-secondary"
        >
            <Button.Icon>
                <Icon data={FaceSmile} size={buttonSizeToIconSize[size]} />
            </Button.Icon>
        </Button>
    );

    const addReactionPopup = readOnly ? null : (
        <Popup
            className={b('add-reaction-popover')}
            anchorElement={addReactionsElement}
            open={palettePopupOpened}
            initialFocus={0}
            modal={true}
            onOpenChange={onOpenedChanged}
        >
            {paletteContent}
        </Popup>
    );

    return (
        <ReactionsContextProvider
            value={{
                openedTooltip: currentHoveredReaction,
                setOpenedTooltip: setCurrentHoveredReaction,
            }}
        >
            <Flex className={b(null, className)} style={style} gap={1} wrap={true} qa={qa}>
                {addButtonPlacement === 'start' ? addReactionButton : null}

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

                {addButtonPlacement === 'end' ? addReactionButton : null}
            </Flex>

            {addReactionPopup}
        </ReactionsContextProvider>
    );
}
