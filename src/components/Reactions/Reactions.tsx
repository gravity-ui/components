import React from 'react';

import {ButtonSize, Flex} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {AddReactionButton} from './AddReactionButton';
import {Reaction, ReactionProps} from './Reaction';

import './Reactions.scss';

const b = block('reactions');

export interface ReactionsProps {
    /**
     * HTML class attribute.
     */
    className?: string;
    /**
     * A set of reactions to pick from.
     */
    reactionsMarket: React.ReactNode;
    /**
     * Users' reactions.
     */
    reactions: ReactionProps[];
    /**
     * Are buttons disabled and the «Add reaction» button is hidden.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Buttons' size.
     *
     * @default 's'
     */
    size?: ButtonSize;
}

export function Reactions(props: ReactionsProps) {
    const {size = 's'} = props;

    return (
        <Flex className={b(null, props.className)} gap={1}>
            {props.reactions.map((reaction) => (
                <Reaction
                    {...reaction}
                    disabled={props.disabled || reaction.disabled}
                    size={size}
                    key={reaction.value}
                />
            ))}
            {props.disabled ? null : (
                <AddReactionButton size={size} content={props.reactionsMarket} />
            )}
        </Flex>
    );
}
