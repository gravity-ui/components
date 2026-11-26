import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, render, screen, waitFor} from '../../../../test-utils/utils';
import {StoriesGroup} from '../../StoriesGroup';
import {Stories} from '../Stories';
import type {StoriesProps} from '../Stories';
import type {StoriesItem} from '../types';
import {StoriesMediaBlockStyle, StoriesTextBlockStyle} from '../types';

const advance = (time: number) =>
    act(async () => {
        jest.advanceTimersByTime(time);
    });

function FocusStories({
    grouped,
    items,
    ...props
}: Pick<StoriesProps, 'open' | 'autoPlay' | 'autoPlayInterval' | 'items'> & {grouped: boolean}) {
    return (
        <React.StrictMode>
            {grouped ? (
                <StoriesGroup {...props} groups={items.map((item) => ({items: [item]}))} />
            ) : (
                <Stories {...props} items={items} />
            )}
        </React.StrictMode>
    );
}

describe.each([false, true])('autoplay focus protection (grouped: %s)', (grouped) => {
    let firstAction: jest.Mock;
    let nextAction: jest.Mock;
    let items: StoriesItem[];

    beforeEach(() => {
        jest.useFakeTimers();
        firstAction = jest.fn();
        nextAction = jest.fn();
        items = [
            {title: 'First slide', firstAction: {children: 'First action', onClick: firstAction}},
            {title: 'Next slide', firstAction: {children: 'Next action', onClick: nextAction}},
        ].map((item) => ({
            ...item,
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
        }));
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('keeps the focused action and its handler until the user navigates', async () => {
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <FocusStories grouped={grouped} open autoPlay autoPlayInterval={1000} items={items} />,
        );
        await advance(400);
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
        act(() => screen.getByRole('button', {name: 'First action'}).focus());
        const action = screen.getByRole('button', {name: 'First action'});
        expect(action).toHaveFocus();
        const progress = screen.getByRole('progressbar').getAttribute('aria-valuenow');

        await advance(5000);
        expect(action).toHaveFocus();
        expect(action).toHaveAccessibleName('First action');
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', progress);
        await user.keyboard('{Enter}');
        expect(firstAction).toHaveBeenCalledTimes(1);
        expect(nextAction).not.toHaveBeenCalled();
    });

    test('does not resume after blur, visibility changes, or a duration change', async () => {
        const hidden = jest.spyOn(document, 'hidden', 'get').mockReturnValue(false);
        try {
            const {rerender} = render(
                <FocusStories
                    grouped={grouped}
                    open
                    autoPlay
                    autoPlayInterval={1000}
                    items={items}
                />,
            );
            await advance(400);
            await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
            act(() => screen.getByRole('button', {name: 'First action'}).focus());
            const action = screen.getByRole('button', {name: 'First action'});
            expect(action).toHaveFocus();
            act(() => action.blur());
            expect(action).not.toHaveFocus();
            act(() => {
                hidden.mockReturnValue(true);
                document.dispatchEvent(new Event('visibilitychange'));
            });
            await advance(5000);
            act(() => {
                hidden.mockReturnValue(false);
                document.dispatchEvent(new Event('visibilitychange'));
            });
            await advance(5000);
            expect(screen.getByText('First slide')).toBeInTheDocument();
            rerender(
                <FocusStories
                    grouped={grouped}
                    open
                    autoPlay
                    autoPlayInterval={500}
                    items={items}
                />,
            );
            await advance(5000);
            expect(screen.getByText('First slide')).toBeInTheDocument();
        } finally {
            hidden.mockRestore();
        }
    });

    test('allows manual navigation without restarting autoplay', async () => {
        const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
        render(
            <FocusStories grouped={grouped} open autoPlay autoPlayInterval={1000} items={items} />,
        );
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
        act(() => screen.getByRole('button', {name: 'First action'}).focus());
        await user.click(screen.getByRole('button', {name: 'Next'}));
        expect(screen.getByText('Next slide')).toBeInTheDocument();
        await advance(5000);
        expect(screen.getByRole('progressbar')).toHaveAttribute(
            'aria-valuenow',
            grouped ? '0' : '50',
        );
        await user.click(screen.getByRole('button', {name: 'Back'}));
        await advance(5000);
        expect(screen.getByText('First slide')).toBeInTheDocument();
    });

    test('starts a new playback session after closing and reopening', async () => {
        const {rerender} = render(
            <FocusStories grouped={grouped} open autoPlay autoPlayInterval={1000} items={items} />,
        );
        await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
        act(() => screen.getByRole('button', {name: 'First action'}).focus());
        rerender(
            <FocusStories
                grouped={grouped}
                open={false}
                autoPlay
                autoPlayInterval={1000}
                items={items}
            />,
        );
        await advance(1000);
        rerender(
            <FocusStories grouped={grouped} open autoPlay autoPlayInterval={1000} items={items} />,
        );
        await advance(999);
        expect(screen.getByText('First slide')).toBeInTheDocument();
        await advance(1);
        expect(screen.getByText('Next slide')).toBeInTheDocument();
    });
});
