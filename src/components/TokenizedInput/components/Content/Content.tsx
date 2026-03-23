import {useTokenizedInputComponents} from '../../context';

export function Content() {
    const {Wrapper, TokenList} = useTokenizedInputComponents();

    return (
        <Wrapper>
            <TokenList />
        </Wrapper>
    );
}
