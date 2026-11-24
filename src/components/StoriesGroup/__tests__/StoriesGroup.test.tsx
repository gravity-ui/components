import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
import {StoriesMediaBlockStyle, StoriesTextBlockStyle} from '../../Stories';
import {StoriesGroup} from '../StoriesGroup';

const groups = ['Group one', 'Group two'].map((title) => ({
    items: [
        {
            title,
            textBlockStyle: StoriesTextBlockStyle.Card,
            mediaBlockStyle: StoriesMediaBlockStyle.HalfSize,
        },
    ],
}));

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
});

test('advances across groups, skips empty groups, and stops at the last non-empty group', () => {
    const onItemSelect = jest.fn();
    const onClose = jest.fn();
    render(
        <React.StrictMode>
            <StoriesGroup
                open
                autoPlay
                autoPlayInterval={1000}
                groups={[groups[0], {items: []}, groups[1], {items: []}]}
                onItemSelect={onItemSelect}
                onClose={onClose}
            />
        </React.StrictMode>,
    );
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByText('Group two')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onItemSelect).toHaveBeenLastCalledWith([2, 0], false);
    act(() => jest.advanceTimersByTime(5000));
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    expect(onItemSelect).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', {name: 'Next'})).not.toBeInTheDocument();
});

test('resets the timer when manually switching between groups with the same slide index', async () => {
    const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime});
    render(<StoriesGroup open autoPlay autoPlayInterval={1000} groups={groups} />);
    act(() => jest.advanceTimersByTime(700));
    await user.click(screen.getByRole('button', {name: 'Next'}));
    act(() => jest.advanceTimersByTime(700));
    await user.click(screen.getByRole('button', {name: 'Back'}));
    act(() => jest.advanceTimersByTime(999));
    expect(screen.getByText('Group one')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1));
    expect(screen.getByText('Group two')).toBeInTheDocument();
});
