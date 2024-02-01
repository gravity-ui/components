import React from 'react';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {DelayedTextInput} from '../DelayedTextInput';

setupTimersMock();

const qaAttribute = 'delayed-input';
const finalSearchTerm = 'Grocery stores around';

describe('DelayedTextInput', () => {
    test('it renders input', async () => {
        render(
            <DelayedTextInput
                value={finalSearchTerm}
                onUpdate={jest.fn()}
                delay={300}
                qa={qaAttribute}
            />,
        );

        // eslint-disable-next-line testing-library/no-node-access
        const [textInput] = screen.getByTestId(qaAttribute).getElementsByTagName('input');

        expect(textInput).toBeVisible();
        expect(textInput).toHaveValue(finalSearchTerm);
    });

    test('it delays passed onUpdate callback invocation', async () => {
        const delay = 300;

        const setSearchTermMock = jest.fn();

        render(
            <DelayedTextInput
                value={''}
                onUpdate={setSearchTermMock}
                delay={delay}
                qa={qaAttribute}
            />,
        );

        // eslint-disable-next-line testing-library/no-node-access
        const [textInput] = screen.getByTestId(qaAttribute).getElementsByTagName('input');

        fireEvent.change(textInput, {target: {value: finalSearchTerm.slice(0, 5)}});
        fireEvent.change(textInput, {target: {value: finalSearchTerm}});

        expect(textInput).toHaveValue(finalSearchTerm);

        jest.runAllTimers();

        expect(setSearchTermMock).toBeCalledTimes(1);
        expect(setSearchTermMock).toBeCalledWith(finalSearchTerm);
    });

    test('it instantly clears input value when user clicks clear button', async () => {
        const delay = 4000;

        const setSearchTermMock = jest.fn();

        render(
            <DelayedTextInput
                value={finalSearchTerm}
                onUpdate={setSearchTermMock}
                delay={delay}
                qa={qaAttribute}
                hasClear
            />,
        );

        // eslint-disable-next-line testing-library/no-node-access
        const [textInput] = screen.getByTestId(qaAttribute).getElementsByTagName('input');
        expect(textInput).toHaveValue(finalSearchTerm);

        const clearButton = screen.getByLabelText('clear', {exact: false});
        fireEvent.click(clearButton);

        expect(textInput).toHaveValue('');
    });
});
