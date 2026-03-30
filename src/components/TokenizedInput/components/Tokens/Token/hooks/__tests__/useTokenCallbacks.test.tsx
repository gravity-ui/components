import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {
    FocusContext,
    InputContext,
    OptionsContext,
} from '../../../../../context/TokenizedInputContext';
import type {
    TokenValueBase,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
    TokenizedInputOptionsInfo,
} from '../../../../../types';
import {useTokenCallbacks} from '../useTokenCallbacks';

describe('useTokenCallbacks', () => {
    it('should provide onChangeField and onFocusField callbacks', () => {
        const mockInputInfo = {
            callbacks: {onChangeToken: jest.fn()},
        };
        const mockFocusInfo = {
            callbacks: {onFocus: jest.fn()},
        };
        const mockOptionsInfo = {
            shouldAllowBlur: jest.fn().mockReturnValue(true),
        };

        const wrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider
                value={mockInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <FocusContext.Provider
                    value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
                >
                    <OptionsContext.Provider
                        value={
                            mockOptionsInfo as unknown as TokenizedInputOptionsInfo<TokenValueBase>
                        }
                    >
                        {children}
                    </OptionsContext.Provider>
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useTokenCallbacks(), {wrapper});

        result.current.onChangeField(1, 'key', 'value');
        expect(mockInputInfo.callbacks.onChangeToken).toHaveBeenCalledWith(1, {key: 'value'});

        result.current.onFocusField(1, 'key');
        expect(mockFocusInfo.callbacks.onFocus).toHaveBeenCalledWith({idx: 1, key: 'key'});
    });
});
