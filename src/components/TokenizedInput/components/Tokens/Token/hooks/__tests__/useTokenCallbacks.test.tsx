import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {FocusContext, InputContext} from '../../../../../context/TokenizedInputContext';
import {useTokenCallbacks} from '../useTokenCallbacks';

describe('useTokenCallbacks', () => {
    it('should provide onChangeField and onFocusField callbacks', () => {
        const mockOnChangeToken = jest.fn();
        const mockOnFocus = jest.fn();

        const wrapper = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={{callbacks: {onChangeToken: mockOnChangeToken}} as any}>
                <FocusContext.Provider value={{callbacks: {onFocus: mockOnFocus}} as any}>
                    {children}
                </FocusContext.Provider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useTokenCallbacks(), {wrapper});

        result.current.onChangeField(1, 'key', 'value');
        expect(mockOnChangeToken).toHaveBeenCalledWith(1, {key: 'value'});

        result.current.onFocusField(1, 'key');
        expect(mockOnFocus).toHaveBeenCalledWith({idx: 1, key: 'key'});
    });
});
