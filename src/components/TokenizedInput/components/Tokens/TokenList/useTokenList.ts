import * as React from 'react';

import {b} from '../../../constants';
import {useTokenizedInput, useTokenizedInputComponents} from '../../../context';

export const useTokenList = () => {
    const {inputInfo} = useTokenizedInput();
    const {Token} = useTokenizedInputComponents();

    const {tokens} = inputInfo.state;

    const newTokenIdx = tokens.filter((t) => !t.isNew).length;
    const classNames = React.useMemo(() => ({wrapper: b('token-list')}), []);

    return React.useMemo(
        () => ({Token, tokens, newTokenIdx, classNames}),
        [Token, classNames, newTokenIdx, tokens],
    );
};
