import userEvent from '@testing-library/user-event';

import {render, screen, waitFor} from '../../../../test-utils/utils';
import {SharePopover} from '../SharePopover';

test('Click opens the share dialog and Escape restores focus to the trigger', async () => {
    render(<SharePopover buttonAriaLabel="Share" openByHover={false} url="https://example.com" />);
    const user = userEvent.setup();
    const trigger = screen.getByRole('button', {name: 'Share'});
    await user.click(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
});

test('A non-autoclosable popover stays open after leaving the trigger', async () => {
    render(
        <SharePopover
            buttonAriaLabel="Share"
            autoclosable={false}
            closeDelay={0}
            url="https://example.com"
        />,
    );
    const user = userEvent.setup();
    const trigger = screen.getByRole('button', {name: 'Share'});
    await user.hover(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    await user.unhover(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(trigger);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

test('Uses Web Share without opening the popover', async () => {
    const share = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {value: share, configurable: true});
    try {
        render(<SharePopover buttonAriaLabel="Share" useWebShareApi url="https://example.com" />);
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', {name: 'Share'}));
        expect(share).toHaveBeenCalledWith({
            url: 'https://example.com',
            title: undefined,
            text: undefined,
        });
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    } finally {
        Reflect.deleteProperty(navigator, 'share');
    }
});
