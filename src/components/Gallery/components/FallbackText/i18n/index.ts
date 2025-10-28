import {addComponentKeysets} from '@gravity-ui/uikit/i18n';

import {NAMESPACE} from '../../../../utils/cn';

import en from './en.json';
import ru from './ru.json';

export type FallbackTextI18nKey = 'cannot-display-file';

export const i18n = addComponentKeysets({en, ru}, `${NAMESPACE}files-gallery-fallback-text`);
