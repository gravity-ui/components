import React from 'react';

import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {FilePreview} from '../FilePreview';
import {CircleExclamation} from '@gravity-ui/icons';

test('Renders base content', () => {
    const qaId = 'file-preview';
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const previewSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    render(
        <FilePreview
            qa={qaId}
            file={{name: fileName, type: fileType} as File}
            previewSrc={previewSrc}
        />,
    );

    const filePreview = screen.getByTestId(qaId);

    expect(filePreview).toBeDefined();
    expect(screen.getByText(fileName)).toBeInTheDocument();
});

test('Renders preview image', () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const previewSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    render(<FilePreview file={{name: fileName, type: fileType} as File} previewSrc={previewSrc} />);

    const previewImage = screen.getByRole('img');

    expect(previewImage).toHaveAttribute('src', previewSrc);
});

test('Call onClick handler', async () => {
    const qyId = 'file-preview';
    const fileName = 'Some file name';
    const fileType = 'image/png';

    const clickHandler = jest.fn();

    render(
        <FilePreview
            qa={qyId}
            file={{name: fileName, type: fileType} as File}
            onClick={clickHandler}
            actions={[
                {icon: CircleExclamation, title: 'some hint'},
                {icon: CircleExclamation, title: 'second hint'},
            ]}
        />,
    );

    const filePreview = screen.getByText(fileName);

    const user = userEvent.setup();
    await act(() => user.click(filePreview));

    expect(clickHandler).toBeCalled();
});

test('Renders actions', () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const previewSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    render(
        <FilePreview
            file={{name: fileName, type: fileType} as File}
            previewSrc={previewSrc}
            actions={[
                {icon: CircleExclamation, title: 'some hint'},
                {icon: CircleExclamation, title: 'second hint'},
            ]}
        />,
    );

    const actions = screen.getAllByRole('button');
    expect(actions).toBeDefined();
    expect(actions).toHaveLength(2);
});

test('Call action click handlers', async () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';

    const firstActionsClickHandler = jest.fn();
    const secondActionsClickHandler = jest.fn();

    render(
        <FilePreview
            file={{name: fileName, type: fileType} as File}
            actions={[
                {
                    icon: CircleExclamation,
                    title: 'some hint',
                    onClick: firstActionsClickHandler,
                },
                {
                    icon: CircleExclamation,
                    title: 'second hint',
                    onClick: secondActionsClickHandler,
                },
            ]}
        />,
    );

    const actionButtons = screen.getAllByRole('button');

    const user = userEvent.setup();
    for (const actionButton of actionButtons) {
        await act(() => user.click(actionButton));
    }

    expect(firstActionsClickHandler).toBeCalled();
    expect(secondActionsClickHandler).toBeCalled();
});
