import type {RealTheme} from '@gravity-ui/uikit';

export function getInvertedTheme(theme: RealTheme): RealTheme {
    switch (theme) {
        case 'light':
            return 'dark';
        case 'light-hc':
            return 'dark-hc';
        case 'dark':
            return 'light';
        case 'dark-hc':
            return 'light-hc';
    }

    return 'dark';
}
