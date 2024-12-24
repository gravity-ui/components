import {addComponentKeysets} from '@gravity-ui/uikit/i18n';

import {UNSTABLE_NAMESPACE} from '../../../utils/cn';

import en from './en.json';
import ru from './ru.json';

export const i18n = addComponentKeysets({en, ru}, `${UNSTABLE_NAMESPACE}stories`);
