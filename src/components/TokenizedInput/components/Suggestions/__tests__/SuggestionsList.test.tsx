import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../../test-utils/utils';
import {SuggestionsList} from '../SuggestionsList';

const suggestions = {
    items: [
        {label: 'First', search: 'duplicate', value: {name: 'first'}},
        {label: 'Second', search: 'duplicate', value: {name: 'second'}},
    ],
};

test('Applies the clicked suggestion even when search strings repeat', async () => {
    const onApplySuggestion = jest.fn();
    render(
        <SuggestionsList
            selected={1}
            isLoading={false}
            suggestions={suggestions}
            onApplySuggestion={onApplySuggestion}
        />,
    );
    expect(screen.getByRole('option', {name: 'Second'})).toHaveAttribute('data-active');
    const user = userEvent.setup();
    await user.click(screen.getByRole('option', {name: 'First'}));
    expect(onApplySuggestion).toHaveBeenCalledWith(suggestions.items[0]);
});

test('Shows the empty message only when loading is finished', () => {
    const props = {
        selected: -1,
        suggestions: {
            items: [],
            currentWord: {value: 'pear', offset: 0, position: {start: 0, end: 4}},
        },
        onApplySuggestion: jest.fn(),
    };
    const {rerender} = render(<SuggestionsList {...props} isLoading />);
    expect(screen.queryByText(/No matches/)).not.toBeInTheDocument();
    rerender(<SuggestionsList {...props} isLoading={false} />);
    expect(screen.getByText('No matches for the search string «pear»')).toBeInTheDocument();
});
