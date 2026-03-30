import * as React from 'react';

import {renderHook} from '@testing-library/react';

import {TokenizedInputComponentContextProvider} from '../../../../context/TokenizedInputComponentsContext';
import {
    FocusContext,
    InputContext,
    OptionsContext,
} from '../../../../context/TokenizedInputContext';
import type {
    TokenValueBase,
    TokenizedInputFocusInfo,
    TokenizedInputInfo,
    TokenizedInputOptionsInfo,
} from '../../../../types';
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

    const mockFocusInfo = {
        state: {
            focus: {idx: 0, key: 'key'},
        },
    };

    const mockOptionsInfo = {
        shouldAllowBlur: jest.fn().mockReturnValue(true),
    };

    const mockComponentsInfo = {
        Token: () => <div />,
        Wrapper: () => <div />,
        TokenList: () => <div />,
        Field: () => <div />,
        Suggestions: () => <div />,
    };

    const wrapper = ({children}: {children: React.ReactNode}) => (
        <InputContext.Provider
            value={mockInputInfo as unknown as TokenizedInputInfo<TokenValueBase>}
        >
            <FocusContext.Provider
                value={mockFocusInfo as unknown as TokenizedInputFocusInfo<TokenValueBase>}
            >
                <OptionsContext.Provider
                    value={mockOptionsInfo as unknown as TokenizedInputOptionsInfo<TokenValueBase>}
                >
                    <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                        {children}
                    </TokenizedInputComponentContextProvider>
                </OptionsContext.Provider>
            </FocusContext.Provider>
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
            <InputContext.Provider
                value={inputInfoOnlyNew as unknown as TokenizedInputInfo<TokenValueBase>}
            >
                <TokenizedInputComponentContextProvider {...mockComponentsInfo}>
                    {children}
                </TokenizedInputComponentContextProvider>
            </InputContext.Provider>
        );

        const {result} = renderHook(() => useTokenList(), {wrapper: wrapperOnlyNew});

        expect(result.current.newTokenIdx).toBe(0);
    });
});
