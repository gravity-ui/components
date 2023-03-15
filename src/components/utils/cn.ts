import bemBlock from 'bem-cn-lite';

export type CnBlock = ReturnType<typeof bemBlock>;

export const NAMESPACE = 'g-';

export function block(name: string): CnBlock {
    return bemBlock(`${NAMESPACE}${name}`);
}
