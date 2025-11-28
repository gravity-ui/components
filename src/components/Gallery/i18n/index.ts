import {addComponentKeysets} from '@gravity-ui/uikit/i18n';

import {NAMESPACE} from '../../utils/cn';

import en from './en.json';
import ru from './ru.json';

export const i18n = addComponentKeysets({en, ru}, `${NAMESPACE}gallery`);

export type TFn = ReturnType<(typeof i18n)['useTranslation']>['t'];
export type TProps = {t: TFn};
export type WithTFn = (props: TProps) => string;
