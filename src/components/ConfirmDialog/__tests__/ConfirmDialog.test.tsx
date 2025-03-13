import React from 'react';

import userEvent from '@testing-library/user-event';

import {render} from '../../../../test-utils/utils';
import {ConfirmDialog} from '../ConfirmDialog';
const qaId = 'confirm-dialog-component';

const closeMockFn = jest.fn();
const applyMockFn = jest.fn();

describe('ConfirmDialog', () => {
    test('Apply button is ignored on keyboard enter click', async () => {
        render(
            <ConfirmDialog
                qa={qaId}
                open={true}
                onClose={closeMockFn}
                onClickButtonApply={applyMockFn}
                propsButtonApply={{disabled: true, extraProps: {autoFocus: true}}}
            />,
        );

        const user = userEvent.setup();
        await user.keyboard('{enter}');

        expect(applyMockFn).not.toHaveBeenCalled();
    });
});
