import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
import {ChangelogDialog} from '../ChangelogDialog';
import type {ChangelogItem} from '../types';

const items: ChangelogItem[] = [
    {
        date: '2022-07-03',
        isNew: true,
        title: 'New navigation',
        description: 'Navigation description',
        storyId: 'storyId',
        link: 'https://example.com',
    },
    {
        date: '2022-06-15',
        title: 'Minor fixes',
        description: 'Fixes description',
    },
];

test('Renders the list of versions', () => {
    render(<ChangelogDialog open items={items} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog', {name: 'Changelog'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'New navigation'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Minor fixes'})).toBeInTheDocument();
    expect(screen.getByText('Navigation description')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
});

test('Renders nothing when closed', () => {
    render(<ChangelogDialog open={false} items={items} onClose={jest.fn()} />);

    expect(screen.queryByRole('heading', {name: 'New navigation'})).not.toBeInTheDocument();
});

test('Renders placeholder when there are no versions', () => {
    render(<ChangelogDialog open items={[]} onClose={jest.fn()} />);

    expect(screen.getByText('No data')).toBeInTheDocument();
});

test('Renders link to the full changelog when fullListLink is set', () => {
    render(
        <ChangelogDialog
            open
            items={items}
            fullListLink="https://example.com/changelog"
            onClose={jest.fn()}
        />,
    );

    expect(screen.getByRole('link', {name: 'View full changelog'})).toHaveAttribute(
        'href',
        'https://example.com/changelog',
    );
});

test('Hides versions while loading', () => {
    render(<ChangelogDialog open loading items={items} onClose={jest.fn()} />);

    expect(screen.queryByRole('heading', {name: 'New navigation'})).not.toBeInTheDocument();
    expect(screen.queryByText('No data')).not.toBeInTheDocument();
});

test('Shows error instead of versions and calls onRetryClick', async () => {
    const handleRetryClick = jest.fn();

    render(
        <ChangelogDialog
            open
            error
            items={items}
            onRetryClick={handleRetryClick}
            onClose={jest.fn()}
        />,
    );

    expect(screen.getByText('Unable load changelog')).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'New navigation'})).not.toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(screen.getByRole('button', {name: 'Retry'})));

    expect(handleRetryClick).toBeCalled();
});

test('Shows custom error title and description', () => {
    render(
        <ChangelogDialog
            open
            error={{title: 'Error title', description: 'Error description'}}
            items={items}
            onClose={jest.fn()}
        />,
    );

    expect(screen.getByText('Error title')).toBeInTheDocument();
    expect(screen.getByText('Error description')).toBeInTheDocument();
});

test('Calls onStoryClick and onLinkClick', async () => {
    const handleStoryClick = jest.fn();
    const handleLinkClick = jest.fn();

    render(
        <ChangelogDialog
            open
            items={items}
            onStoryClick={handleStoryClick}
            onLinkClick={handleLinkClick}
            onClose={jest.fn()}
        />,
    );

    const user = userEvent.setup();

    await act(() => user.click(screen.getByRole('button', {name: 'View story'})));
    expect(handleStoryClick).toBeCalledWith('storyId');

    await act(() => user.click(screen.getByRole('link', {name: 'Read more'})));
    expect(handleLinkClick).toBeCalledWith('https://example.com');
});

test('Applies className to the dialog', () => {
    const {baseElement} = render(
        <ChangelogDialog open items={items} className="custom-class" onClose={jest.fn()} />,
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(baseElement.querySelector('.gc-changelog-dialog')).toHaveClass('custom-class');
});

test('Applies modalClassName to the element the size CSS variables are read on', () => {
    const {baseElement} = render(
        <ChangelogDialog open items={items} modalClassName="custom-class" onClose={jest.fn()} />,
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(baseElement.querySelector('.gc-changelog-dialog__modal')).toHaveClass('custom-class');
});
