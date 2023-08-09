import React from 'react';

const WIDTH = '320px';
const HEIGHT = '470px';

type Props = React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
    fullHeight?: boolean;
}>;

export const NotificationsPopupWrapper = (props: Props) => {
    const {className, style, fullHeight = true, children} = props;

    const finalStyles = React.useMemo((): React.CSSProperties => {
        const heightStyles = fullHeight ? {height: HEIGHT} : {maxHeight: HEIGHT};
        return {...heightStyles, width: WIDTH, overflowY: 'auto', ...style};
    }, [fullHeight, style]);

    return (
        <div className={className} style={finalStyles}>
            {children}
        </div>
    );
};
