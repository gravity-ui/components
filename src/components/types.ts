import type {i18n as AdaptiveTabsKeyset} from './AdaptiveTabs/i18n';
import type {i18n as ChangelogDialogKeyset} from './ChangelogDialog/i18n';
import type {i18n as CookieConsentKeyset} from './CookieConsent/i18n';
import type {i18n as FormRowKeyset} from './FormRow/i18n';
import type {i18n as GalleryFallbackTextKeyset} from './Gallery/components/FallbackText/i18n';
import type {i18n as GalleryFullscreenActionKeyset} from './Gallery/components/actions/FullScreenAction/i18n';
import type {i18n as GalleryVideoViewKeyset} from './Gallery/components/views/VideoView/i18n';
import type {i18n as GalleryKeyset} from './Gallery/i18n';
import type {i18n as ItemSelectorKeyset} from './ItemSelector/i18n';
import type {i18n as NotificationsKeyset} from './Notifications/i18n';
import type {i18n as OnboardingMenuKeyset} from './OnboardingMenu/i18n';
import type {i18n as ReactionsKeyset} from './Reactions/i18n';
import type {i18n as SharePopoverKeyset} from './SharePopover/i18n';

/* DeepPartial with depth limitation up to 9 */
type DeepPartial<T, N extends number = 9> = N extends 0
    ? T
    : Partial<{[P in keyof T]: DeepPartial<T[P], [never, 0, 1, 2, 3, 4, 5, 6, 7, 8][N]>}>;

export type Keysets = typeof AdaptiveTabsKeyset.keysetData &
    typeof ChangelogDialogKeyset.keysetData &
    typeof CookieConsentKeyset.keysetData &
    typeof FormRowKeyset.keysetData &
    typeof GalleryKeyset.keysetData &
    typeof GalleryFullscreenActionKeyset.keysetData &
    typeof GalleryFallbackTextKeyset.keysetData &
    typeof GalleryVideoViewKeyset.keysetData &
    typeof ItemSelectorKeyset.keysetData &
    typeof NotificationsKeyset.keysetData &
    typeof OnboardingMenuKeyset.keysetData &
    typeof ReactionsKeyset.keysetData &
    typeof SharePopoverKeyset.keysetData;

export type PartialKeysets = DeepPartial<Keysets, 2>;
