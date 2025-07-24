import {CSSProperties, Flex} from '@gravity-ui/uikit';

import {block} from '../utils/cn';

const b = block('reactions');

export type ReactionsContainerProps = {
    className?: string;
    style?: CSSProperties;
    qa?: string;
    children?: React.ReactNode;
};

export function ReactionsContainer({className, style, qa, children}: ReactionsContainerProps) {
    return (
        <Flex className={b(null, className)} style={style} gap={1} wrap={true} qa={qa}>
            {children}
        </Flex>
    );
}
