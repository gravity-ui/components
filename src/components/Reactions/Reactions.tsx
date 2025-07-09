import * as React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {
    Button,
    ButtonSize,
    DOMProps,
    Flex,
    Icon,
    Palette,
    PaletteOption,
    PaletteProps,
    Popup,
    PopupPlacement,
    QAProps,
} from '@gravity-ui/uikit';
import xor from 'lodash/xor';

import {block} from '../utils/cn';

import {Reaction, ReactionInnerProps, ReactionProps, ReactionState} from './Reaction';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';
import {i18n} from './i18n';

import './Reactions.scss';

const b = block('reactions');

export type ReactionsPaletteProps = Pick<
    PaletteProps,
    'columns' | 'rowClassName' | 'optionClassName' | 'size' | 'className'
>;

export interface RenderAddProps {
    size: ButtonSize;
    paletteOpened: boolean;
    buttonRef: React.RefObject<HTMLButtonElement>;
    onClick: () => void;
    className: string;
}
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
    /**
     * A class for the reaction container
     */
    popupProps?: {
        className?: string;
        placement?: PopupPlacement;
    };
    /**
     * Custom render function for the reaction button
     * Allows to fully customize the appearance of the button
     */
    renderReaction?: ReactionInnerProps['renderReaction'];
    renderAddReaction?: (props: RenderAddProps) => React.ReactNode;
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
    popupProps,
    renderReaction,
    renderAddReaction,
}: ReactionsProps) {
    const addReactionButtonRef = React.useRef<HTMLButtonElement>(null);
    const [palettePopupOpened, setPalettePopupOpened] = React.useState(false);

    const onOpenPalettePopup = React.useCallback(() => setPalettePopupOpened(true), []);
    const onClosePalettePopup = React.useCallback(() => setPalettePopupOpened(false), []);
    const onTogglePalettePopup = React.useCallback(
        () => (palettePopupOpened ? onClosePalettePopup() : onOpenPalettePopup()),
        [onClosePalettePopup, onOpenPalettePopup, palettePopupOpened],
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
                size={size}
                options={reactions}
                value={paletteValue}
                onUpdate={onUpdatePalette}
                {...paletteProps}
            />
        ),
        [paletteProps, reactions, paletteValue, size, onUpdatePalette],
    );

    const addReactionButton = React.useMemo(() => {
        if (readOnly) {
            return null;
        }

        if (renderAddReaction) {
            return renderAddReaction({
                size,
                paletteOpened: palettePopupOpened,
                buttonRef: addReactionButtonRef,
                onClick: onTogglePalettePopup,
                className: b('reaction-button'),
            });
        }

        return (
            <Button
                ref={addReactionButtonRef}
                size={size}
                extraProps={{'aria-label': i18n('add-reaction')}}
                onClick={onTogglePalettePopup}
                view="flat-secondary"
                className={b('reaction-button', {
                    active: palettePopupOpened,
                })}
            >
                <Button.Icon>
                    <Icon data={FaceSmile} size={buttonSizeToIconSize[size]} />
                </Button.Icon>
            </Button>
        );
    }, [readOnly, renderAddReaction, size, onTogglePalettePopup, palettePopupOpened]);

    const addReactionPopup = readOnly ? null : (
        <Popup
            anchorRef={addReactionButtonRef}
            className={b('add-reaction-popover', popupProps?.className)}
            open={palettePopupOpened}
            modal
            placement={popupProps?.placement}
            initialFocus={0}
            onOutsideClick={onClosePalettePopup}
            onEscapeKeyDown={onClosePalettePopup}
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
                            renderReaction={renderReaction}
                        />
                    );
                })}

                {addButtonPlacement === 'end' ? addReactionButton : null}
            </Flex>

            {addReactionPopup}
        </ReactionsContextProvider>
    );
}
