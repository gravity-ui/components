import React from 'react';

import {CircleExclamation} from '@gravity-ui/icons';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {FilePreview} from '../FilePreview';

test('Renders base content', () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const imageSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    render(<FilePreview file={{name: fileName, type: fileType} as File} imageSrc={imageSrc} />);

    expect(screen.getByText(fileName)).toBeInTheDocument();
});

test('Renders preview image', () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const imageSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    render(<FilePreview file={{name: fileName, type: fileType} as File} imageSrc={imageSrc} />);

    const previewImage = screen.getByRole('img');

    expect(previewImage).toHaveAttribute('src', imageSrc);
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
    await user.click(filePreview);

    expect(clickHandler).toBeCalled();
});

test('Renders actions', () => {
    const fileName = 'Some file name';
    const fileType = 'image/png';
    const imageSrc =
        'https://storage.yandexcloud.net/uikit-storybook-assets/changelog-dialog-picture-2.png';

    const firstActionText = 'some hint';
    const secondActionText = 'second hint';

    render(
        <FilePreview
            file={{name: fileName, type: fileType} as File}
            imageSrc={imageSrc}
            actions={[
                {icon: CircleExclamation, title: firstActionText},
                {icon: CircleExclamation, title: secondActionText},
            ]}
        />,
    );

    const firstAction = screen.getByRole('button', {name: firstActionText});
    expect(firstAction).toBeDefined();

    const secondAction = screen.getByRole('button', {name: secondActionText});
    expect(secondAction).toBeDefined();
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
        await user.click(actionButton);
    }

    expect(firstActionsClickHandler).toBeCalled();
    expect(secondActionsClickHandler).toBeCalled();
});
