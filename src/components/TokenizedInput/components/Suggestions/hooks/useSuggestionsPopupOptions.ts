import * as React from 'react';

import type {PopupOffset} from '@gravity-ui/uikit';

import {useTokenizedInput} from '../../../context';

export const useSuggestionsPopupOptions = (inputElement: HTMLInputElement | null) => {
    const {inputInfo, options} = useTokenizedInput();

    const {wrapperRef} = inputInfo.state;
    const {fullWidthSuggestions} = options;

    const [popupWidth, setPopupWidth] = React.useState(
        fullWidthSuggestions ? wrapperRef.current?.offsetWidth : undefined,
    );

    React.useEffect(() => {
        if (!fullWidthSuggestions || !wrapperRef.current) {
            return () => {};
        }

        const resizeObserver = new ResizeObserver((resizes) => {
            setPopupWidth(resizes[0].borderBoxSize[0].inlineSize);
        });

        resizeObserver.observe(wrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [wrapperRef, fullWidthSuggestions]);

    const popupOffset = React.useMemo<PopupOffset>(() => {
        if (!fullWidthSuggestions) {
            return 0;
        }

        const inputX = inputElement?.getBoundingClientRect()?.x ?? 0;
        const wrapperX = wrapperRef.current?.getBoundingClientRect()?.x ?? 0;

        return {mainAxis: 0, crossAxis: wrapperX - inputX};
    }, [fullWidthSuggestions, inputElement, wrapperRef]);

    return {popupWidth, popupOffset};
};
