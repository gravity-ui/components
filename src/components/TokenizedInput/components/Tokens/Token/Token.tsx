import {NewToken as NewTokenComponent, NewTokenProps} from './NewToken';
import {RegularToken as RegularTokenComponent, RegularTokenProps} from './RegularToken';

export type TokenProps = (
    | ({isNew: true} & NewTokenProps)
    | ({isNew?: false} & RegularTokenProps)
) & {
    NewToken?: typeof NewTokenComponent;
    RegularToken?: typeof RegularTokenComponent;
};

const TokenComponent = ({
    NewToken = NewTokenComponent,
    RegularToken = RegularTokenComponent,
    ...props
}: TokenProps) => {
    if (props.isNew === true) {
        return <NewToken {...props} />;
    }

    return <RegularToken {...props} />;
};

type TToken = typeof TokenComponent & {
    Regular: typeof RegularTokenComponent;
    New: typeof NewTokenComponent;
};

export const Token = TokenComponent as TToken;

Token.Regular = RegularTokenComponent;
Token.New = NewTokenComponent;
