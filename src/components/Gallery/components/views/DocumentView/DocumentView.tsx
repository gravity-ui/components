import * as React from 'react';

import {block} from '../../../../utils/cn';

import './DocumentView.scss';

const cnDocumentView = block('gallery-document-view');

export type DocumentViewProps = {
    className?: string;
    name: string;
    src: string;
    sandbox?: string;
    isMobile?: boolean;
} & React.HTMLAttributes<HTMLIFrameElement>;

export const DocumentView = ({className, name, isMobile, ...props}: DocumentViewProps) => {
    const [isInteractive, setIsInteractive] = React.useState(false);

    const handleToggleInteractive = React.useCallback(() => {
        setIsInteractive((prev) => !prev);
    }, []);

    const handleDoubleClick = React.useCallback(() => {
        if (isMobile) {
            setIsInteractive(true);
        }
    }, [isMobile]);

    if (!isMobile) {
        return <iframe title={name} className={cnDocumentView(null, className)} {...props} />;
    }

    return (
        <div
            className={cnDocumentView('wrapper')}
            style={{position: 'relative', width: '100%', height: '100%'}}
        >
            <iframe
                title={name}
                className={cnDocumentView(
                    {
                        mobile: true,
                        'mobile-interactive': isInteractive,
                    },
                    className,
                )}
                {...props}
            />
            {!isInteractive && (
                <button
                    type="button"
                    className={cnDocumentView('overlay')}
                    onClick={handleToggleInteractive}
                    onDoubleClick={handleDoubleClick}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        textAlign: 'center',
                        zIndex: 2,
                        cursor: 'pointer',
                    }}
                >
                    Двойной тап для взаимодействия с документом
                </button>
            )}
            {isInteractive && (
                <button
                    className={cnDocumentView('exit-button')}
                    onClick={handleToggleInteractive}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        zIndex: 10,
                        cursor: 'pointer',
                    }}
                >
                    Выйти из режима взаимодействия
                </button>
            )}
        </div>
    );
};
