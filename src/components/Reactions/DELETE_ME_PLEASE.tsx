import * as React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {Button, Flex, Icon, Link, Palette, Popup} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {i18n} from './i18n';

import './Reactions.scss';

const b = block('reactions');

export function PopupWithPalette() {
    return usePopup('Просто Palette', <Palette options={[{value: 'a', content: 'A'}]}></Palette>);
}

export function PopupWithButton() {
    return usePopup('Просто кнопка', <Button>Кнопка</Button>);
}

export function PopupWithLink() {
    return usePopup('Просто кнопка', <Link href="">ссылка</Link>);
}

function usePopup(label: string, paletteContent: React.ReactNode) {
    const [addReactionsElement, setAddReactionsElement] = React.useState<HTMLButtonElement | null>(
        null,
    );

    const [palettePopupOpened, setPalettePopupOpened] = React.useState(false);

    const onOpenPalettePopup = React.useCallback(() => setPalettePopupOpened(true), []);
    const onClosePalettePopup = React.useCallback(() => setPalettePopupOpened(false), []);
    const onTogglePalettePopup = React.useCallback(
        () => (palettePopupOpened ? onClosePalettePopup() : onOpenPalettePopup()),
        [onClosePalettePopup, onOpenPalettePopup, palettePopupOpened],
    );

    const onOpenedChanged = React.useCallback(
        (opened: boolean) => {
            if (!opened) {
                onClosePalettePopup();
            }
        },
        [onClosePalettePopup],
    );

    const addReactionButton = (
        <Button
            className={b('reaction-button')}
            ref={setAddReactionsElement}
            size="m"
            aria-label={i18n('add-reaction')}
            onClick={onTogglePalettePopup}
            view="flat-secondary"
        >
            <Button.Icon>
                <Icon data={FaceSmile} />
            </Button.Icon>
        </Button>
    );

    const addReactionPopup = (
        <Popup
            className={b('add-reaction-popover')}
            anchorElement={addReactionsElement}
            open={palettePopupOpened}
            initialFocus={0}
            modal={true}
            onOpenChange={onOpenedChanged}
        >
            {paletteContent}
        </Popup>
    );

    return (
        <Flex alignItems="center">
            {addReactionButton}
            {addReactionPopup}
        </Flex>
    );
}
