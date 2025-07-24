import * as React from 'react';

import {Loader} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

import {useOnIntersected} from './hooks/useOnIntersected';

import './InfiniteScroll.scss';

export interface InfiniteScrollProps {
    /** When called shows loader and wait till the promise is fulfilled to hide loader */
    onActivate: () => Promise<void>;
    /** Turn off activation */
    disabled: boolean;
    children: React.ReactNode;
    /** Custom loader */
    loader?: React.ReactNode;
}

const b = block('infinite-scroll');

export const InfiniteScroll = ({onActivate, disabled, children, loader}: InfiniteScrollProps) => {
    const [isActive, setIsActive] = React.useState(false);
    const [bottomRef, setBottomRef] = React.useState<HTMLDivElement | null>(null);
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    useOnIntersected(bottomRef, () => {
        const handleFetchData = async () => {
            setIsActive(true);
            await onActivate();

            if (mounted.current) {
                setIsActive(false);
            }
        };

        if (!isActive && !disabled) {
            handleFetchData();
        }
    });

    const renderedLoader = loader || (
        <div className={b('loader')}>
            <Loader size="l" />
        </div>
    );

    return (
        <React.Fragment>
            {children}

            {isActive && renderedLoader}

            <div className={b('intersector')} ref={setBottomRef} />
        </React.Fragment>
    );
};
