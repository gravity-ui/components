import {useTokenList} from './useTokenList';

export function TokenList() {
    const {Token, tokens, newTokenIdx, classNames} = useTokenList();

    return (
        <div className={classNames.wrapper}>
            {tokens.map((token, idx) => {
                if (token.kind === 'new') {
                    return null;
                }

                return <Token key={token.id} idx={idx} />;
            })}
            <Token key={`newToken-${newTokenIdx}`} idx={newTokenIdx} kind="new" />
        </div>
    );
}
