import * as React from 'react';

import {Provider} from '@gravity-ui/uikit';
import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
import {Stories} from '../Stories';
import type {StoriesItem} from '../types';
import {StoriesMediaBlockStyle, StoriesTextBlockStyle} from '../types';

const items: StoriesItem[] = ['First story', 'Second story', 'Third story'].map((title) => ({
    title,
    textBlockStyle: StoriesTextBlockStyle.Card,
    mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
}));

const advance = (time: number) => act(() => jest.advanceTimersByTime(time));

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
});

test('keeps manual navigation and the numeric counter by default', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    render(<Stories open items={items} />);
    advance(10000);
    expect(screen.getByText('First story')).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'Next'}));
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('advances once per interval in StrictMode and stops at the end without closing', () => {
    const onNextClick = jest.fn();
    const onClose = jest.fn();
    render(
        <React.StrictMode>
            <Stories
                open
                autoPlay
                autoPlayInterval={1000}
                items={items}
                onNextClick={onNextClick}
                onClose={onClose}
            />
        </React.StrictMode>,
    );
    advance(999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
    expect(onNextClick).toHaveBeenCalledTimes(1);
    expect(onNextClick).toHaveBeenLastCalledWith(1);
    advance(1000);
    expect(screen.getByText('Third story')).toBeInTheDocument();
    expect(onNextClick).toHaveBeenCalledTimes(2);
    advance(10000);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    expect(onNextClick).toHaveBeenCalledTimes(2);
    expect(onClose).not.toHaveBeenCalled();
});

test('uses five seconds per slide by default', () => {
    render(<Stories open autoPlay items={items} />);
    advance(4999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('resets the timer on both button and keyboard navigation', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    render(<Stories open autoPlay autoPlayInterval={1000} items={items} />);
    advance(700);
    await user.click(screen.getByRole('button', {name: 'Next'}));
    advance(700);
    expect(screen.getByText('Second story')).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}');
    advance(999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('excludes time spent in a hidden tab', () => {
    const hidden = jest.spyOn(document, 'hidden', 'get').mockReturnValue(false);
    try {
        render(<Stories open autoPlay autoPlayInterval={1000} items={items} />);
        advance(400);
        act(() => {
            hidden.mockReturnValue(true);
            document.dispatchEvent(new Event('visibilitychange'));
        });
        advance(10000);
        expect(screen.getByText('First story')).toBeInTheDocument();
        act(() => {
            hidden.mockReturnValue(false);
            document.dispatchEvent(new Event('visibilitychange'));
        });
        advance(599);
        expect(screen.getByText('First story')).toBeInTheDocument();
        advance(1);
        expect(screen.getByText('Second story')).toBeInTheDocument();
    } finally {
        hidden.mockRestore();
    }
});

test('does not advance while closed and starts a full interval when reopened', () => {
    const onNextClick = jest.fn();
    const props = {autoPlay: true, autoPlayInterval: 1000, items, onNextClick};
    const {rerender} = render(<Stories {...props} open />);
    advance(700);
    rerender(<Stories {...props} open={false} />);
    advance(10000);
    expect(onNextClick).not.toHaveBeenCalled();
    rerender(<Stories {...props} open />);
    advance(999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('does not restart when a parent rerenders with a new callback', () => {
    const oldCallback = jest.fn();
    const newCallback = jest.fn();
    const {rerender} = render(
        <Stories open autoPlay autoPlayInterval={1000} items={items} onNextClick={oldCallback} />,
    );
    advance(700);
    rerender(
        <Stories open autoPlay autoPlayInterval={1000} items={items} onNextClick={newCallback} />,
    );
    advance(300);
    expect(newCallback).toHaveBeenCalledTimes(1);
    expect(oldCallback).not.toHaveBeenCalled();
});

test('cleans up the timer on unmount', () => {
    const onNextClick = jest.fn();
    const {unmount} = render(
        <Stories open autoPlay autoPlayInterval={1000} items={items} onNextClick={onNextClick} />,
    );
    advance(500);
    unmount();
    advance(10000);
    expect(onNextClick).not.toHaveBeenCalled();
});

test('starts a fresh interval when the duration changes', () => {
    const {rerender} = render(<Stories open autoPlay autoPlayInterval={1000} items={items} />);
    advance(700);
    rerender(<Stories open autoPlay autoPlayInterval={2000} items={items} />);
    advance(1999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('can disable and re-enable autoplay without leaving a pending transition', () => {
    const {rerender} = render(<Stories open autoPlay autoPlayInterval={1000} items={items} />);
    advance(700);
    rerender(<Stories open autoPlay={false} autoPlayInterval={1000} items={items} />);
    advance(10000);
    expect(screen.getByText('First story')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    rerender(<Stories open autoPlay autoPlayInterval={1000} items={items} />);
    advance(999);
    expect(screen.getByText('First story')).toBeInTheDocument();
    advance(1);
    expect(screen.getByText('Second story')).toBeInTheDocument();
});

test('cancels the active timer when items are emptied', () => {
    const onNextClick = jest.fn();
    const {rerender} = render(
        <Stories open autoPlay autoPlayInterval={1000} items={items} onNextClick={onNextClick} />,
    );
    advance(700);
    rerender(
        <Stories open autoPlay autoPlayInterval={1000} items={[]} onNextClick={onNextClick} />,
    );
    advance(10000);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(onNextClick).not.toHaveBeenCalled();
});

test('fills a single story without navigating or closing', () => {
    const onClose = jest.fn();
    const onNextClick = jest.fn();
    render(
        <Stories
            open
            autoPlay
            autoPlayInterval={1000}
            items={items.slice(0, 1)}
            onClose={onClose}
            onNextClick={onNextClick}
        />,
    );
    advance(2000);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', 'Story 1 of 1');
    expect(onClose).not.toHaveBeenCalled();
    expect(onNextClick).not.toHaveBeenCalled();
});

test.each([0, -1, NaN, Infinity])('disables autoplay for invalid interval %s', (interval) => {
    render(<Stories open autoPlay autoPlayInterval={interval} items={items} />);
    advance(10000);
    expect(screen.getByText('First story')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('supports distinct progress colors in light and dark themes', () => {
    const coloredItems = [{...items[0], progressColor: {light: '#123456', dark: '#abcdef'}}];
    const {rerender} = render(<Stories open autoPlay items={coloredItems} />);
    expect(screen.getByRole('progressbar')).toHaveStyle({color: '#123456'});
    rerender(
        <Provider theme="dark">
            <Stories open autoPlay items={coloredItems} />
        </Provider>,
    );
    expect(screen.getByRole('progressbar')).toHaveStyle({color: '#abcdef'});
});
