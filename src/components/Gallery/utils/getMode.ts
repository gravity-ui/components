export const getMode = (isMobile: boolean, fullScreen: boolean) => {
    if (fullScreen) {
        return 'full-screen';
    }

    return isMobile ? 'mobile' : 'default';
};
