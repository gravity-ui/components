import userEvent from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import {ItemSelector} from '../ItemSelector';

// JSDOM has no viewport; keep these interaction tests independent of measurement.
jest.mock('@gravity-ui/uikit/virtualizer', () => ({
    ListVirtualizer: ({children}: {children: React.ReactNode}) => children,
}));

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

test('Passes `active` to renderItem for the keyboard cursor only', async () => {
    const renderItem = (item: string, active: boolean) => (active ? `${item}: active` : item);
    render(
        <ItemSelector
            selectorTitle="Available"
            items={['apple', 'pear']}
            value={[]}
            getItemId={(item) => item}
            renderItem={renderItem}
            onUpdate={jest.fn()}
        />,
    );
    const user = userEvent.setup();

    await user.hover(screen.getByText('apple'));
    await user.unhover(screen.getByText('apple'));
    expect(screen.getByText('apple')).toBeInTheDocument();

    await user.click(screen.getByRole('combobox', {name: 'Available: Search'}));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText(/: active$/)).toBeInTheDocument();
});
