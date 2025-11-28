import {addComponentKeysets} from '@gravity-ui/uikit/i18n';

import {NAMESPACE} from '../../utils/cn';

import en from './en.json';
import ru from './ru.json';

export const i18n = addComponentKeysets({en, ru}, `${NAMESPACE}gallery`);

/** @internal */
export type TFn = ReturnType<(typeof i18n)['useTranslation']>['t'];
/** @internal */
export type TProps = {t: TFn};
/** @internal */
export type WithTFn = (props: TProps) => string;
