import {withNaming} from '@bem-react/classname';

export type CnMods = Record<string, string | boolean | undefined>;

export const NAMESPACE = 'gc-';

export const cn = withNaming({e: '__', m: '_', v: '_'});
export const block = withNaming({n: NAMESPACE, e: '__', m: '_', v: '_'});
