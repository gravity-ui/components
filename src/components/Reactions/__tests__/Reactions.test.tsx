import React from 'react';

import {ButtonSize} from '@gravity-ui/uikit';
import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';

import {reactionsPalletteMockOption as option} from './mock/mockData';
import {TestReactions} from './mock/mockHooks';

const qaId = 'reactions-component';

describe('Reactions', () => {
    test('render Reactions', async () => {
        render(<TestReactions qa={qaId} />);

        const reactions = screen.getByTestId(qaId);
        expect(reactions).toBeVisible();
    });

    test.each(new Array<ButtonSize>('xs', 's', 'm', 'l', 'xl'))(
        'render with given "%s" size',
        (size) => {
            render(<TestReactions qa={qaId} size={size} />);

            const $component = screen.getByTestId(qaId);
            const $reactions = within($component).getAllByRole('button');

            $reactions.forEach(($reaction: HTMLElement) => {
                expect($reaction).toHaveClass(`g-button_size_${size}`);
            });
        },
    );

    test('all buttons are disabled when disabled=true prop is given', () => {
        render(<TestReactions qa={qaId} disabled={true} />);

        const $component = screen.getByTestId(qaId);
        const $reactions = within($component).getAllByRole('button');

        $reactions.forEach(($reaction: HTMLElement) => {
            expect($reaction).toBeDisabled();
        });
    });

    test('show given reaction', () => {
        render(<TestReactions qa={qaId} />);

        const text = screen.getByText(option.cool.content as string);

        expect(text).toBeVisible();
    });

    test('add className and style', () => {
        const className = 'my-class';
        const style = {color: 'red'};

        render(<TestReactions qa={qaId} className={className} style={style} />);

        const $component = screen.getByTestId(qaId);

        expect($component).toHaveClass(className);
        expect($component).toHaveStyle(style);
    });

    test('can (un)select an option', async () => {
        render(<TestReactions qa={qaId} />);

        const $component = screen.getByTestId(qaId);
        const $reactions = within($component).getAllByRole('button');

        const $firstReaction = await screen.findByText(option.cool.content as string);
        const $secondReaction = await screen.findByText(option.laughing.content as string);

        expect($reactions[0].getAttribute('aria-pressed')).toBe('false');
        expect($reactions[1].getAttribute('aria-pressed')).toBe('true');

        const user = userEvent.setup();
        await user.click($firstReaction);
        await user.click($secondReaction);

        expect($reactions[0].getAttribute('aria-pressed')).toBe('true');
        expect($reactions[1].getAttribute('aria-pressed')).toBe('false');
    });
});
