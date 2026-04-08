import * as React from 'react';

export type ShortcutMap = {
    isTokenModifier: (e: React.KeyboardEvent) => boolean;
    isFieldModifier: (e: React.KeyboardEvent) => boolean;
    isApplyModifier: (e: React.KeyboardEvent) => boolean;
    isUndo: (e: React.KeyboardEvent) => boolean;
    isRedo: (e: React.KeyboardEvent) => boolean;
};

const macShortcuts: ShortcutMap = {
    isTokenModifier: (e) => e.metaKey,
    isFieldModifier: (e) => e.altKey,
    isApplyModifier: (e) => e.metaKey,
    isUndo: (e) => e.metaKey && !e.shiftKey && e.code === 'KeyZ',
    isRedo: (e) => e.metaKey && e.shiftKey && e.code === 'KeyZ',
};

const winShortcuts: ShortcutMap = {
    isTokenModifier: (e) => e.ctrlKey && e.altKey,
    isFieldModifier: (e) => e.ctrlKey && !e.altKey,
    isApplyModifier: (e) => e.ctrlKey,
    isUndo: (e) => e.ctrlKey && !e.shiftKey && e.code === 'KeyZ',
    isRedo: (e) =>
        (e.ctrlKey && e.code === 'KeyY') || (e.ctrlKey && e.shiftKey && e.code === 'KeyZ'),
};

export const useShortcuts = () => {
    return React.useMemo(() => {
        if (typeof window === 'undefined') {
            return winShortcuts;
        }
        return navigator.userAgent.toUpperCase().includes('MAC') ? macShortcuts : winShortcuts;
    }, []);
};
