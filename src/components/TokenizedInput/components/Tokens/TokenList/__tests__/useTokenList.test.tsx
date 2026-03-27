import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {TokenizedInputComponentContextProvider} from '../../../../context/TokenizedInputComponentsContext';
import {InputContext} from '../../../../context/TokenizedInputContext';
import {useTokenList} from '../useTokenList';

describe('useTokenList', () => {
    const mockToken = {
        id: '1',
        kind: 'regular',
        value: {key: 'User', value: 'Ivan'},
    };

    const mockNewToken = {
        id: '2',
        kind: 'new',
        value: {key: 'Status', value: ''},
    };

    const mockInputInfo = {
        state: {
            tokens: [mockToken, mockNewToken],
        },
    };

    const mockComponentsInfo = {
        Token: () => <div />,
        Wrapper: () => <div />,
        TokenList: () => <div />,
        Field: () => <div />,
        Suggestions: () => <div />,
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <InputContext.Provider value={mockInputInfo as any}>
            <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                {children}
            </TokenizedInputComponentContextProvider>
        </InputContext.Provider>
    );

    it('should return tokens, newTokenIdx, Token component, and classNames', () => {
        const {result} = renderHook(() => useTokenList(), {wrapper});

        expect(result.current.tokens).toEqual([mockToken, mockNewToken]);
        expect(result.current.newTokenIdx).toBe(1); // One regular token before it
        expect(result.current.Token).toBeDefined();
        expect(result.current.classNames.wrapper).toBe('gc-tokenized-input__token-list');
    });

    it('should calculate newTokenIdx correctly when there are no regular tokens', () => {
        const inputInfoOnlyNew = {
            state: {
                tokens: [mockNewToken],
            },
        };

        const wrapperOnlyNew = ({children}: {children: React.ReactNode}) => (
            <InputContext.Provider value={inputInfoOnlyNew as any}>
                <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                    {children}
                </TokenizedInputComponentContextProvider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useTokenList(), {wrapper: wrapperOnlyNew});

        expect(result.current.newTokenIdx).toBe(0);
    });
});
