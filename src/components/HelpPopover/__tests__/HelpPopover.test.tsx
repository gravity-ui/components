import React from 'react';

import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, render, screen} from '../../../../test-utils/utils';
import {HelpPopover} from '../HelpPopover';

const qaId = 'help-popover-component';

function waitForTooltipOpenedStateChange() {
    jest.advanceTimersByTime(300);
}

setupTimersMock();

describe('HelpPopover', () => {
    test('render popup when hover help icon', async () => {
        const title = 'HelpPopover title';

        render(<HelpPopover qa={qaId} title={title} />);

        const icon = screen.getByTestId(qaId);
        expect(icon).toBeVisible();

        // eslint-disable-next-line testing-library/await-async-events
        userEvent.hover(icon);

        act(() => {
            waitForTooltipOpenedStateChange();
        });

        const popoverTitle = await screen.findByText(title);
        expect(popoverTitle).toBeVisible();
    });
});
