import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import {ItemSelector} from '../ItemSelector';

// JSDOM has no viewport; keep these interaction tests independent of measurement.
jest.mock('@gravity-ui/uikit/virtualizer', () => ({
    ListVirtualizer: ({children}: {children: React.ReactNode}) => children,
}));

test('Filters items and selects the first match from the search input', async () => {
    const onUpdate = jest.fn();
    render(
        <ItemSelector
            selectorTitle="Available"
            items={['apple', 'pear']}
            value={[]}
            getItemId={(item) => item}
            onUpdate={onUpdate}
        />,
    );
    const user = userEvent.setup();
    await user.type(screen.getByRole('combobox', {name: 'Available: Search'}), 'pear');
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(['pear']);
});

test('Removing an item preserves the other selected items', async () => {
    const onUpdate = jest.fn();
    render(
        <ItemSelector
            items={['apple', 'pear']}
            value={['pear', 'apple']}
            getItemId={(item) => item}
            onUpdate={onUpdate}
        />,
    );
    const user = userEvent.setup();
    const selected = screen.getByRole('grid', {name: 'Selected'});
    await user.click(within(selected).getByRole('button', {name: 'pear'}));
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(['apple']);
});

test('Filtering selected items disables dragging without changing the selection', async () => {
    const onUpdate = jest.fn();
    render(
        <ItemSelector
            items={['apple', 'pear']}
            value={['pear', 'apple']}
            getItemId={(item) => item}
            onUpdate={onUpdate}
        />,
    );
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', {name: 'Selected: Search'}), 'pear');
    const selected = screen.getByRole('grid', {name: 'Selected'});
    expect(within(selected).queryByText('apple')).not.toBeInTheDocument();
    expect(
        within(selected).queryByRole('button', {name: 'Drag to reorder'}),
    ).not.toBeInTheDocument();
    expect(onUpdate).not.toHaveBeenCalled();
});
