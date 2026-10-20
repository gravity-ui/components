import {MobileProvider} from '@gravity-ui/uikit';
import userEvent from '@testing-library/user-event';

import {render, screen, waitFor} from '../../../../test-utils/utils';
import {Gallery} from '../Gallery';
import {GalleryItem} from '../GalleryItem';
import {getGalleryItemCopyLinkAction} from '../utils/getGalleryItemCopyLinkAction';

const copyUrl = 'https://example.com/image.png';

describe('getGalleryItemCopyLinkAction', () => {
    beforeAll(() => {
        HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should show copy feedback and report the copied URL', async () => {
        const user = userEvent.setup();
        const onCopy = jest.fn();
        renderCopyAction(onCopy);

        const button = screen.getByRole('button', {name: 'Copy link'});
        await user.hover(button);
        expect(await screen.findByText('Copy link')).toBeVisible();
        await user.click(button);

        expect(onCopy).toHaveBeenCalledWith(copyUrl, true);
        expect(await navigator.clipboard.readText()).toBe(copyUrl);
        expect(await screen.findByText('Copied')).toBeVisible();
    });

    it('should keep the copy label and action in the mobile menu', async () => {
        const user = userEvent.setup();
        renderCopyAction(undefined, true);

        await user.click(screen.getByRole('button', {name: 'Close'}));
        const button = await screen.findByRole('button', {name: 'Copy link'});
        expect(button).toHaveTextContent('Copy link');
        await user.click(button);

        expect(await navigator.clipboard.readText()).toBe(copyUrl);
    });

    it('should report a failed copy', async () => {
        const user = userEvent.setup();
        jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Copy denied'));
        const onCopy = jest.fn();
        renderCopyAction(onCopy);

        await user.click(screen.getByRole('button', {name: 'Copy link'}));

        await waitFor(() => expect(onCopy).toHaveBeenCalledWith(copyUrl, false));
        expect(screen.queryByText('Copied')).not.toBeInTheDocument();
    });
});

function renderCopyAction(onCopy?: (text: string, success: boolean) => void, mobile = false) {
    return render(
        <MobileProvider mobile={mobile}>
            <Gallery view="inline">
                <GalleryItem
                    view={<div>Image</div>}
                    thumbnail={<span>Thumbnail</span>}
                    actions={[getGalleryItemCopyLinkAction({copyUrl, onCopy})]}
                />
            </Gallery>
        </MobileProvider>,
    );
}
