import type {i18n as FallbackTextKeyset} from '../components/FallbackText/i18n';
import type {i18n as FullScreenActionKeyset} from '../components/actions/FullScreenAction/i18n';
import type {i18n as VideoViewKeyset} from '../components/views/VideoView/i18n';

import type {i18n as GalleryKeyset} from './index';

export type GalleryI18nKeys = typeof GalleryKeyset.keysetData;
export type FallbackTextI18nKeys = typeof FallbackTextKeyset.keysetData;
export type FullScreenActionI18nKeys = typeof FullScreenActionKeyset.keysetData;
export type VideoViewI18nKeys = typeof VideoViewKeyset.keysetData;

export type GalleryKeysets = GalleryI18nKeys &
    FallbackTextI18nKeys &
    FullScreenActionI18nKeys &
    VideoViewI18nKeys;
