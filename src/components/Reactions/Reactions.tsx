import * as React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {
    Button,
    DOMProps,
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
import {ReactionsContainer} from './ReactionsContainer';
import {ReactionsContextProvider, ReactionsContextTooltipProps} from './context';
import {i18n} from './i18n';

import './Reactions.scss';

const b = block('reactions');

export type ReactionsPaletteProps = Pick<
    PaletteProps,
    'columns' | 'rowClassName' | 'optionClassName' | 'size' | 'className'
>;

export interface RenderAddProps<AddReactionRef extends HTMLElement = HTMLButtonElement> {
    paletteOpened: boolean;
    ref: React.RefObject<AddReactionRef>;
    triggerProps: {
        onClick: () => void;
    } & Pick<
        React.ButtonHTMLAttributes<HTMLElement>,
        'aria-controls' | 'aria-haspopup' | 'aria-expanded'
    >;
}
export interface ReactionsProps<AddReactionRef extends HTMLElement = HTMLButtonElement>
    extends Pick<PaletteProps, 'size'>,
        QAProps,
        DOMProps {
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
     * @deprecated Use renderReactionsContent prop instead for full layout customization
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
    popupClassName?: string;
    popupPlacement?: PopupPlacement;
    /**
     * Custom render function for the reaction button
     * Allows to fully customize the appearance of the button
     */
    renderReaction?: ReactionInnerProps['renderReaction'];
    renderAddReaction?: (props: RenderAddProps<AddReactionRef>) => React.ReactNode;
    /**
     * Callback function to render custom reactions content.
     *
     * @param {Object} props - Reaction rendering properties
     * @param {ReactNode} props.addReactionButton - Button component for adding a new reaction
     * @param {ReactNode} props.reactionList - Component that displays the list of reactions
     * @returns {ReactNode} Custom reactions container
     *
     * @example
     * ```tsx
     * import { Reactions, ReactionsContainer } from '@gravity-ui/components';
     *
     * <Reactions
     *   renderReactionsContent={(props) => {
     *     return (
     *       <ReactionsContainer>
     *         {props.addReactionButton}
     *         {props.reactionList}
     *       </ReactionsContainer>
     *     );
     *   }}
     * />
     * ```
     *
     * @example
     * // You can customize the layout of reaction elements by wrapping them in your own container:
     * ```tsx
     * <Reactions
     *   renderReactionsContent={(props) => {
     *     return (
     *       <div className="custom-reactions-wrapper">
     *         <div className="reactions-header">Reactions:</div>
     *         {props.addReactionButton}
     *         <div className="reactions-list-container">
     *           {props.reactionList}
     *         </div>
     *       </div>
     *     );
     *   }}
     * />
     * ```
     */
    renderReactionsContent?: (props: {
        reactionList: React.ReactNode;
        addReactionButton: React.ReactNode;
    }) => React.ReactNode;
}

const buttonSizeToIconSize = {
    xs: '12px',
    s: '16px',
    m: '16px',
    l: '16px',
    xl: '20px',
};

const popupId = 'reactions-palette-popup';

export function Reactions<AddReactionRef extends HTMLElement = HTMLButtonElement>({
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
    popupClassName,
    popupPlacement,
    renderReaction,
    renderAddReaction,
    renderReactionsContent,
}: ReactionsProps<AddReactionRef>) {
    const addReactionButtonRef = React.useRef<HTMLButtonElement>(null);
    const addReactionRef = React.useRef<AddReactionRef>(null);

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
                paletteOpened: palettePopupOpened,
                ref: addReactionRef,
                triggerProps: {
                    onClick: onTogglePalettePopup,
                    'aria-expanded': palettePopupOpened,
                    'aria-haspopup': 'true',
                    'aria-controls': popupId,
                },
            });
        }

        return (
            <Button
                ref={addReactionButtonRef}
                size={size}
                aria-label={i18n('add-reaction')}
                aria-expanded={palettePopupOpened}
                aria-haspopup={true}
                aria-controls={popupId}
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
            id={popupId}
            anchorRef={renderAddReaction ? addReactionRef : addReactionButtonRef}
            className={b('add-reaction-popover', popupClassName)}
            open={palettePopupOpened}
            modal
            placement={popupPlacement}
            initialFocus={0}
            onOutsideClick={onClosePalettePopup}
            onEscapeKeyDown={onClosePalettePopup}
        >
            {paletteContent}
        </Popup>
    );

    const reactionList = (
        <React.Fragment>
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
        </React.Fragment>
    );

    const renderReactions = () => {
        if (renderReactionsContent) {
            return renderReactionsContent({
                reactionList,
                addReactionButton,
            });
        }

        return (
            <ReactionsContainer className={className} qa={qa} style={style}>
                {addButtonPlacement === 'start' ? addReactionButton : null}
                {reactionList}
                {addButtonPlacement === 'end' ? addReactionButton : null}
            </ReactionsContainer>
        );
    };

    return (
        <ReactionsContextProvider
            value={{
                openedTooltip: currentHoveredReaction,
                setOpenedTooltip: setCurrentHoveredReaction,
            }}
        >
            {renderReactions()}

            {addReactionPopup}
        </ReactionsContextProvider>
    );
}
