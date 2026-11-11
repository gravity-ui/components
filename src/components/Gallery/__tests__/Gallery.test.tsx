import {MobileProvider} from '@gravity-ui/uikit';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {Gallery} from '../Gallery';
import {GalleryItem} from '../GalleryItem';
import {getGalleryItemDownloadAction} from '../utils/getGalleryItemDownloadAction';

const renderItems = () => [
    <GalleryItem key="a" view={<div>Item A</div>} thumbnail={<span>thumb A</span>} name="A" />,
    <GalleryItem key="b" view={<div>Item B</div>} thumbnail={<span>thumb B</span>} name="B" />,
];

describe('Gallery', () => {
    beforeAll(() => {
        HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    describe('modal view', () => {
        it('should render the content and a close button when open', () => {
            render(
                <Gallery open onOpenChange={jest.fn()}>
                    {renderItems()}
                </Gallery>,
            );

            expect(screen.getByText('Item A')).toBeInTheDocument();
            expect(screen.getByLabelText('Close')).toBeInTheDocument();
        });

        it('should not render the content when closed', () => {
            render(
                <Gallery open={false} onOpenChange={jest.fn()}>
                    {renderItems()}
                </Gallery>,
            );

            expect(screen.queryByText('Item A')).not.toBeInTheDocument();
        });

        it('should call onOpenChange(false) when the close button is pressed', () => {
            const onOpenChange = jest.fn();
            render(
                <Gallery open onOpenChange={onOpenChange}>
                    {renderItems()}
                </Gallery>,
            );

            fireEvent.click(screen.getByLabelText('Close'));

            expect(onOpenChange).toHaveBeenCalledWith(false);
        });
    });

    it.each([
        {device: 'desktop', mobile: false},
        {device: 'mobile', mobile: true},
    ])('should isolate the opener for a download link on $device', async ({mobile}) => {
        const downloadUrl = 'https://example.test/image.png';

        render(
            <MobileProvider mobile={mobile}>
                <Gallery view="inline">
                    <GalleryItem
                        view={<div>Item A</div>}
                        thumbnail={<span>thumb A</span>}
                        actions={[getGalleryItemDownloadAction({downloadUrl})]}
                    />
                </Gallery>
            </MobileProvider>,
        );

        if (mobile) {
            fireEvent.click(screen.getByRole('button', {name: 'Close'}));
        }
        const link = await screen.findByRole('link', {name: 'Download'});

        expect(link).toHaveAttribute('href', downloadUrl);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    describe('inline view', () => {
        it('should render the content without a Modal, regardless of open', () => {
            render(<Gallery view="inline">{renderItems()}</Gallery>);

            expect(screen.getByText('Item A')).toBeInTheDocument();
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('should never render a built-in close button', () => {
            render(<Gallery view="inline">{renderItems()}</Gallery>);

            expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
        });

        it('should render item actions in the header, letting consumers provide their own dismiss control', () => {
            const onClick = jest.fn();
            render(
                <Gallery view="inline">
                    <GalleryItem
                        key="a"
                        view={<div>Item A</div>}
                        thumbnail={<span>thumb A</span>}
                        name="A"
                        actions={[
                            {
                                id: 'dismiss',
                                title: 'Dismiss',
                                icon: <span>x</span>,
                                onClick,
                            },
                        ]}
                    />
                </Gallery>,
            );

            const actionButton = screen.getByLabelText('Dismiss');
            fireEvent.click(actionButton);

            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
});
