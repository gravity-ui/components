import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {OptionsContext} from '../../context/TokenizedInputContext';
import type {TokenValueBase, TokenizedInputOptionsInfo} from '../../types';
import {useApplyCallbackOnBlur} from '../useApplyCallbackOnBlur';

describe('useApplyCallbackOnBlur', () => {
    it('should call fn when focus moves outside and shouldAllowBlur returns true', () => {
        const fn = jest.fn();
        const shouldAllowBlur = jest.fn().mockReturnValue(true);

        const wrapper = ({children}: {children: React.ReactNode}) => (
            <OptionsContext.Provider
                value={{shouldAllowBlur} as unknown as TokenizedInputOptionsInfo<TokenValueBase>}
            >
                {children}
            </OptionsContext.Provider>
        );

        const {result} = renderHook(() => useApplyCallbackOnBlur(fn), {wrapper});

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(false),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        result.current(event);

        expect(event.currentTarget.contains).toHaveBeenCalledWith(event.relatedTarget);
        expect(shouldAllowBlur).toHaveBeenCalledWith(event);
        expect(fn).toHaveBeenCalledWith(event);
    });

    it('should not call fn when focus moves inside', () => {
        const fn = jest.fn();
        const shouldAllowBlur = jest.fn().mockReturnValue(true);

        const wrapper = ({children}: {children: React.ReactNode}) => (
            <OptionsContext.Provider
                value={{shouldAllowBlur} as unknown as TokenizedInputOptionsInfo<TokenValueBase>}
            >
                {children}
            </OptionsContext.Provider>
        );

        const {result} = renderHook(() => useApplyCallbackOnBlur(fn), {wrapper});

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(true),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        result.current(event);

        expect(event.currentTarget.contains).toHaveBeenCalledWith(event.relatedTarget);
        expect(shouldAllowBlur).not.toHaveBeenCalled();
        expect(fn).not.toHaveBeenCalled();
    });

    it('should not call fn when shouldAllowBlur returns false', () => {
        const fn = jest.fn();
        const shouldAllowBlur = jest.fn().mockReturnValue(false);

        const wrapper = ({children}: {children: React.ReactNode}) => (
            <OptionsContext.Provider
                value={{shouldAllowBlur} as unknown as TokenizedInputOptionsInfo<TokenValueBase>}
            >
                {children}
            </OptionsContext.Provider>
        );

        const {result} = renderHook(() => useApplyCallbackOnBlur(fn), {wrapper});

        const event = {
            currentTarget: {
                contains: jest.fn().mockReturnValue(false),
            },
            relatedTarget: {},
        } as unknown as React.FocusEvent;

        result.current(event);

        expect(event.currentTarget.contains).toHaveBeenCalledWith(event.relatedTarget);
        expect(shouldAllowBlur).toHaveBeenCalledWith(event);
        expect(fn).not.toHaveBeenCalled();
    });
});
