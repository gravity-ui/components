import React from 'react';

import {FaceSmile} from '@gravity-ui/icons';
import {Button, ButtonSize, Icon, Popover} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

const b = block('reactions');

type ReactionsMarketProps = {
    content: React.ReactNode;
    size?: ButtonSize;
};

// const offset: [number, number] = [-4, -2];

export const AddReactionButton = React.memo(function AddReactionButton(
    props: ReactionsMarketProps,
) {
    // const [isOpened, setIsOpened] = React.useState(false);
    // const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    // const onClick = React.useCallback(() => {
    //     setIsOpened(!isOpened);
    // }, [isOpened]);

    // const closePopup = React.useCallback(() => {
    //     setIsOpened(false);
    // }, []);

    return (
        <Popover content={props.content} openOnHover={false} hasArrow={false}>
            <Button
                className={b('add-button')}
                // ref={buttonRef}
                // onClick={onClick}
                size={props.size}
                view="flat"
            >
                <Button.Icon>
                    <Icon data={FaceSmile} />
                </Button.Icon>
            </Button>
        </Popover>
    );

    // return (
    //     <React.Fragment>
    //         <Button
    //             className={b('add-button')}
    //             ref={buttonRef}
    //             onClick={onClick}
    //             size={size}
    //             view="flat"
    //         >
    //             <Button.Icon>
    //                 <Icon data={FaceSmile} />
    //             </Button.Icon>
    //         </Button>
    //         <Popup
    //             placement={['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end']}
    //             anchorRef={buttonRef}
    //             open={isOpened}
    //             onOutsideClick={closePopup}
    //             offset={offset}
    //         >
    //             {props.reactionsMarket}
    //         </Popup>
    //     </React.Fragment>
    // );
});
